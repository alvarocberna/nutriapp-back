//nest
import { Injectable, NotFoundException  } from '@nestjs/common';
//prisma
import { PrismaService } from '../../prisma/prisma.service';
//domain
import { UsuarioEntity } from '../../../domain/entities/usuario.entity';
import { UsuarioDatasource } from '../../../domain/datasources/usuario.datasource';
//presentation
import { CreateUsuarioDto } from 'src/presentation/usuario/dto/create-usuario.dto';

@Injectable()
export class UsuarioDatasourceService implements UsuarioDatasource {

    constructor(private readonly prismaService: PrismaService){}

    async getUsuarios(): Promise<UsuarioEntity[]> {
        return this.prismaService.usuario.findMany();
    }
    async getUsuarioById(id: string): Promise<UsuarioEntity> {
        const idNumber = parseInt(id, 10);
        const usuario = await this.prismaService.usuario.findUnique({
            where: {
                id: idNumber
            }
        });

        if (!usuario) {
            throw new NotFoundException(`Usuario con id ${idNumber} no encontrado`);
        }
        return usuario;
    }

    async createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
        const usuario = await this.prismaService.usuario.create({
            data: createUsuarioDto
        });
        return usuario
    }
    async updateUsuario(id: string, usuario: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteUsuario(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
