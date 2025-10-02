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
import { CreateConsultaDto } from 'src/presentation/consulta/dto/create-consulta.dto';


@Injectable()
export class ConsultaDatasourceService implements ConsultaDatasource {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly uuidService: UuidService
  ) {}

  getConsultas(): Promise<ConsultaEntity[]> {
    const consultas = this.prismaService.consulta.findMany();
    return consultas;
  }

  getConsultaById(id: string): Promise<ConsultaEntity | null> {
    const consulta = this.prismaService.consulta.findUnique({
      where: { id : id }
    });
    return consulta;
  }

  async createConsulta(createConsultaDto: CreateConsultaDto): Promise<void> {

      const id_profesional = createConsultaDto.profesional_id;
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
        ...createConsultaDto
      }
    })
    return Promise.resolve();
  }

  updateConsulta(id: string, consulta: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  deleteConsulta(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
