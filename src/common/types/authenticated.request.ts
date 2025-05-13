import { ContextConfigDefault, FastifyRequest, RawRequestDefaultExpression, RawServerDefault } from "fastify";

export interface User {
  userId: string;
  groups: string[];
}

export interface UserRawRequest extends RawRequestDefaultExpression {
  user: User;
}

// @ts-ignore
export interface AuthenticatedRequest extends FastifyRequest<any, RawServerDefault, UserRawRequest, ContextConfigDefault> {
  raw: UserRawRequest;
}
