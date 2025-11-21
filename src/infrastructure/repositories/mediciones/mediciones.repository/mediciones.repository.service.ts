//nest
import { Injectable } from '@nestjs/common';
//domain
import { MedicionesRepository } from 'src/domain';
import { MedicionesEntity } from 'src/domain';
//infrastructure - local
import { MedicionesDatasourceService } from 'src/infrastructure/datasources/mediciones/mediciones.datasource/mediciones.datasource.service';
//presentation
import { CreateMedicionesDto } from 'src/domain';

@Injectable()
export class MedicionesRepositoryService implements MedicionesRepository  {

    constructor(
        private readonly medicionesDatasourceService: MedicionesDatasourceService
    ){}

    async getMediciones(id_profesional: string, id_paciente: string): Promise<MedicionesEntity[]> {
        return this.medicionesDatasourceService.getMediciones(id_profesional, id_paciente);
    }
    async getMedicionesById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<MedicionesEntity | null> {
        return this.medicionesDatasourceService.getMedicionesById(id_profesional, id_paciente, id_medicion);
    }
    async createMediciones(id_profesional: string, createMedicionesDto: CreateMedicionesDto): Promise<void> {
        return this.medicionesDatasourceService.createMediciones(id_profesional, createMedicionesDto);
    }
    async updateMediciones(id_profesional: string, updateMedicionesDto: any): Promise<any> {
        return this.medicionesDatasourceService.updateMediciones(id_profesional, updateMedicionesDto);
    }
    async deleteMediciones(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}