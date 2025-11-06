import { IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
//domain
import {CreateMedicionesAllDto, CreateMedicionesDto, CreateBasicasDto, CreatePlieguesDto, CreatePerimetrosDto, CreateDiametrosDto } from 'src/domain';

// CreateMedicionesAllDtoImpl will be declared after the individual DTO implementations

export class CreateMedicionesDtoImpl extends CreateMedicionesDto {

    @IsString()
    nivel: string;

    @IsString()
    descripcion: string

    @IsString()
    paciente_id: string
    
}

export class CreateBasicasDtoImpl extends CreateBasicasDto{
    
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

export class CreatePlieguesDtoImpl extends CreatePlieguesDto{
    
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

export class CreatePerimetrosDtoImpl extends CreatePerimetrosDto{
    
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

export class CreateDiametrosDtoImpl extends CreateDiametrosDto{
    
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

export class CreateMedicionesAllDtoImpl extends CreateMedicionesAllDto{

    @ValidateNested()
    @Type(() => CreateMedicionesDtoImpl)
    mediciones: CreateMedicionesDtoImpl;

    @ValidateNested()
    @Type(() => CreateBasicasDtoImpl)
    basicas: CreateBasicasDtoImpl;

    @ValidateNested()
    @Type(() => CreatePlieguesDtoImpl)
    pliegues: CreatePlieguesDtoImpl;

    @ValidateNested()
    @Type(() => CreatePerimetrosDtoImpl)
    perimetros: CreatePerimetrosDtoImpl;

    @ValidateNested()
    @Type(() => CreateDiametrosDtoImpl)
    diametros: CreateDiametrosDtoImpl;
}
