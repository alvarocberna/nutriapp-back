//nest
import { Injectable } from '@nestjs/common';
//domain
import { PlieguesDatasource } from 'src/domain';
import { PlieguesEntity } from 'src/domain';
//infrastructure - local
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
//presentation
import { CreatePlieguesDto } from "src/presentation/mediciones/dto/create-mediciones.dto";

@Injectable()
export class PlieguesDatasourceService implements PlieguesDatasource  {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async getPliegues(): Promise<PlieguesEntity[]> {
        return this.prismaService.pliegues.findMany();
    }
    async getPlieguesById(id: number): Promise<PlieguesEntity | null> {
        return await this.prismaService.pliegues.findUnique({
            where: {
                id: id
            }
        })
    }
    async createPliegues(medicion: CreatePlieguesDto): Promise<void> {
        await this.prismaService.pliegues.create({
            data: medicion
        })
        return Promise.resolve();
    }
    async updatePliegues(id: number, medicion: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deletePliegues(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
