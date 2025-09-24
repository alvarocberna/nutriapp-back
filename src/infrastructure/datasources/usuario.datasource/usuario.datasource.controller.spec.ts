import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioDatasourceController } from './usuario.datasource.controller';
import { UsuarioDatasourceService } from './usuario.datasource.service';

describe('UsuarioDatasourceController', () => {
  let controller: UsuarioDatasourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioDatasourceController],
      providers: [UsuarioDatasourceService],
    }).compile();

    controller = module.get<UsuarioDatasourceController>(UsuarioDatasourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
