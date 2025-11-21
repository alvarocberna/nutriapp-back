//nest
import { Injectable, NotFoundException } from '@nestjs/common';
//prisma
import { PrismaService } from '../../prisma/prisma.service';
//domain
import { RelacionPacProDatasource, UsuarioEntity } from 'src/domain';
//infrastructure - local

@Injectable()
export class RelacionPacProDatasourceService implements RelacionPacProDatasource {
    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async createRelacion(paciente_id: string, profesional_id: string): Promise<void> {
        await this.prismaService.relacionPacPro.create({
            data: {
                paciente_id: paciente_id,
                profesional_id: profesional_id
            }
        })
        return Promise.resolve();
    }

    async getProfesionalesByPaciente(paciente_id: string): Promise<UsuarioEntity[]> {
        throw new Error('Method not implemented.');
    }

    async getPacientesByProfesional(profesional_id: string): Promise<UsuarioEntity[]> {
        throw new Error('Method not implemented.');
    }
    
    async deleteRelacion(paciente_id: string, profesional_id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
