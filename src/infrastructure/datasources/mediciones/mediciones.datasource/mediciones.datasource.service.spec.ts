import { Test, TestingModule } from '@nestjs/testing';
import { MedicionesDatasourceService } from './mediciones.datasource.service';

describe('MedicionesDatasourceService', () => {
  let service: MedicionesDatasourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicionesDatasourceService],
    }).compile();

    service = module.get<MedicionesDatasourceService>(MedicionesDatasourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
