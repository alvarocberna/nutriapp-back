
import {CreateMedicionesDto, CreateBasicasDto, CreatePlieguesDto, CreatePerimetrosDto, CreateDiametrosDto} from 'src/domain'

export abstract class CreateConsultaDto{
        abstract fecha_consulta: Date;
        abstract descripcion: string;
        // abstract profesional_id: string;
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