import { IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateMedicionesDto {

    @Type(() => Number)
    @IsNumber()
    id: number;

    @IsString()
    nivel: string;

    @Type(() => Number)
    @IsNumber()
    consulta_id: number
    
}
