//doman - local
import { ConsultaRepository } from "../repository/consulta.repository";
import { ConsultaEntity } from "../entities/consulta.entity";
//presentation
import { CreateConsultaDto } from "src/presentation/consulta/dto/create-consulta.dto";

interface createConsultaUseCase{
    execute(data: ConsultaEntity): Promise<void>
}

export class CreateConsulta implements createConsultaUseCase{

    constructor(
        private readonly consultaRepository: ConsultaRepository
    ){}

    public async execute(data: CreateConsultaDto): Promise<void> {
        await this.consultaRepository.createConsulta(data);
        return Promise.resolve();
    }
}
