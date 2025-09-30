import { Test, TestingModule } from '@nestjs/testing';
import { BasicasRepositoryService } from './basicas.repository.service';

describe('BasicasRepositoryService', () => {
  let service: BasicasRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicasRepositoryService],
    }).compile();

    service = module.get<BasicasRepositoryService>(BasicasRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
