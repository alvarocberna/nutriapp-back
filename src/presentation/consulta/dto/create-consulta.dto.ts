import { IsString, IsNumber, IsDate, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { CreateConsultaDto, CreateConsultaAllDto, CreateMedicionesDto, CreateBasicasDto, CreatePlieguesDto, CreatePerimetrosDto, CreateDiametrosDto } from 'src/domain';
import { CreateMedicionesDtoImpl, CreateBasicasDtoImpl, CreatePlieguesDtoImpl, CreatePerimetrosDtoImpl, CreateDiametrosDtoImpl } from 'src/presentation';

export class CreateConsultaDtoImpl extends CreateConsultaDto {

    @Type(() => Date)
    @IsDate()
    fecha_consulta: Date

    @IsString()
    descripcion: string

    @IsString()
    paciente_id: string

}

export class CreateConsultaAllDtoImpl extends CreateConsultaAllDto{

    @ValidateNested()
    @Type(() => CreateConsultaDtoImpl)
    consulta: CreateConsultaDtoImpl 

    @ValidateNested()
    @Type(() => CreateMedicionesDtoImpl)
    mediciones: CreateMedicionesDtoImpl

    @ValidateNested()
    @Type(() => CreateBasicasDtoImpl)
    basicas: CreateBasicasDtoImpl

    @ValidateNested()
    @Type(() => CreatePlieguesDtoImpl)
    pliegues: CreatePlieguesDtoImpl

    @ValidateNested()
    @Type(() => CreatePerimetrosDtoImpl)
    perimetros: CreatePerimetrosDtoImpl

    @ValidateNested()
    @Type(() => CreateDiametrosDtoImpl)
    diametros: CreateDiametrosDtoImpl
}