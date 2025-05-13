import { Injectable, Logger, UnauthorizedException, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { verify, decode, JwtPayload } from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { CognitoGroup } from '../types/systemType';

interface AuthenticatedRequest extends FastifyRequest {
  user: {
    userId: string;
    groups: string[];
  };
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);
  private pemMap: { [key: string]: string } = {};

  constructor() {}

  async use(req: AuthenticatedRequest, _res: FastifyReply, next: (error?: unknown) => void) {
    try {
      // Skip authentication for public routes
      if (this.isPublicRoute(req)) {
        return next();
      }

      // Extract and verify token
      const token = this.extractToken(req);

      // Initialize PEM map from JWKS
      await this.initializePemMap();

      const decodedToken = this.verifyToken(token);

      // Validate user access
      await this.validateUserAccess(req, decodedToken);

      next();
    } catch (error) {
      this.logger.error(`Authentication Error: ${error.message}`);
      next(new UnauthorizedException(error.message));
    }
  }

  private isPublicRoute(req: AuthenticatedRequest): boolean {
    return req.url.includes('/public');
  }

  private extractToken(req: AuthenticatedRequest): string {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No authorization token provided');
    }
    return authHeader.replace('Bearer ', '').trim();
  }

  private async initializePemMap(): Promise<void> {
    try {
      const jwk = require(`../../../${process.env.JKS_FILE}.json`);
      this.pemMap = this.convertJwksToPemMap(jwk);
    } catch (error) {
      throw new UnauthorizedException('Error initializing PEM map');
    }
  }

  private convertJwksToPemMap(jwk: { keys: any[] }): { [key: string]: string } {
    return jwk.keys.reduce((map, key) => {
      map[key.kid] = jwkToPem(key);
      return map;
    }, {});
  }

  private verifyToken(token: string): JwtPayload {
    const decoded = decode(token, { complete: true }) as any;
    if (!decoded || !decoded.header.kid) {
      throw new UnauthorizedException('Invalid token format');
    }

    const pem = this.pemMap[decoded.header.kid];
    if (!pem) {
      throw new UnauthorizedException('Invalid token');
    }

    return verify(token, pem, { algorithms: ['RS256'] }) as JwtPayload;
  }

  private async validateUserAccess(
      req: AuthenticatedRequest,
      decodedToken: JwtPayload
  ): Promise<void> {
    const userId = decodedToken.sub;
    const groups = decodedToken['cognito:groups'] || [];

    console.log(` ID ${userId} and groups ${groups} authenticated`);
    if (!userId  || groups.length === 0) {
      throw new UnauthorizedException('Invalid token or user information');
    }

    req.user = {
      userId,
      groups,
    };
  }
}
