//nest
import { Injectable } from '@nestjs/common';
//domain
import { PerimetrosRepository } from 'src/domain';
import { PerimetrosEntity } from 'src/domain';
//infrastructure - local
import { PerimetrosDatasourceService } from 'src/infrastructure';
//presentation
import { CreatePerimetrosDto } from 'src/presentation/mediciones/dto/create-mediciones.dto';

@Injectable()
export class PerimetrosRepositoryService implements PerimetrosRepository  {

    constructor(
        private readonly perimetrosDatasourceService: PerimetrosDatasourceService
    ){}

    async getPerimetros(): Promise<PerimetrosEntity[]> {
        return this.perimetrosDatasourceService.getPerimetros();
    }
    async getPerimetrosById(id: number): Promise<PerimetrosEntity | null> {
        return this.perimetrosDatasourceService.getPerimetrosById(id);
    }
    async createPerimetros(medicion: CreatePerimetrosDto): Promise<void> {
        return this.perimetrosDatasourceService.createPerimetros(medicion);
    }
    async updatePerimetros(id: number, medicion: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deletePerimetros(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}