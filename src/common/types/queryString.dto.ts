import { IsOptional, IsString} from "class-validator";

export class QueryParamsNumber {
    public limit: number;
    public offset: number;
}

export class QueryParams {
    @IsOptional()
    @IsString()
    public readonly limit?: string;

    @IsOptional()
    @IsString()
    public readonly offset?: string;

    public static toQuery(request: QueryParams): QueryParamsNumber {
        const entity = new QueryParamsNumber();
        entity.limit = request.limit ? parseInt(request.limit) : 20;
        entity.offset = request.offset ? parseInt(request.offset) : 0;
        return entity;
    }
}



