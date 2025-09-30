import { Test, TestingModule } from '@nestjs/testing';
import { PlieguesDatasourceService } from './pliegues.datasource.service';

describe('PlieguesDatasourceService', () => {
  let service: PlieguesDatasourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlieguesDatasourceService],
    }).compile();

    service = module.get<PlieguesDatasourceService>(PlieguesDatasourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
