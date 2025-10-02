//doman - local
import { ConsultaRepository, MedicionesRepository, BasicasRepository, PlieguesRepository, PerimetrosRepository, DiametrosRepository} from "src/domain";
import { ConsultaEntity } from "../entities/consulta.entity";
//presentation
import { CreateConsultaFullDto, CreateConsultaDto, CreateMedicionesDto, CreateBasicasDto, CreatePlieguesDto, CreatePerimetrosDto, CreateDiametrosDto } from "src/presentation";

interface createConsultaUseCase{
    execute(data: CreateConsultaFullDto): Promise<void>
}

export class CreateConsulta implements createConsultaUseCase{

    constructor(
        private readonly consultaRepository: ConsultaRepository,
        private readonly medicionesRepository: MedicionesRepository,
        private readonly basicasRepository: BasicasRepository,
        private readonly plieguesRepository: PlieguesRepository,
        private readonly perimetrosRepository: PerimetrosRepository,
        private readonly diametrosRepository: DiametrosRepository
    ){}

    public async execute(data: CreateConsultaFullDto): Promise<void> {
        const {consulta, mediciones, basicas, pliegues, perimetros, diametros} = data;

        await this.consultaRepository.createConsulta(consulta);
        await this.medicionesRepository.createMediciones(mediciones);
        await this.basicasRepository.createBasicas(basicas);
        await this.plieguesRepository.createPliegues(pliegues);
        await this.perimetrosRepository.createPerimetros(perimetros);
        await this.diametrosRepository.createDiametros(diametros);
        
        return Promise.resolve();
    }
}
