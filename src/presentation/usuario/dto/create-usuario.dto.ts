import { IsEnum } from 'class-validator';
import { Rol } from 'generated/prisma';
import { IsString, IsEmail, IsNumber, IsDate, MinLength, MaxLength, IsOptional } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateUsuarioDto {

  @Type(() => Number) 
  // @Transform(({ value }) => value ? Number(value) : undefined)
  @IsNumber()
  id: number;

  @Type(() => Number)
  // @Transform(({ value }) => value ? Number(value) : undefined)
  @IsNumber()
  rut: number;

  @IsString()
  @MaxLength(1)
  dv_rut: string;

  @IsString()
  nombre_primero: string;

  @IsOptional()
  @IsString()
  nombre_segundo: string;

  @IsString()
  apellido_paterno: string;

  @IsString()
  apellido_materno: string;

  @IsEmail()
  correo: string;

  @Type(() => Number)
  // @Transform(({ value }) => value ? Number(value) : undefined)
  @IsNumber()
  celular: number;

  @Type(() => Date)
  // @Transform(({ value }) => value ? new Date(value) : undefined)
  @IsDate()
  fecha_nacimiento: Date;

  @Type(() => Date)
  // @Transform(({ value }) => value ? new Date(value) : undefined)
  @IsDate()
  fecha_creacion: Date;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @IsEnum(Rol, { message: 'El rol debe ser ADMIN, PACIENTE o DOCTOR' })
  rol: Rol;

}