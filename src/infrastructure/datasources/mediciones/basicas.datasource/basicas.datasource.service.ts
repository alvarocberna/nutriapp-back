//nest
import { Injectable } from '@nestjs/common';
//domain
import { BasicasDatasource } from 'src/domain';
import { BasicasEntity } from 'src/domain';
//infrastructure - local
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
//presentation
import { CreateBasicasDto } from "src/domain";

@Injectable()
export class BasicasDatasourceService implements BasicasDatasource  {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async getBasicas(): Promise<BasicasEntity[]> {
        return this.prismaService.basicas.findMany();
    }
    async getBasicasById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<BasicasEntity | null> {
        return await this.prismaService.basicas.findUnique({
            where: {
                id: id_medicion,
                profesional_id: id_profesional,
                paciente_id: id_paciente,
            }
        })
    }
    async createBasicas(id_profesional: string, createBasicasDto: CreateBasicasDto): Promise<void> {

        // const id_profesional = medicion.profesional_id;
        const id_paciente = createBasicasDto.paciente_id;

        const nro_medicion = await this.prismaService.mediciones.count({
            where: {
                profesional_id: id_profesional,
                paciente_id: id_paciente
            }
        })

        const id_medicion = async () => {

            const id = await this.prismaService.mediciones.findFirst({ //no sé si es first o last
                where: {
                    nro_medicion: nro_medicion,
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
                ...createBasicasDto,
                mediciones_id: await id_medicion(),
                profesional_id: id_profesional,
                paciente_id: id_paciente
            }
        })
        return Promise.resolve();
    }
    async updateBasicas(id_profesional: string, updateBasicasDto: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deleteBasicas(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
