import { Rol, Genero } from 'generated/prisma';

export abstract class CreateUsuarioDto {

  // abstract id_profesional: string;
  // abstract id_profesional: string;
  abstract rut: number;       
  abstract dv_rut: string;
  abstract nombre_primero: string;
  abstract nombre_segundo: string;
  abstract apellido_paterno: string;
  abstract apellido_materno: string;
  abstract genero: Genero
  abstract correo: string;
  abstract celular: number;
  abstract fecha_nacimiento: Date;
  abstract fecha_creacion: Date;
  abstract password: string;
  abstract rol: Rol;

}