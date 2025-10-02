import { Test, TestingModule } from '@nestjs/testing';
import { PerimetrosDatasourceService } from './perimetros.datasource.service';

describe('PerimetrosDatasourceService', () => {
  let service: PerimetrosDatasourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerimetrosDatasourceService],
    }).compile();

    service = module.get<PerimetrosDatasourceService>(PerimetrosDatasourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
