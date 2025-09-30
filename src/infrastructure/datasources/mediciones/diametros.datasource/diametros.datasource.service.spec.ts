import { Test, TestingModule } from '@nestjs/testing';
import { DiametrosDatasourceService } from './diametros.datasource.service';

describe('DiametrosDatasourceService', () => {
  let service: DiametrosDatasourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiametrosDatasourceService],
    }).compile();

    service = module.get<DiametrosDatasourceService>(DiametrosDatasourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
