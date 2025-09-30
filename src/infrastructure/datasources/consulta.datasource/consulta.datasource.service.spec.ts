import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaDatasourceService } from './consulta.datasource.service';

describe('ConsultaDatasourceService', () => {
  let service: ConsultaDatasourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultaDatasourceService],
    }).compile();

    service = module.get<ConsultaDatasourceService>(ConsultaDatasourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
