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

        await this.prismaService.pliegues.create({
            data: {
                ...medicion,
                mediciones_id: await id_medicion(),
                profesional_id: id_profesional,
                paciente_id: id_paciente
            }
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
