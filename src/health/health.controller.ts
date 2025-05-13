import {Controller, Get, HttpCode, HttpStatus, Injectable} from "@nestjs/common";
import {ApiTags,} from "@nestjs/swagger";
import {HealthService} from "./health.service";


@Injectable()
@Controller("main/public/health")
@ApiTags("health")
export class HealthController {
  public constructor(private service: HealthService) { }

  @Get("/")
  @HttpCode(HttpStatus.OK)
  public async processTranscript(): Promise<string> {
    return 'Development Server is running!';
  }
}