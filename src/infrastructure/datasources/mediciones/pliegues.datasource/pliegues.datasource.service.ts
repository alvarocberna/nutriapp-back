//nest
import { Injectable, NotFoundException } from '@nestjs/common';
//domain
import { PlieguesDatasource } from 'src/domain';
import { PlieguesEntity } from 'src/domain';
import { CreatePlieguesDto, UpdatePlieguesDto } from "src/domain";
//infrastructure - local
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class PlieguesDatasourceService implements PlieguesDatasource  {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async getPliegues(id_profesional: string, id_paciente: string): Promise<PlieguesEntity[]> {
        const pliegues = await this.prismaService.pliegues.findMany({
            where: {
                profesional_id: id_profesional,
                paciente_id: id_paciente,
            }
        });
        if(!pliegues){
            throw new NotFoundException('No se encontraron consultas')
        }
        return pliegues;
    }

    async getPlieguesById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<PlieguesEntity | null> {
        const pliegues = await this.prismaService.pliegues.findUnique({
            where: {
                id: id_medicion,
                profesional_id: id_profesional,
                paciente_id: id_paciente,
            }
        })
        if(!pliegues){
            throw new NotFoundException('No se encontraron consultas')
        }
        return pliegues;
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

    async updatePliegues(id_profesional: string, updatePlieguesDto: UpdatePlieguesDto): Promise<any> {
        await this.prismaService.pliegues.update({
            where: {
                id: updatePlieguesDto.id,
                profesional_id: id_profesional,
                paciente_id: updatePlieguesDto.paciente_id,
            },
            data: {
                tricep: updatePlieguesDto.tricep,
                subescapular: updatePlieguesDto.subescapular,
                bicep: updatePlieguesDto.bicep,
                cresta_iliaca: updatePlieguesDto.cresta_iliaca,
                supraespinal: updatePlieguesDto.supraespinal,
                abdominal: updatePlieguesDto.abdominal,
                muslo: updatePlieguesDto.muslo,
                pierna: updatePlieguesDto.pierna
            }
        })
        return Promise.resolve();
    }
    
    async deletePliegues(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
