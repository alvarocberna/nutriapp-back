import { Test, TestingModule } from '@nestjs/testing';
import { ResultadosMedDatasourceService } from './resultados-med.datasource.service';

describe('ResultadosMedDatasourceService', () => {
  let service: ResultadosMedDatasourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultadosMedDatasourceService],
    }).compile();

    service = module.get<ResultadosMedDatasourceService>(ResultadosMedDatasourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
