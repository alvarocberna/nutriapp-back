//nest
import { Injectable } from '@nestjs/common';
//domain
import {ResultadosMedDatasource, ResultadosMedEntity, CreateMedicionesAllDto} from 'src/domain';
//infrastructure
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IMCClasificacion, EvaClasificacion } from 'generated/prisma';

@Injectable()
export class ResultadosMedDatasourceService implements ResultadosMedDatasource {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async getResultadosMed(id_profesional: string, id_paciente: string): Promise<ResultadosMedEntity[]>{
        return this.prismaService.resultadosMed.findMany()
    }
    getResultadosMedById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<ResultadosMedEntity | null>{
        return this.prismaService.resultadosMed.findUnique({
            where: {
                id: id_medicion,
                profesional_id: id_profesional,
                paciente_id: id_paciente,
            }
        })
    }
    async createResultadosMed(id_profesional: string, createMedicionesAllDto: CreateMedicionesAllDto): Promise<void>{
        const {mediciones, basicas, pliegues, perimetros, diametros} = createMedicionesAllDto;
        const id_paciente = mediciones.paciente_id;

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

        const peso = basicas.peso;
        const talla = basicas.talla;     

        const datos = {
            imc: peso / ( talla * talla),
            imc_clasificacion: IMCClasificacion.NORMOPESO,
            gc_kg: 10,
            gc_porcentaje: 10,
            gc_clasificacion: EvaClasificacion.MEDIO,
            gv_kg: 10,
            gv_porcentaje: 10,
            gv_clasificacion: EvaClasificacion.MEDIO,
            mm_kg: 10,
            mm_porcentaje: 10,
            mm_clasificacion: EvaClasificacion.MEDIO,
            imm: 10,
            imm_clasificacion: EvaClasificacion.MEDIO,
            endo: 10,
            meso: 10,
            ecto: 10,
            pha_peso: 10,
            pha_pli_triceps: 10,
            pha_pli_subescapular: 10,
            pha_pli_biceps: 10,
            pha_pli_cresta_iliaca: 10,
            pha_pli_supraespinal: 10,
            pha_pli_abdominal: 10,
            pha_pli_muslo: 10,
            pha_pli_pierna: 10,
            pha_per_brazo: 10,
            pha_per_brazo_flex: 10,
            pha_per_cintura: 10,
            pha_per_cadera: 10,
            pha_per_muslo: 10,
            pha_per_pierna: 10,
            pha_dia_humero: 10,
            pha_dia_biestiloideo: 10,
            pha_dia_femur: 10,
        }

        this.prismaService.resultadosMed.create({
            data: {
                ...datos,
                mediciones_id: await id_medicion(),
                profesional_id: id_profesional,
                paciente_id: id_paciente,
            }
        })
        return Promise.resolve();
    }
    updateResultadosMed(id_profesional: string,  updateMediciones: any): Promise<void>{
        throw new Error('Method not implemented.');
    }
    deleteResultadosMed(id_paciente: string, id_profesional: string, id_medicion: number): Promise<void>{
        throw new Error('Method not implemented.');
    }

}
