import { Test, TestingModule } from '@nestjs/testing';
import { ResultadosMedRepositoryService } from './resultados-med.repository.service';

describe('ResultadosMedRepositoryService', () => {
  let service: ResultadosMedRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultadosMedRepositoryService],
    }).compile();

    service = module.get<ResultadosMedRepositoryService>(ResultadosMedRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
