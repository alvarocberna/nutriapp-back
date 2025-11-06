//doman - local
import { ConsultaRepository, MedicionesRepository, ResultadosMedRepository, BasicasRepository, PlieguesRepository, PerimetrosRepository, DiametrosRepository} from "src/domain";
import { ConsultaEntity } from "../entities/consulta.entity";
import { CreateConsultaAllDto, CreateConsultaDto, CreateMedicionesAllDto, CreateMedicionesDto, CreateBasicasDto, CreatePlieguesDto, CreatePerimetrosDto, CreateDiametrosDto } from "src/domain";

interface createConsultaUseCase{
    execute(id_prof: string, createConsultaAllDto: CreateConsultaAllDto): Promise<void>
}

export class CreateConsulta implements createConsultaUseCase{

    constructor(
        private readonly consultaRepository: ConsultaRepository,
        private readonly medicionesRepository: MedicionesRepository,
        private readonly basicasRepository: BasicasRepository,
        private readonly plieguesRepository: PlieguesRepository,
        private readonly perimetrosRepository: PerimetrosRepository,
        private readonly diametrosRepository: DiametrosRepository,
        private readonly resultadosMedRepository: ResultadosMedRepository
    ){}

    public async execute(id_prof: string, createConsultaAllDto: CreateConsultaAllDto): Promise<void> {
        const {consulta, mediciones, basicas, pliegues, perimetros, diametros} = createConsultaAllDto;
        const createMedicionesAllDto: CreateMedicionesAllDto = {mediciones, basicas, pliegues, perimetros, diametros};

        await this.consultaRepository.createConsulta(id_prof, consulta);
        await this.medicionesRepository.createMediciones(id_prof, mediciones);
        await this.basicasRepository.createBasicas(id_prof, basicas);
        await this.plieguesRepository.createPliegues(id_prof, pliegues);
        await this.perimetrosRepository.createPerimetros(id_prof, perimetros);
        await this.diametrosRepository.createDiametros(id_prof, diametros);
        await this.resultadosMedRepository.createResultadosMed(id_prof, createMedicionesAllDto)
        
        return Promise.resolve();
    }
}
