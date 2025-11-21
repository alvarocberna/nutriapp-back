//nest
import { Injectable, NotFoundException } from '@nestjs/common';
//domain
import {ResultadosMedDatasource, ResultadosMedEntity, CreateMedicionesAllDto, UpdateMedicionesAllDto} from 'src/domain';
import {IMC, ImcClasificacion, IMM, ImmClasificacion, MasaGrasaSiriPorc, Densidad, GCClasificacion, MasaGrasaKg, MasaMuscularLeeKg, MasaMuscularPorc, BrazoCorregido, MusloCorregido, PiernaCorregido, Suma4p } from 'src/domain'
import { calcularEdad } from 'src/domain';
//infrastructure
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
//prisma
import { EvaClasificacion, IMCClasificacion } from 'generated/prisma';

@Injectable()
export class ResultadosMedDatasourceService implements ResultadosMedDatasource {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async getResultadosMed(id_profesional: string, id_paciente: string): Promise<ResultadosMedEntity[]>{
        const resultados = await this.prismaService.resultadosMed.findMany()
        if(!resultados){
            throw new NotFoundException('Resultados de medicion no encontrados')
        }
        return resultados;
    }

    async getResultadosMedById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<ResultadosMedEntity | null>{
        const resultados = await this.prismaService.resultadosMed.findUnique({
            where: {
                id: id_medicion,
                profesional_id: id_profesional,
                paciente_id: id_paciente,
            }
        })
        if(!resultados){
            throw new NotFoundException('No se encontraron consultas')
        }
        return resultados;
    }

    async createResultadosMed(id_profesional: string, createMedicionesAllDto: CreateMedicionesAllDto): Promise<void>{
        const {mediciones, basicas, pliegues, perimetros, diametros} = createMedicionesAllDto;
        const id_paciente = mediciones.paciente_id;
        const paciente = await this.prismaService.usuario.findUnique({
            where: {
                id: id_paciente
            }
        })
        const sexo = paciente!.genero;
        const fecha_nac = paciente!.fecha_nacimiento;
        const edadDecimal = calcularEdad(fecha_nac!);
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
        const imc = IMC({peso, talla});
        const imc_clasificacion = ImcClasificacion(imc);
        const brazoCorregido = BrazoCorregido({brazoPer: perimetros.brazo_flexionado, tricepPli: pliegues.tricep});
        const musloCorregido = MusloCorregido({musloPer: perimetros.muslo_medio, musloPli: pliegues.muslo});
        const piernaCorregida = PiernaCorregido({piernaPer: perimetros.pierna, piernaPli: pliegues.pierna});
        const mmKg = MasaMuscularLeeKg({sexo, edadDecimal, talla, brazoCorregido, musloCorregido, piernaCorregida})
        const mmPorc = MasaMuscularPorc({peso, mmKg});
        const suma4p = Suma4p({bicep: pliegues.bicep, tricep: pliegues.tricep, subescapular: pliegues.subescapular, crestailiaca: pliegues.cresta_iliaca})
        const densidad = Densidad({edad: edadDecimal, sexo, suma4p});
        const gcPorc = MasaGrasaSiriPorc(densidad);
        const gcKg = MasaGrasaKg({peso, gcPorc});
        const gcClasificacion = GCClasificacion({sexo, edad: edadDecimal, gcPorc});
        const imm = IMM({peso, talla, gckg: gcKg});
        const immClasificacion = ImmClasificacion({sexo, imm});

        const datos = {
            imc: imc,
            imc_clasificacion: imc_clasificacion,
            gc_kg: gcKg,
            gc_porcentaje: gcPorc,
            gc_clasificacion: gcClasificacion,
            gv_kg: 0,
            gv_porcentaje: 0,
            gv_clasificacion: EvaClasificacion.MEDIO,
            mm_kg: mmKg,
            mm_porcentaje: mmPorc,
            mm_clasificacion: immClasificacion,
            imm: imm,
            imm_clasificacion: immClasificacion,
            endo: 0,
            meso: 0,
            ecto: 0,
            pha_peso: 0,
            pha_pli_triceps: 0,
            pha_pli_subescapular: 0,
            pha_pli_biceps: 0,
            pha_pli_cresta_iliaca: 0,
            pha_pli_supraespinal: 0,
            pha_pli_abdominal: 0,
            pha_pli_muslo: 0,
            pha_pli_pierna: 0,
            pha_per_brazo: 0,
            pha_per_brazo_flex: 0,
            pha_per_cintura: 0,
            pha_per_cadera: 0,
            pha_per_muslo: 0,
            pha_per_pierna: 0,
            pha_dia_humero: 0,
            pha_dia_biestiloideo: 0,
            pha_dia_femur: 0,
        }

        await this.prismaService.resultadosMed.create({
            data: {
                ...datos,
                mediciones_id: await id_medicion(),
                profesional_id: id_profesional,
                paciente_id: id_paciente,
            }
        })
        return Promise.resolve();
    }

    async updateResultadosMed(id_profesional: string, updateMedicionesAllDto: UpdateMedicionesAllDto): Promise<void>{
        const {mediciones, basicas, pliegues, perimetros, diametros, resultadosMed} = updateMedicionesAllDto;
        const id_paciente = mediciones.paciente_id;
        const paciente = await this.prismaService.usuario.findUnique({
            where: {
                id: id_paciente
            }
        })
        const sexo = paciente!.genero;
        const fecha_nac = paciente!.fecha_nacimiento;
        const edadDecimal = calcularEdad(fecha_nac!);
        const nro_medicion = mediciones.nro_medicion;
        const id_medicion = mediciones.id;
        const id_resultados = resultadosMed.id;
        const peso = basicas.peso;
        const talla = basicas.talla;     
        const imc = IMC({peso, talla});
        const imc_clasificacion = ImcClasificacion(imc);
        const brazoCorregido = BrazoCorregido({brazoPer: perimetros.brazo_flexionado, tricepPli: pliegues.tricep});
        const musloCorregido = MusloCorregido({musloPer: perimetros.muslo_medio, musloPli: pliegues.muslo});
        const piernaCorregida = PiernaCorregido({piernaPer: perimetros.pierna, piernaPli: pliegues.pierna});
        const mmKg = MasaMuscularLeeKg({sexo, edadDecimal, talla, brazoCorregido, musloCorregido, piernaCorregida})
        const mmPorc = MasaMuscularPorc({peso, mmKg});
        const suma4p = Suma4p({bicep: pliegues.bicep, tricep: pliegues.tricep, subescapular: pliegues.subescapular, crestailiaca: pliegues.cresta_iliaca})
        const densidad = Densidad({edad: edadDecimal, sexo, suma4p});
        const gcPorc = MasaGrasaSiriPorc(densidad);
        const gcKg = MasaGrasaKg({peso, gcPorc});
        const gcClasificacion = GCClasificacion({sexo, edad: edadDecimal, gcPorc});
        const imm = IMM({peso, talla, gckg: gcKg});
        const immClasificacion = ImmClasificacion({sexo, imm});

        const datos = {
            imc: imc,
            imc_clasificacion: imc_clasificacion,
            gc_kg: gcKg,
            gc_porcentaje: gcPorc,
            gc_clasificacion: gcClasificacion,
            gv_kg: 0,
            gv_porcentaje: 0,
            gv_clasificacion: EvaClasificacion.MEDIO,
            mm_kg: mmKg,
            mm_porcentaje: mmPorc,
            mm_clasificacion: immClasificacion,
            imm: imm,
            imm_clasificacion: immClasificacion,
            endo: 0,
            meso: 0,
            ecto: 0,
            pha_peso: 0,
            pha_pli_triceps: 0,
            pha_pli_subescapular: 0,
            pha_pli_biceps: 0,
            pha_pli_cresta_iliaca: 0,
            pha_pli_supraespinal: 0,
            pha_pli_abdominal: 0,
            pha_pli_muslo: 0,
            pha_pli_pierna: 0,
            pha_per_brazo: 0,
            pha_per_brazo_flex: 0,
            pha_per_cintura: 0,
            pha_per_cadera: 0,
            pha_per_muslo: 0,
            pha_per_pierna: 0,
            pha_dia_humero: 0,
            pha_dia_biestiloideo: 0,
            pha_dia_femur: 0,
        }

        await this.prismaService.resultadosMed.update({
            where: {
                id: id_resultados,
                profesional_id: id_profesional,
                paciente_id: id_paciente
            },
            data: {
                ...datos,
                // mediciones_id: id_medicion, 
                // profesional_id: id_profesional,
                // paciente_id: id_paciente,
            }
        })
        return Promise.resolve();
    }

    deleteResultadosMed(id_paciente: string, id_profesional: string, id_medicion: number): Promise<void>{
        throw new Error('Method not implemented.');
    }

}
