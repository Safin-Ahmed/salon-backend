import {IsString, MinLength} from "class-validator";

export class WebhookRequest {
    @IsString()
    @MinLength(1)
    public fileLocation: string;
}