import { Test, TestingModule } from '@nestjs/testing';
import { PerimetrosRepositoryService } from './perimetros.repository.service';

describe('PerimetrosRepositoryService', () => {
  let service: PerimetrosRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerimetrosRepositoryService],
    }).compile();

    service = module.get<PerimetrosRepositoryService>(PerimetrosRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
