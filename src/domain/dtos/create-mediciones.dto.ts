//considerar que para el update hay que agregar el nro_medicion

export abstract class CreateMedicionesAllDto{
    abstract mediciones: CreateMedicionesDto;
    abstract basicas: CreateBasicasDto;
    abstract pliegues: CreatePlieguesDto;
    abstract perimetros: CreatePerimetrosDto;
    abstract diametros: CreateDiametrosDto;
}

export abstract class CreateMedicionesDto {
    abstract nivel: string;
    abstract descripcion: string;
    abstract paciente_id: string;
}

export abstract class CreateBasicasDto{
    abstract peso: number;
    abstract talla: number;
    abstract talla_sentado: number;
    abstract envergadura: number;
    abstract paciente_id: string;
}

export abstract class CreatePlieguesDto{
    abstract tricep: number;
    abstract subescapular: number;
    abstract bicep: number;
    abstract cresta_iliaca: number;
    abstract supraespinal: number;
    abstract abdominal: number;
    abstract muslo: number;
    abstract pierna: number;
    abstract paciente_id: string;
}

export abstract class CreatePerimetrosDto{
    abstract brazo_relajado: number;
    abstract brazo_flexionado: number;
    abstract cintura: number;
    abstract cadera: number;
    abstract muslo_medio: number;
    abstract pierna: number;
    abstract paciente_id: string;
}

export abstract class CreateDiametrosDto{
    abstract humero: number;
    abstract biestiloideo: number;
    abstract femur: number;
    abstract paciente_id: string;
}
