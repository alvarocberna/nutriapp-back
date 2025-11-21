import { IsString, IsNumber, IsDate, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { UpdateConsultaDto, UpdateConsultaAllDto } from 'src/domain';
import { UpdateMedicionesDtoImpl, UpdateBasicasDtoImpl, UpdatePlieguesDtoImpl, UpdatePerimetrosDtoImpl, UpdateDiametrosDtoImpl, UpdateResultadosMedImpl } from 'src/presentation';

export class UpdateConsultaDtoImpl extends UpdateConsultaDto {

    @IsString()
    id: string

    @IsString()
    descripcion: string

    @IsString()
    paciente_id: string

}

export class UpdateConsultaAllDtoImpl extends UpdateConsultaAllDto{

    @ValidateNested()
    @Type(() => UpdateConsultaDtoImpl)
    consulta: UpdateConsultaDtoImpl 

    @ValidateNested()
    @Type(() => UpdateMedicionesDtoImpl)
    mediciones: UpdateMedicionesDtoImpl

    @ValidateNested()
    @Type(() => UpdateBasicasDtoImpl)
    basicas: UpdateBasicasDtoImpl

    @ValidateNested()
    @Type(() => UpdatePlieguesDtoImpl)
    pliegues: UpdatePlieguesDtoImpl

    @ValidateNested()
    @Type(() => UpdatePerimetrosDtoImpl)
    perimetros: UpdatePerimetrosDtoImpl

    @ValidateNested()
    @Type(() => UpdateDiametrosDtoImpl)
    diametros: UpdateDiametrosDtoImpl

    @ValidateNested()
    @Type(() => UpdateResultadosMedImpl)
    resultadosMed: UpdateResultadosMedImpl
}