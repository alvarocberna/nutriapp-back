//nest
import { Injectable } from '@nestjs/common';
//domain
import { DiametrosDatasource } from 'src/domain';
import { DiametrosEntity } from 'src/domain';
//infrastructure - local
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
//presentation
import { CreateDiametrosDto } from "src/presentation/mediciones/dto/create-mediciones.dto";

@Injectable()
export class DiametrosDatasourceService implements DiametrosDatasource {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async getDiametros(): Promise<DiametrosEntity[]> {
        return this.prismaService.diametros.findMany();
    }
    async getDiametrosById(id: number): Promise<DiametrosEntity | null> {
        return await this.prismaService.diametros.findUnique({
            where: {
                id: id
            }
        })
    }
    async createDiametros(medicion: CreateDiametrosDto): Promise<void> {
        await this.prismaService.diametros.create({
            data: medicion
        })
        return Promise.resolve();
    }
    async updateDiametros(id: number, medicion: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deleteDiametros(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
