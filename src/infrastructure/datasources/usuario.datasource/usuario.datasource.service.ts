//nest
import { Injectable, NotFoundException  } from '@nestjs/common';
//prisma
import { PrismaService } from '../../prisma/prisma.service';
import { Rol } from 'generated/prisma';
//domain
import { UsuarioEntity } from '../../../domain/entities/usuario.entity';
import { UsuarioDatasource } from '../../../domain/datasources/usuario.datasource';
import { CreateUsuarioDto, CreateProfesionalDto, CreatePacienteDto } from 'src/domain';
//infrastructure (local)
import { UuidService } from 'src/infrastructure/adapters/uuid/uuid.service';
import { PassHasherService } from 'src/infrastructure/adapters/pass-hasher/pass-hasher.service';
//
import { throwError } from 'rxjs';

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
            throw new NotFoundException(`Usuario no encontrado`);
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
            throw new NotFoundException(`Usuario ${email} no encontrado`);
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

    //PACIENTES (2)
    async getPacientesByProfId(id: string, filters?: {search: string, fechaInicio: string, fechaFin: string, edadMinima: number, edadMaxima: number}): Promise<UsuarioEntity[]>{
        const { search, fechaInicio, fechaFin, edadMinima, edadMaxima } = filters || {};

        const edadMin = new Date()
        if(edadMaxima){edadMin.setFullYear(edadMin.getFullYear() - edadMaxima)}
        const edadMax = new Date()
        if(edadMinima){edadMax.setFullYear(edadMax.getFullYear() - edadMinima)}

        console.log('fecha de edad minima: ' + edadMin)
        console.log('fecha de edad maxima: ' + edadMax)
        const pacientes = this.prismaService.usuario.findMany({
            where: {
                rol: 'PACIENTE',
                relacion_pac: {
                    some: { profesional_id: id },
                },
                ...(search
                    ? {
                        AND: search
                        .trim()
                        .split(' ')
                        .map((word) => ({
                            OR: [
                            { nombre_primero: { contains: word, mode: 'insensitive' } },
                            { nombre_segundo: { contains: word, mode: 'insensitive' } },
                            { apellido_paterno: { contains: word, mode: 'insensitive' } },
                            { apellido_materno: { contains: word, mode: 'insensitive' } },
                            { correo: { contains: word, mode: 'insensitive' } },
                            ],
                        }))
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
                ...(edadMin || edadMax
                    ? {
                        fecha_nacimiento: {
                        ...(edadMin ? { gte: new Date(edadMin) } : {}),
                        ...(edadMax ? { lte: new Date(edadMax) } : {}),
                        },
                    }
                    : {}),
            },
        });
        if(!pacientes){
            throw new NotFoundException(`Pacientes no encontrados`);
        }
        return pacientes;
    }

    async createPaciente(createPacienteDto: CreatePacienteDto): Promise<UsuarioEntity> {
        const password: string = String(createPacienteDto.rut)
        const paciente = await this.prismaService.usuario.create({
            data: {
                id: this.uuidService.generate(),
                ...createPacienteDto,
                password: await this.passHasherService.hash(password),
                rol: 'PACIENTE'
            }
        });
        return paciente
    }

    //PROFESIONALES

    async getProfesionalById(id_prof: string): Promise<UsuarioEntity>{
        const profesional = await this.prismaService.usuario.findUnique({
            where: {
                id: id_prof
            }
        })
        if (!profesional) {
            throw new NotFoundException(`Profesional no encontrado`);
        }
        return profesional;
    }

    async createProfesional(createProfesionalDto: CreateProfesionalDto): Promise<UsuarioEntity> {
        const profesional = await this.prismaService.usuario.create({
            data: {
                id: this.uuidService.generate(),
                ...createProfesionalDto,
                password: await this.passHasherService.hash(createProfesionalDto.password),
                rol: 'PROFESIONAL'
            }
        });
        return profesional
    }

    //TOKENS (2)
    async setRefreshToken(id: string, hashedRt: string) {
        await this.prismaService.usuario.update({ where: { id: id }, data: { hashedRt }});
    }

    async removeRefreshToken(id: string) {
        await this.prismaService.usuario.update({ where: { id: id }, data: { hashedRt: null }});
    }


}
