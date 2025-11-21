//nest
import { Injectable, NotFoundException } from '@nestjs/common';
//domain
import { MedicionesDatasource } from 'src/domain';
import { MedicionesEntity } from 'src/domain';
//infrastructure - local
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
//presentation
import { CreateMedicionesDto, UpdateMedicionesDto } from "src/domain";

@Injectable()
export class MedicionesDatasourceService implements MedicionesDatasource  {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async getMediciones(id_profesional: string, id_paciente: string): Promise<MedicionesEntity[]> {
        const mediciones = await this.prismaService.mediciones.findMany({
            where: {
                profesional_id: id_profesional,
                paciente_id: id_paciente,
            }
        });
        if(!mediciones){
            throw new NotFoundException('No se encontraron consultas')
        }
        return mediciones;
    }

    async getMedicionesById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<MedicionesEntity | null> {
        const mediciones = await this.prismaService.mediciones.findUnique({
            where: {
                id: id_medicion,
                profesional_id: id_profesional,
                paciente_id: id_paciente,
            }
        })
        if(!mediciones){
            throw new NotFoundException('No se encontraron consultas')
        }
        return mediciones;
    }

    async createMediciones(id_profesional: string, createMedicionesDto: CreateMedicionesDto): Promise<void> {
        const id_paciente = createMedicionesDto.paciente_id;
        const nro_medicion = async () => {
            return await this.prismaService.mediciones.count({
                where: {
                    profesional_id: id_profesional,
                    paciente_id: id_paciente
                }
            })
        }
        const nro_consulta = async () => {
            return await this.prismaService.consulta.count({
                where: {
                    profesional_id: id_profesional,
                    paciente_id: id_paciente
                }
        })}
        const id_consulta = async () => {
            const id = await this.prismaService.consulta.findFirst({ //no sé si es first o last
                where: {
                    nro_consulta: await nro_consulta(),
                    profesional_id: id_profesional,
                    paciente_id: id_paciente
                }
            })
            if(!id){ //se supone que nunca se ejecutará pq el id de consulta se crea en el paso previo del caso de uso create-consulta
                return "no id" 
            }else{
                return id.id;
            }
        }
        await this.prismaService.mediciones.create({
            data: {
                nro_medicion: await nro_medicion() + 1,
                ...createMedicionesDto,
                consulta_id: await id_consulta(),
                profesional_id: id_profesional,
                paciente_id: id_paciente
            }
        })
        return Promise.resolve();
    }
    
    async updateMediciones(id_profesional: string, updateMedicionesDto: UpdateMedicionesDto): Promise<any> {
        await this.prismaService.mediciones.update({
            where: {
                id: updateMedicionesDto.id,
                // nro_medicion: updateMedicionesDto.nro_medicion,
                profesional_id: id_profesional,
                paciente_id: updateMedicionesDto.paciente_id,
            },
            data: {
                nivel: updateMedicionesDto.nivel,
                descripcion: updateMedicionesDto.descripcion
            }
        })
        return Promise.resolve();
    }

    async deleteMediciones(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
