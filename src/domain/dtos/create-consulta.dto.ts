
import {CreateMedicionesDto, CreateBasicasDto, CreatePlieguesDto, CreatePerimetrosDto, CreateDiametrosDto} from 'src/domain'
import {UpdateMedicionesDto, UpdateBasicasDto, UpdatePlieguesDto, UpdatePerimetrosDto, UpdateDiametrosDto, UpdateResultadosMed} from 'src/domain'

//CREATE

export abstract class CreateConsultaDto{
        abstract fecha_consulta: Date;
        abstract descripcion: string;
        abstract paciente_id: string;
}

export abstract class CreateConsultaAllDto{
        abstract consulta: CreateConsultaDto;
        abstract mediciones: CreateMedicionesDto;
        abstract basicas: CreateBasicasDto;
        abstract pliegues: CreatePlieguesDto;
        abstract perimetros: CreatePerimetrosDto;
        abstract diametros: CreateDiametrosDto;
}

//UPDATE

export abstract class UpdateConsultaDto{
        abstract id: string;
        abstract descripcion: string;
        abstract paciente_id: string;
}

export abstract class UpdateConsultaAllDto{
        abstract consulta: UpdateConsultaDto;
        abstract mediciones: UpdateMedicionesDto;
        abstract basicas: UpdateBasicasDto;
        abstract pliegues: UpdatePlieguesDto;
        abstract perimetros: UpdatePerimetrosDto;
        abstract diametros: UpdateDiametrosDto;
        abstract resultadosMed: UpdateResultadosMed;
}