import { Controller } from '@nestjs/common';
import { UsuarioRepositoryService } from './usuario.repository.service';

@Controller()
export class UsuarioRepositoryController {
  constructor(private readonly usuarioRepositoryService: UsuarioRepositoryService) {}
}
