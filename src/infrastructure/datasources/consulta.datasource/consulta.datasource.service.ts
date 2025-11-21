import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
// import { CreateConsultaDatasourceDto } from './dto/create-consulta.datasource.dto';
// import { UpdateConsultaDatasourceDto } from './dto/update-consulta.datasource.dto';
//prisma
import { PrismaService } from '../../prisma/prisma.service';
//domain
import { ConsultaEntity, ConsultaDatasource } from 'src/domain';
import { CreateConsultaDto, UpdateConsultaDto } from 'src/domain';
//infrastructure
import { UuidService } from 'src/infrastructure/adapters/uuid/uuid.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ConsultaDatasourceService implements ConsultaDatasource {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly uuidService: UuidService
  ) {}

  async getConsultas(id_profesional: string, id_paciente: string): Promise<ConsultaEntity[]> {
      const consultas = await this.prismaService.consulta.findMany({
        where: {
          profesional_id: id_profesional,
          paciente_id: id_paciente,
        }
      });
      
      if(!consultas){
        throw new NotFoundException('No se encontraron consultas')
      }
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
    if(!consulta){
        throw new NotFoundException('Consulta no encontrada')
    }
    return consulta;
  }

  async getConsultasAndNestedEntities(id_profesional: string, id_paciente: string): Promise<ConsultaEntity[]>{
    const consultas = await this.prismaService.consulta.findMany({
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

    if(!consultas){
        throw new NotFoundException('No se encontraron consultas')
    }

    return consultas;
  }

  async getConsultasAndNestedEntitiesById(id_profesional: string, id_paciente: string, id_consulta: string): Promise<ConsultaEntity | null>{
    const consulta = await this.prismaService.consulta.findUnique({
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
    if(!consulta){
        throw new NotFoundException('Consulta no encontrada')
    }
    return consulta;
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

  async updateConsulta(id_profesional: string, updateConsultaDto: UpdateConsultaDto): Promise<void> {

    await this.prismaService.consulta.update({
      where: {
        id: updateConsultaDto.id,
        profesional_id: id_profesional,
        paciente_id: updateConsultaDto.paciente_id,
      },
      data: {
        descripcion: updateConsultaDto.descripcion,
      }
    })

    return Promise.resolve()
  }

  deleteConsulta(id_profesional: string, id_paciente: string, id_consulta: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
