import { Test, TestingModule } from '@nestjs/testing';
import { RelacionPacProService } from './relacion-pac-pro.service';

describe('RelacionPacProService', () => {
  let service: RelacionPacProService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelacionPacProService],
    }).compile();

    service = module.get<RelacionPacProService>(RelacionPacProService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
