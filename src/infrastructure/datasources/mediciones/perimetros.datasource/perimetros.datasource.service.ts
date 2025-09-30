//nest
import { Injectable } from '@nestjs/common';
//domain
import { PerimetrosDatasource } from 'src/domain';
import { PerimetrosEntity } from 'src/domain';
//infrastructure - local
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
//presentation
import { CreatePerimetrosDto } from "src/presentation/mediciones/dto/create-mediciones.dto";

@Injectable()
export class PerimetrosDatasourceService implements PerimetrosDatasource  {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async getPerimetros(): Promise<PerimetrosEntity[]> {
        return this.prismaService.perimetros.findMany();
    }
    async getPerimetrosById(id: number): Promise<PerimetrosEntity | null> {
        return await this.prismaService.perimetros.findUnique({
            where: {
                id: id
            }
        })
    }
    async createPerimetros(medicion: CreatePerimetrosDto): Promise<void> {
        await this.prismaService.perimetros.create({
            data: medicion
        })
        return Promise.resolve();
    }
    async updatePerimetros(id: number, medicion: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deletePerimetros(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
