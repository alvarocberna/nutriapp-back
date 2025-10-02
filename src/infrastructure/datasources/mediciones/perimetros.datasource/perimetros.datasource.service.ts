//nest
import { Injectable } from '@nestjs/common';
//domain
import { PerimetrosDatasource } from 'src/domain';
import { PerimetrosEntity } from 'src/domain';
//infrastructure - local
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
//presentation
import { CreatePerimetrosDto } from "src/presentation/mediciones/dto/create-mediciones.dto";

@Injectable()
export class PerimetrosDatasourceService implements PerimetrosDatasource  {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async getPerimetros(): Promise<PerimetrosEntity[]> {
        return this.prismaService.perimetros.findMany();
    }
    async getPerimetrosById(id: number): Promise<PerimetrosEntity | null> {
        return await this.prismaService.perimetros.findUnique({
            where: {
                id: id
            }
        })
    }
    async createPerimetros(medicion: CreatePerimetrosDto): Promise<void> {

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

        await this.prismaService.perimetros.create({
            data: {
                ...medicion,
                mediciones_id: await id_medicion(),
                profesional_id: id_profesional,
                paciente_id: id_paciente
            }
        })
        return Promise.resolve();
    }
    async updatePerimetros(id: number, medicion: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deletePerimetros(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
