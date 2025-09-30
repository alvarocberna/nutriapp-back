import { Test, TestingModule } from '@nestjs/testing';
import { DiametrosRepositoryService } from './diametros.repository.service';

describe('DiametrosRepositoryService', () => {
  let service: DiametrosRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiametrosRepositoryService],
    }).compile();

    service = module.get<DiametrosRepositoryService>(DiametrosRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
