import { Test, TestingModule } from '@nestjs/testing';
import { ProblemBankService } from './problem-bank.service';

describe('ProblemBankService', () => {
  let service: ProblemBankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemBankService],
    }).compile();

    service = module.get<ProblemBankService>(ProblemBankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
