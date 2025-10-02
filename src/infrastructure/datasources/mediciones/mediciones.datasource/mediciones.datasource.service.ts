//nest
import { Injectable } from '@nestjs/common';
//domain
import { MedicionesDatasource } from 'src/domain';
import { MedicionesEntity } from 'src/domain';
//infrastructure - local
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
//presentation
import { CreateMedicionesDto } from "src/presentation/mediciones/dto/create-mediciones.dto";

@Injectable()
export class MedicionesDatasourceService implements MedicionesDatasource  {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async getMediciones(): Promise<MedicionesEntity[]> {
        return this.prismaService.mediciones.findMany();
    }
    async getMedicionesById(id: number): Promise<MedicionesEntity | null> {
        return await this.prismaService.mediciones.findUnique({
            where: {
                id: id
            }
        })
    }
    async createMediciones(medicion: CreateMedicionesDto): Promise<void> {

        const id_profesional = medicion.profesional_id;
        const id_paciente = medicion.paciente_id;
        
        const nro_medicion = async () => {
            return await this.prismaService.mediciones.count({
                where: {
                    profesional_id: id_profesional,
                    paciente_id: id_paciente
                }
            })
        }

        const id_consulta = async () => {
            const id = await this.prismaService.consulta.findFirst({ //no sé si es first o last
                where: {
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
                ...medicion,
                consulta_id: await id_consulta(),
                profesional_id: id_profesional,
                paciente_id: id_paciente
            }
        })
        return Promise.resolve();
    }
    async updateMediciones(id: number, medicion: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deleteMediciones(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
