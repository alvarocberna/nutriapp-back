import { Injectable } from '@nestjs/common';
// import { CreateConsultaDatasourceDto } from './dto/create-consulta.datasource.dto';
// import { UpdateConsultaDatasourceDto } from './dto/update-consulta.datasource.dto';
//prisma
import { PrismaService } from '../../prisma/prisma.service';
//domain
import { ConsultaEntity, ConsultaDatasource } from 'src/domain';
//infrastructure
import { UuidService } from 'src/infrastructure/adapters/uuid/uuid.service';
//presentation
import { CreateConsultaDto } from 'src/domain';


@Injectable()
export class ConsultaDatasourceService implements ConsultaDatasource {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly uuidService: UuidService
  ) {}

  async getConsultas(id_profesional: string, id_paciente: string): Promise<ConsultaEntity[]> {
    const consultas = this.prismaService.consulta.findMany({
      where: {
        profesional_id: id_profesional,
        paciente_id: id_paciente,
      }
    });
    return consultas;
  }

  async getConsultaById(id_profesional: string, id_paciente: string, id_consulta: string): Promise<ConsultaEntity | null> {
    const consulta = this.prismaService.consulta.findUnique({
      where: {
        id : id_consulta,
        profesional_id: id_profesional,
        paciente_id: id_paciente,
      }
    });
    return consulta;
  }

  async getConsultasAndNestedEntities(id_profesional: string, id_paciente: string): Promise<ConsultaEntity[]>{
    return this.prismaService.consulta.findMany({
      where: {
        profesional_id: id_profesional,
        paciente_id: id_paciente,
      },
      include: {
        mediciones: {
          include: {
            basicas: true,
            pliegues: true,
            perimetros: true,
            diametros: true,
            resultados_med: true,
          }
        }
      }
    })
  }

  async getConsultasAndNestedEntitiesById(id_profesional: string, id_paciente: string, id_consulta: string): Promise<ConsultaEntity | null>{
    return this.prismaService.consulta.findUnique({
      where: {
        id : id_consulta,
        profesional_id: id_profesional,
        paciente_id: id_paciente,
      },
      include: {
        mediciones: {
          include: {
            basicas: true,
            pliegues: true,
            perimetros: true,
            diametros: true,
            resultados_med: true,
          }
        }
      }
    })
  }

  async createConsulta(id_profesional: string, createConsultaDto: CreateConsultaDto): Promise<void> {

      const id_paciente = createConsultaDto.paciente_id;
      
      const nro_consulta = async () => {
          return await this.prismaService.consulta.count({
              where: {
                  profesional_id: id_profesional,
                  paciente_id: id_paciente
              }
          })
      }

    await this.prismaService.consulta.create({
      data: {
        id: this.uuidService.generate(),
        nro_consulta: await nro_consulta() + 1,
        ...createConsultaDto,
        profesional_id: id_profesional,
        paciente_id: id_paciente,
      }
    })
    return Promise.resolve();
  }

  updateConsulta(id_profesional: string, updateConsultaDto: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  deleteConsulta(id_profesional: string, id_paciente: string, id_consulta: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
