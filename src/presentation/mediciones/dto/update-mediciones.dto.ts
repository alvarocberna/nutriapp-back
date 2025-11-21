import { IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
//domain
import {UpdateMedicionesAllDto, UpdateMedicionesDto, UpdateBasicasDto, UpdatePlieguesDto, UpdatePerimetrosDto, UpdateDiametrosDto, UpdateResultadosMed } from 'src/domain';

// CreateMedicionesAllDtoImpl will be declared after the individual DTO implementations

export class UpdateMedicionesDtoImpl extends UpdateMedicionesDto {

    @Type(() => Number)
    @IsNumber()
    id: number;

    @Type(() => Number)
    @IsNumber()
    nro_medicion: number;

    @IsString()
    nivel: string;

    @IsString()
    descripcion: string

    @IsString()
    paciente_id: string
    
}

export class UpdateBasicasDtoImpl extends UpdateBasicasDto{

    @Type(() => Number)
    @IsNumber()
    id: number;

    @Type(() => Number)
    @IsNumber()
    nro_medicion: number;
    
    @Type(() => Number)
    @IsNumber()
    peso: number;
    
    @Type(() => Number)
    @IsNumber()
    talla: number;
    
    @Type(() => Number)
    @IsNumber()
    talla_sentado: number;
    
    @Type(() => Number)
    @IsNumber()
    envergadura: number;

    @IsString()
    paciente_id: string
}

export class UpdatePlieguesDtoImpl extends UpdatePlieguesDto{

    @Type(() => Number)
    @IsNumber()
    id: number;

    @Type(() => Number)
    @IsNumber()
    nro_medicion: number;
    
    @Type(() => Number)
    @IsNumber()
    tricep: number;
    
    @Type(() => Number)
    @IsNumber()
    subescapular: number;
    
    @Type(() => Number)
    @IsNumber()
    bicep: number;
    
    @Type(() => Number)
    @IsNumber()
    cresta_iliaca: number;
    
    @Type(() => Number)
    @IsNumber()
    supraespinal: number;
    
    @Type(() => Number)
    @IsNumber()
    abdominal: number;
    
    @Type(() => Number)
    @IsNumber()
    muslo: number;
    
    @Type(() => Number)
    @IsNumber()
    pierna: number;

    @IsString()
    paciente_id: string
}

export class UpdatePerimetrosDtoImpl extends UpdatePerimetrosDto{

    @Type(() => Number)
    @IsNumber()
    id: number;

    @Type(() => Number)
    @IsNumber()
    nro_medicion: number;
    
    @Type(() => Number)
    @IsNumber()
    brazo_relajado: number;
    
    @Type(() => Number)
    @IsNumber()
    brazo_flexionado: number;
    
    @Type(() => Number)
    @IsNumber()
    cintura: number;
    
    @Type(() => Number)
    @IsNumber()
    cadera: number;
    
    @Type(() => Number)
    @IsNumber()
    muslo_medio: number;
    
    @Type(() => Number)
    @IsNumber()
    pierna: number;

    @IsString()
    paciente_id: string
}

export class UpdateDiametrosDtoImpl extends UpdateDiametrosDto{

    @Type(() => Number)
    @IsNumber()
    id: number;

    @Type(() => Number)
    @IsNumber()
    nro_medicion: number;
    
    @Type(() => Number)
    @IsNumber()
    humero: number;
    
    @Type(() => Number)
    @IsNumber()
    biestiloideo: number;
    
    @Type(() => Number)
    @IsNumber()
    femur: number;

    @IsString()
    paciente_id: string
}

export class UpdateResultadosMedImpl extends UpdateResultadosMed{
    @Type(() => Number)
    @IsNumber()
    id: number;
}


export class UpdateMedicionesAllDtoImpl extends UpdateMedicionesAllDto{

    @ValidateNested()
    @Type(() => UpdateMedicionesDtoImpl)
    mediciones: UpdateMedicionesDtoImpl;

    @ValidateNested()
    @Type(() => UpdateBasicasDtoImpl)
    basicas: UpdateBasicasDtoImpl;

    @ValidateNested()
    @Type(() => UpdatePlieguesDtoImpl)
    pliegues: UpdatePlieguesDtoImpl;

    @ValidateNested()
    @Type(() => UpdatePerimetrosDtoImpl)
    perimetros: UpdatePerimetrosDtoImpl;

    @ValidateNested()
    @Type(() => UpdateDiametrosDtoImpl)
    diametros: UpdateDiametrosDtoImpl;

    @ValidateNested()
    @Type(() => UpdateResultadosMed)
    resultadosMed: UpdateResultadosMed;
}
