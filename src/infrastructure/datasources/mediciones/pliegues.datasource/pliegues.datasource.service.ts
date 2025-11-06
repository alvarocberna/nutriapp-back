//nest
import { Injectable } from '@nestjs/common';
//domain
import { PlieguesDatasource } from 'src/domain';
import { PlieguesEntity } from 'src/domain';
//infrastructure - local
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
//presentation
import { CreatePlieguesDto } from "src/domain";

@Injectable()
export class PlieguesDatasourceService implements PlieguesDatasource  {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async getPliegues(id_profesional: string, id_paciente: string): Promise<PlieguesEntity[]> {
        return this.prismaService.pliegues.findMany({
            where: {
                profesional_id: id_profesional,
                paciente_id: id_paciente,
            }
        });
    }
    async getPlieguesById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<PlieguesEntity | null> {
        return await this.prismaService.pliegues.findUnique({
            where: {
                id: id_medicion,
                profesional_id: id_profesional,
                paciente_id: id_paciente,
            }
        })
    }
    async createPliegues(id_profesional: string, createPlieguesDto: CreatePlieguesDto): Promise<void> {

        const id_paciente = createPlieguesDto.paciente_id;

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

        await this.prismaService.pliegues.create({
            data: {
                ...createPlieguesDto,
                mediciones_id: await id_medicion(),
                profesional_id: id_profesional,
                paciente_id: id_paciente
            }
        })
        return Promise.resolve();
    }
    async updatePliegues(id_profesional: string, updatePlieguesDto: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deletePliegues(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
