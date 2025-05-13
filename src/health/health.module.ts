import {Module} from "@nestjs/common";
import {HealthController} from "./health.controller";
import {HealthService} from "./health.service";

@Module({
  imports: [],
  providers: [HealthService, HealthController],
  controllers: [HealthController],
  exports: [HealthController, HealthService],
})
export class HealthModule { }
