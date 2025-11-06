import { Injectable } from '@nestjs/common';
//domain
import { ResultadosMedRepository, ResultadosMedEntity, CreateMedicionesAllDto} from 'src/domain';
//infrastructure
import { ResultadosMedDatasourceService } from 'src/infrastructure';

@Injectable()
export class ResultadosMedRepositoryService implements ResultadosMedRepository {
    
    constructor(
        private readonly resultadosMedDatasource: ResultadosMedDatasourceService
    ) {}

        async getResultadosMed(id_profesional: string, id_paciente: string): Promise<ResultadosMedEntity[]>{
            return this.resultadosMedDatasource.getResultadosMed(id_profesional, id_paciente);
        }
        getResultadosMedById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<ResultadosMedEntity | null>{
            return this.resultadosMedDatasource.getResultadosMedById(id_profesional, id_paciente, id_medicion);
        }
        createResultadosMed(id_profesional: string, createMedicionesAllDto: CreateMedicionesAllDto): Promise<void>{
            return this.resultadosMedDatasource.createResultadosMed(id_profesional, createMedicionesAllDto);
        }
        updateResultadosMed(id_profesional: string,  updateMediciones: any): Promise<void>{
            return this.resultadosMedDatasource.updateResultadosMed(id_profesional, updateMediciones);
        }
        deleteResultadosMed(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void>{
            return this.resultadosMedDatasource.deleteResultadosMed(id_profesional, id_paciente, id_medicion);
        }

}
