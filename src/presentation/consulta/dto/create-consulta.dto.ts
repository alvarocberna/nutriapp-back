import { IsString, IsNumber, IsDate } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateConsultaDto {

    @Type(() => Number)
    @IsNumber()
    id: number

    @Type(() => Date)
    @IsDate()
    fecha_consulta: Date

    @IsString()
    profesional_id: string

    @IsString()
    paciente_id: string

}

