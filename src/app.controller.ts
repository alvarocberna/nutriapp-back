import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsuarioEntity } from './domain/entities/usuario.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  getHello(): any {
    return this.appService.getHello();
  }
  // async getHello(): Promise<UsuarioEntity[]> {
  //   return await this.appService.getUsuarios();
  // }
}
