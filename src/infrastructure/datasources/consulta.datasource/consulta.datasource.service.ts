import { Injectable } from '@nestjs/common';
// import { CreateConsultaDatasourceDto } from './dto/create-consulta.datasource.dto';
// import { UpdateConsultaDatasourceDto } from './dto/update-consulta.datasource.dto';
//prisma
import { PrismaService } from '../../prisma/prisma.service';
//domain
import { ConsultaEntity, ConsultaDatasource } from 'src/domain';
//presentation
import { CreateConsultaDto } from 'src/presentation/consulta/dto/create-consulta.dto';


@Injectable()
export class ConsultaDatasourceService implements ConsultaDatasource {

  constructor(private readonly prismaService: PrismaService) {}

  getConsultas(): Promise<ConsultaEntity[]> {
    const consultas = this.prismaService.consulta.findMany();
    return consultas;
  }

  getConsultaById(id: number): Promise<ConsultaEntity | null> {
    const consulta = this.prismaService.consulta.findUnique({
      where: { id : id }
    });
    return consulta;
  }

  async createConsulta(createConsultaDto: CreateConsultaDto): Promise<void> {
    await this.prismaService.consulta.create({
      data: createConsultaDto
    })
    return Promise.resolve();
  }

  updateConsulta(id: number, consulta: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  deleteConsulta(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
