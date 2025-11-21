//doman - local
import { ConsultaRepository, MedicionesRepository, ResultadosMedRepository, BasicasRepository, PlieguesRepository, PerimetrosRepository, DiametrosRepository} from "src/domain";
import { ConsultaEntity } from "../entities/consulta.entity";
import { UpdateConsultaAllDto, UpdateMedicionesAllDto } from "src/domain";

interface updateConsultaUseCase{
    execute(id_prof: string, updateConsultaAllDto: UpdateConsultaAllDto): Promise<void>
}

export class UpdateConsulta implements updateConsultaUseCase{

    constructor(
        private readonly consultaRepository: ConsultaRepository,
        private readonly medicionesRepository: MedicionesRepository,
        private readonly basicasRepository: BasicasRepository,
        private readonly plieguesRepository: PlieguesRepository,
        private readonly perimetrosRepository: PerimetrosRepository,
        private readonly diametrosRepository: DiametrosRepository,
        private readonly resultadosMedRepository: ResultadosMedRepository
    ){}

    public async execute(id_prof: string, updateConsultaAllDto: UpdateConsultaAllDto): Promise<void> {
        const {consulta, mediciones, basicas, pliegues, perimetros, diametros, resultadosMed} = updateConsultaAllDto;
        const updateMedicionesAllDto: UpdateMedicionesAllDto = {mediciones, basicas, pliegues, perimetros, diametros, resultadosMed};

        await this.consultaRepository.updateConsulta(id_prof, consulta);
        await this.medicionesRepository.updateMediciones(id_prof, mediciones);
        await this.basicasRepository.updateBasicas(id_prof, basicas);
        await this.plieguesRepository.updatePliegues(id_prof, pliegues);
        await this.perimetrosRepository.updatePerimetros(id_prof, perimetros);
        await this.diametrosRepository.updateDiametros(id_prof, diametros);
        await this.resultadosMedRepository.updateResultadosMed(id_prof, updateMedicionesAllDto)
        
        return Promise.resolve();
    }
}
