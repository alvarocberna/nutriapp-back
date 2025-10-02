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

        const id_profesional = medicion.profesional_id;
        const id_paciente = medicion.paciente_id;

        const id_medicion = async () => {
            const id = await this.prismaService.mediciones.findFirst({ //no sé si es first o last
                where: {
                    profesional_id: id_profesional,
                    paciente_id: id_paciente
                }
            })
            if(!id){ //se supone que nunca se ejecutará pq el id de consulta se crea en el paso previo del caso de uso create-consulta
                return 0
            }else{
                return id.id;
            }
        }

        await this.prismaService.basicas.create({
            data: {
                ...medicion,
                mediciones_id: await id_medicion(),
                profesional_id: id_profesional,
                paciente_id: id_paciente
            }
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
