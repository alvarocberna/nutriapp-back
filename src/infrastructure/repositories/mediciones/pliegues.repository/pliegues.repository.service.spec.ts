import { Test, TestingModule } from '@nestjs/testing';
import { PlieguesRepositoryService } from './pliegues.repository.service';

describe('PlieguesRepositoryService', () => {
  let service: PlieguesRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlieguesRepositoryService],
    }).compile();

    service = module.get<PlieguesRepositoryService>(PlieguesRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
