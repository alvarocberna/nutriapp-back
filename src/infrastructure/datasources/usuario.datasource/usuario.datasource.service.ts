//nest
import { Injectable, NotFoundException  } from '@nestjs/common';
//prisma
import { PrismaService } from '../../prisma/prisma.service';
import { Rol } from 'generated/prisma';
//domain
import { UsuarioEntity } from '../../../domain/entities/usuario.entity';
import { UsuarioDatasource } from '../../../domain/datasources/usuario.datasource';
//infrastructure (local)
import { UuidService } from 'src/infrastructure/adapters/uuid/uuid.service';
import { PassHasherService } from 'src/infrastructure/adapters/pass-hasher/pass-hasher.service';
//presentation
import { CreateUsuarioDto } from 'src/presentation/usuario/dto/create-usuario.dto';

@Injectable()
export class UsuarioDatasourceService implements UsuarioDatasource {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly uuidService: UuidService,
        private readonly passHasherService: PassHasherService, 
    ){}

    async getUsuarios(): Promise<UsuarioEntity[]> {
        return this.prismaService.usuario.findMany();
    }

    async getUsuarioByRol(rol: Rol): Promise<UsuarioEntity[]> {
        const usuario = await this.prismaService.usuario.findMany({
            where: {
                rol: rol
            }
        });

        if (!usuario) {
            throw new NotFoundException(`Usuario con rol ${rol} no encontrado`);
        }
        return usuario;
    }

    async getUsuarioById(id: string): Promise<UsuarioEntity> {
        const usuario = await this.prismaService.usuario.findUnique({
            where: {
                id: id
            }
        });

        if (!usuario) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }
        return usuario;
    }

    async createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {

        const usuario = await this.prismaService.usuario.create({
            data: {
                id: this.uuidService.generate(),
                ...createUsuarioDto,
                password: await this.passHasherService.hash(createUsuarioDto.password),
                rol: createUsuarioDto.rol
            }
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
