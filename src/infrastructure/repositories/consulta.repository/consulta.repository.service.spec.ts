import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaRepositoryService } from './consulta.repository.service';

describe('ConsultaRepositoryService', () => {
  let service: ConsultaRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultaRepositoryService],
    }).compile();

    service = module.get<ConsultaRepositoryService>(ConsultaRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
