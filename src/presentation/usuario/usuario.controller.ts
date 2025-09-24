import { Controller, Get, Param, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioEntity } from 'src/domain/entities/usuario.entity';

// const user: UsuarioEntity = {
//   id: 8,    
//   rut: 19123123,
//   dv_rut: 'K',
//   nombre_primero: 'Andrea',
//   nombre_segundo: 'Carolina',
//   apellido_paterno: 'Monsalve',
//   apellido_materno: 'Cueto',
//   correo: 'andreaaaaa@gmail.com',
//   celular: 9123123,
//   fecha_nacimiento: new Date(),
//   fecha_creacion: new Date(),
//   password: 'andrea123',
//   rol: 'PACIENTE',
      
// }

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async getUsuarios() {
    return this.usuarioService.getPacientes();
  }

  @Get(':id')
  async getUsuarioById(@Param('id') id: string) {
    return this.usuarioService.getPaciente(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPaciente(@Body() data: CreateUsuarioDto) {
    return this.usuarioService.createPaciente(data);
  }

}
