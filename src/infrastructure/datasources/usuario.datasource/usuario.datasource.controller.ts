import { Controller } from '@nestjs/common';
import { UsuarioDatasourceService } from './usuario.datasource.service';

@Controller()
export class UsuarioDatasourceController {
  constructor(private readonly usuarioDatasourceService: UsuarioDatasourceService) {}
}
