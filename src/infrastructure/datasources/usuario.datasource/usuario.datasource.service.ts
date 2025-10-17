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
import { CreateUsuarioDto } from 'src/domain';

@Injectable()
export class UsuarioDatasourceService implements UsuarioDatasource {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly uuidService: UuidService,
        private readonly passHasherService: PassHasherService, 
    ){}

    //USUARIOS (7)
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

    async getUsuarioByEmail(email: string): Promise<UsuarioEntity> {
        const usuario = await this.prismaService.usuario.findUnique({
            where: { 
                correo: email 
            }
        });

        if (!usuario) {
            throw new NotFoundException(`Usuario con correo ${email} no encontrado`);
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

    //PACIENTES (1)
    async getPacientesByProfId(id: string, filters?: {search: string, fechaInicio: string, fechaFin: string}): Promise<UsuarioEntity[]>{
        const { search, fechaInicio, fechaFin } = filters || {};

        const pacientes = this.prismaService.usuario.findMany({
            where: {
                rol: 'PACIENTE',
                relacion_pac: {
                    some: { profesional_id: id },
                },
                ...(search
                    ? {
                        OR: [
                        { nombre_primero: { contains: search, mode: 'insensitive' } },
                        { nombre_segundo: { contains: search, mode: 'insensitive' } },
                        { apellido_paterno: { contains: search, mode: 'insensitive' } },
                        { apellido_materno: { contains: search, mode: 'insensitive' } },
                        { correo: { contains: search, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
                ...(fechaInicio || fechaFin
                    ? {
                        fecha_creacion: {
                        ...(fechaInicio ? { gte: new Date(fechaInicio) } : {}),
                        ...(fechaFin ? { lte: new Date(fechaFin) } : {}),
                        },
                    }
                    : {}),
            },
        });

        // const pacientes = await this.prismaService.usuario.findMany({
        //     where: {
        //         rol: 'PACIENTE',
        //         relacion_pac: {
        //         some: {
        //             profesional_id: id
        //         }
        //         }
        //     }
        //     });
        return pacientes;
    }

    //TOKENS (2)
    async setRefreshToken(id: string, hashedRt: string) {
        await this.prismaService.usuario.update({ where: { id: id }, data: { hashedRt }});
    }

    async removeRefreshToken(id: string) {
        await this.prismaService.usuario.update({ where: { id: id }, data: { hashedRt: null }});
    }


}
