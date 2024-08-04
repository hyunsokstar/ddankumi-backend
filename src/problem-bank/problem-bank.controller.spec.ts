import { Test, TestingModule } from '@nestjs/testing';
import { ProblemBankController } from './problem-bank.controller';
import { ProblemBankService } from './problem-bank.service';

describe('ProblemBankController', () => {
  let controller: ProblemBankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemBankController],
      providers: [ProblemBankService],
    }).compile();

    controller = module.get<ProblemBankController>(ProblemBankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
