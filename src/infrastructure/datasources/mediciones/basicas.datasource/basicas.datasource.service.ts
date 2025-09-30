//nest
import { Injectable } from '@nestjs/common';
//domain
import { BasicasDatasource } from 'src/domain';
import { BasicasEntity } from 'src/domain';
//infrastructure - local
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
//presentation
import { CreateBasicasDto } from "src/presentation/mediciones/dto/create-mediciones.dto";

@Injectable()
export class BasicasDatasourceService implements BasicasDatasource  {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async getBasicas(): Promise<BasicasEntity[]> {
        return this.prismaService.basicas.findMany();
    }
    async getBasicasById(id: number): Promise<BasicasEntity | null> {
        return await this.prismaService.basicas.findUnique({
            where: {
                id: id
            }
        })
    }
    async createBasicas(medicion: CreateBasicasDto): Promise<void> {
        await this.prismaService.basicas.create({
            data: medicion
        })
        return Promise.resolve();
    }
    async updateBasicas(id: number, medicion: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deleteBasicas(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
