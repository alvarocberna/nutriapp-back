//considerar que para el update hay que agregar el nro_medicion

//CREATE

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

//UPDATE

export abstract class UpdateMedicionesAllDto{
    abstract mediciones: UpdateMedicionesDto;
    abstract basicas: UpdateBasicasDto;
    abstract pliegues: UpdatePlieguesDto;
    abstract perimetros: UpdatePerimetrosDto;
    abstract diametros: UpdateDiametrosDto;
    abstract resultadosMed: UpdateResultadosMed;
}

export abstract class UpdateMedicionesDto {
    abstract id: number;
    abstract nro_medicion: number;
    abstract nivel: string;
    abstract descripcion: string;
    abstract paciente_id: string;
}

export abstract class UpdateBasicasDto{
    abstract id: number;
    abstract nro_medicion: number;
    abstract peso: number;
    abstract talla: number;
    abstract talla_sentado: number;
    abstract envergadura: number;
    abstract paciente_id: string;
}

export abstract class UpdatePlieguesDto{
    abstract id: number;
    abstract nro_medicion: number;
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

export abstract class UpdatePerimetrosDto{
    abstract id: number;
    abstract nro_medicion: number;
    abstract brazo_relajado: number;
    abstract brazo_flexionado: number;
    abstract cintura: number;
    abstract cadera: number;
    abstract muslo_medio: number;
    abstract pierna: number;
    abstract paciente_id: string;
}

export abstract class UpdateDiametrosDto{
    abstract id: number;
    abstract nro_medicion: number;
    abstract humero: number;
    abstract biestiloideo: number;
    abstract femur: number;
    abstract paciente_id: string;
}

export abstract class UpdateResultadosMed{
    abstract id: number;
}