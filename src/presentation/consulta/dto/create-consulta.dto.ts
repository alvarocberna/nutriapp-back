import { IsString, IsNumber, IsDate, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { CreateMedicionesDto, CreateBasicasDto, CreatePlieguesDto, CreatePerimetrosDto, CreateDiametrosDto } from 'src/presentation';

export class CreateConsultaDto {

    // @Type(() => Number)
    // @IsNumber()
    // id: number

    // @Type(() => Number)
    // @IsNumber()
    // nro_consulta: number

    @Type(() => Date)
    @IsDate()
    fecha_consulta: Date

    @IsString()
    descripcion: string

    @IsString()
    profesional_id: string

    @IsString()
    paciente_id: string

}

export class CreateConsultaFullDto{

    @ValidateNested()
    @Type(() => CreateConsultaDto)
    consulta: CreateConsultaDto

    @ValidateNested()
    @Type(() => CreateMedicionesDto)
    mediciones: CreateMedicionesDto

    @ValidateNested()
    @Type(() => CreateBasicasDto)
    basicas: CreateBasicasDto

    @ValidateNested()
    @Type(() => CreatePlieguesDto)
    pliegues: CreatePlieguesDto

    @ValidateNested()
    @Type(() => CreatePerimetrosDto)
    perimetros: CreatePerimetrosDto

    @ValidateNested()
    @Type(() => CreateDiametrosDto)
    diametros: CreateDiametrosDto
}