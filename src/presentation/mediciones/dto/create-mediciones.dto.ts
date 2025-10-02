import { IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateMedicionesDto {

    // @Type(() => Number)
    // @IsNumber()
    // id: number;

    // @Type(() => Number)
    // @IsNumber()
    // nro_medicion: number

    @IsString()
    nivel: string;

    @IsString()
    descripcion: string

    // @IsString()
    // consulta_id: string

    @IsString()
    profesional_id: string

    @IsString()
    paciente_id: string
    
}

export class CreateBasicasDto{
    // @Type(() => Number)
    // @IsNumber()
    // id: number;
    
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
    
    // @Type(() => Number)
    // @IsNumber()
    // mediciones_id: number;

    @IsString()
    profesional_id: string

    @IsString()
    paciente_id: string
}

export class CreatePlieguesDto{
    
    // @Type(() => Number)
    // @IsNumber()
    // id: number;
    
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
    
    // @Type(() => Number)
    // @IsNumber()
    // mediciones_id: number;

    @IsString()
    profesional_id: string

    @IsString()
    paciente_id: string
}

export class CreatePerimetrosDto{
    
    // @Type(() => Number)
    // @IsNumber()
    // id: number;
    
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
    
    // @Type(() => Number)
    // @IsNumber()
    // mediciones_id: number;

    @IsString()
    profesional_id: string

    @IsString()
    paciente_id: string
}

export class CreateDiametrosDto{
    
    // @Type(() => Number)
    // @IsNumber()
    // id: number;
    
    @Type(() => Number)
    @IsNumber()
    humero: number;
    
    @Type(() => Number)
    @IsNumber()
    biestiloideo: number;
    
    @Type(() => Number)
    @IsNumber()
    femur: number;
    
    // @Type(() => Number)
    // @IsNumber()
    // mediciones_id: number;

    @IsString()
    profesional_id: string

    @IsString()
    paciente_id: string
}
