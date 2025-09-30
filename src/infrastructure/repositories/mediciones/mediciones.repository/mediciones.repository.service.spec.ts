import { Test, TestingModule } from '@nestjs/testing';
import { MedicionesRepositoryService } from './mediciones.repository.service';

describe('MedicionesRepositoryService', () => {
  let service: MedicionesRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicionesRepositoryService],
    }).compile();

    service = module.get<MedicionesRepositoryService>(MedicionesRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
