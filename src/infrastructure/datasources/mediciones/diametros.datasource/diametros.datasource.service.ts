//nest
import { Injectable } from '@nestjs/common';
//domain
import { DiametrosDatasource } from 'src/domain';
import { DiametrosEntity } from 'src/domain';
//infrastructure - local
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
//presentation
import { CreateDiametrosDto } from "src/presentation/mediciones/dto/create-mediciones.dto";

@Injectable()
export class DiametrosDatasourceService implements DiametrosDatasource {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async getDiametros(): Promise<DiametrosEntity[]> {
        return this.prismaService.diametros.findMany();
    }
    async getDiametrosById(id: number): Promise<DiametrosEntity | null> {
        return await this.prismaService.diametros.findUnique({
            where: {
                id: id
            }
        })
    }
    async createDiametros(medicion: CreateDiametrosDto): Promise<void> {

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

        await this.prismaService.diametros.create({
              data: {
                ...medicion,
                mediciones_id: await id_medicion(),
                profesional_id: id_profesional,
                paciente_id: id_paciente
            }
        })
        return Promise.resolve();
    }
    async updateDiametros(id: number, medicion: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deleteDiametros(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
