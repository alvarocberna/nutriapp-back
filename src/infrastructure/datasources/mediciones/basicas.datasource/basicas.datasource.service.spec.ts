import { Test, TestingModule } from '@nestjs/testing';
import { BasicasDatasourceService } from './basicas.datasource.service';

describe('BasicasDatasourceService', () => {
  let service: BasicasDatasourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicasDatasourceService],
    }).compile();

    service = module.get<BasicasDatasourceService>(BasicasDatasourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
