import { IsEnum } from 'class-validator';
import { Rol, Genero } from 'generated/prisma';
import { IsString, IsEmail, IsNumber, IsDate, MinLength, MaxLength, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

/*
  ¿Como funcionan los pipes?
  Cuando enviamos datos al endpoints (como un post) nest recibe los datos como JSON
  El ValidationPipe transforma ese JSON en una instancia de mi DTO
  Luego ejecuta las validaciones indicadas por los decoradores como IsNumber
  Si algo no cumple, responde con error 400 automáticamente (bad request)
  Nota: Type y Transform se usan para convertir tipos de datos, pero type se usa en casos más 
  simples, como convertir un tipo primitivo de dato a otro. En cambio, transform se utiliza para
  lógica especial y personalizable, para por ejemplo manejar null, default, etc.
  Ej:  @Transform(({ value }) => value ? Number(value) : undefined) 
*/

export class CreateUsuarioDto {

  @Type(() => Number)  //transforma string a number
  @IsNumber()         //valida que el valor recibido sea number, sino tira error 400 bad request
  rut: number;          //definimos propiedad

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

  @IsEnum(Genero, {message: 'genero requerido'})
  genero: Genero

  @IsEmail()
  correo: string;

  @Type(() => Number)
  @IsNumber()
  celular: number;

  @Type(() => Date)
  @IsDate()
  fecha_nacimiento: Date;

  @Type(() => Date)
  @IsDate()
  fecha_creacion: Date;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @IsEnum(Rol, { message: 'El rol debe ser ADMIN, PACIENTE o DOCTOR' })
  rol: Rol;

}