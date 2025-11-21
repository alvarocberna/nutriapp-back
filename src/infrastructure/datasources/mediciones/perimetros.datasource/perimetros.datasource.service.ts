//nest
import { Injectable, NotFoundException } from '@nestjs/common';
//domain
import { PerimetrosDatasource } from 'src/domain';
import { PerimetrosEntity } from 'src/domain';
import { CreatePerimetrosDto, UpdatePerimetrosDto } from "src/domain";
//infrastructure - local
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
//presentation

@Injectable()
export class PerimetrosDatasourceService implements PerimetrosDatasource  {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async getPerimetros(id_profesional: string, id_paciente: string): Promise<PerimetrosEntity[]> {
        const perimetros = await this.prismaService.perimetros.findMany({
            where: {
                profesional_id: id_profesional,
                paciente_id: id_paciente,
            }
        });
        if(!perimetros){
            throw new NotFoundException("Mediciones Perimetros no encontradas")
        }
        return perimetros;
    }

    async getPerimetrosById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<PerimetrosEntity | null> {
        const perimetros = await this.prismaService.perimetros.findUnique({
            where: {
                id: id_medicion,
                profesional_id: id_profesional,
                paciente_id: id_paciente,
            }
        })
        if(!perimetros){
            throw new NotFoundException('No se encontraron consultas')
        }
        return perimetros;
    
    }

    async createPerimetros(id_profesional: string, createPerimetrosDto: CreatePerimetrosDto): Promise<void> {
        const id_paciente = createPerimetrosDto.paciente_id;
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
        await this.prismaService.perimetros.create({
            data: {
                ...createPerimetrosDto,
                mediciones_id: await id_medicion(),
                profesional_id: id_profesional,
                paciente_id: id_paciente
            }
        })
        return Promise.resolve();
    }

    async updatePerimetros(id_profesional: string, updatePerimetrosDto: UpdatePerimetrosDto): Promise<any> {
        await this.prismaService.perimetros.update({
            where: {
                id: updatePerimetrosDto.id,
                profesional_id: id_profesional,
                paciente_id: updatePerimetrosDto.paciente_id
            },
            data: {
                brazo_relajado: updatePerimetrosDto.brazo_relajado,
                brazo_flexionado: updatePerimetrosDto.brazo_flexionado,
                cintura: updatePerimetrosDto.cintura,
                cadera: updatePerimetrosDto.cadera,
                muslo_medio: updatePerimetrosDto.muslo_medio,
                pierna: updatePerimetrosDto.pierna
            }
        })
        return Promise.resolve();
    }
    
    async deletePerimetros(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
