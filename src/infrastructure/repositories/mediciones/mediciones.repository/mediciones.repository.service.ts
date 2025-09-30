//nest
import { Injectable } from '@nestjs/common';
//domain
import { MedicionesRepository } from 'src/domain';
import { MedicionesEntity } from 'src/domain';
//infrastructure - local
import { MedicionesDatasourceService } from 'src/infrastructure/datasources/mediciones/mediciones.datasource/mediciones.datasource.service';
//presentation
import { CreateMedicionesDto } from 'src/presentation/mediciones/dto/create-mediciones.dto';

@Injectable()
export class MedicionesRepositoryService implements MedicionesRepository  {

    constructor(
        private readonly medicionesDatasourceService: MedicionesDatasourceService
    ){}

    async getMediciones(): Promise<MedicionesEntity[]> {
        return this.medicionesDatasourceService.getMediciones();
    }
    async getMedicionesById(id: number): Promise<MedicionesEntity | null> {
        return this.medicionesDatasourceService.getMedicionesById(id);
    }
    async createMediciones(medicion: CreateMedicionesDto): Promise<void> {
        return this.medicionesDatasourceService.createMediciones(medicion);
    }
    async updateMediciones(id: number, medicion: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deleteMediciones(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}