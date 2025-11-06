//nest
import { Injectable } from '@nestjs/common';
//domain
import { DiametrosDatasource } from 'src/domain';
import { DiametrosEntity } from 'src/domain';
//infrastructure - local
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
//presentation
import { CreateDiametrosDto } from "src/domain";

@Injectable()
export class DiametrosDatasourceService implements DiametrosDatasource {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async getDiametros(id_profesional: string, id_paciente: string): Promise<DiametrosEntity[]> {
        return this.prismaService.diametros.findMany({
            where: {
                profesional_id: id_profesional,
                paciente_id: id_paciente,
            }
        });
    }
    async getDiametrosById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<DiametrosEntity | null> {
        return await this.prismaService.diametros.findUnique({
            where: {
                id: id_medicion,
                profesional_id: id_profesional,
                paciente_id: id_paciente,
            }
        })
    }
    async createDiametros(id_profesional: string, createDiametrosDto: CreateDiametrosDto): Promise<void> {

        const id_paciente = createDiametrosDto.paciente_id;

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

        await this.prismaService.diametros.create({
              data: {
                ...createDiametrosDto,
                mediciones_id: await id_medicion(),
                profesional_id: id_profesional,
                paciente_id: id_paciente
            }
        })
        return Promise.resolve();
    }
    async updateDiametros(id_profesional: string, updateDiametrosDto: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deleteDiametros(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
