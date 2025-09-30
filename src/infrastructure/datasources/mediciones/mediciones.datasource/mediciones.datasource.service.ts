//nest
import { Injectable } from '@nestjs/common';
//domain
import { MedicionesDatasource } from 'src/domain';
import { MedicionesEntity } from 'src/domain';
//infrastructure - local
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
//presentation
import { CreateMedicionesDto } from "src/presentation/mediciones/dto/create-mediciones.dto";

@Injectable()
export class MedicionesDatasourceService implements MedicionesDatasource  {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async getMediciones(): Promise<MedicionesEntity[]> {
        return this.prismaService.mediciones.findMany();
    }
    async getMedicionesById(id: number): Promise<MedicionesEntity | null> {
        return await this.prismaService.mediciones.findUnique({
            where: {
                id: id
            }
        })
    }
    async createMediciones(medicion: CreateMedicionesDto): Promise<void> {
        await this.prismaService.mediciones.create({
            data: medicion
        })
        return Promise.resolve();
    }
    async updateMediciones(id: number, medicion: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deleteMediciones(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
