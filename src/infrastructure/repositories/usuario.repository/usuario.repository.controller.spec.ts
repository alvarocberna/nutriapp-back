import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRepositoryController } from './usuario.repository.controller';
import { UsuarioRepositoryService } from './usuario.repository.service';

describe('UsuarioRepositoryController', () => {
  let controller: UsuarioRepositoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioRepositoryController],
      providers: [UsuarioRepositoryService],
    }).compile();

    controller = module.get<UsuarioRepositoryController>(UsuarioRepositoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
