import { Test, TestingModule } from '@nestjs/testing';
import { GenerateService } from '../../modules/generate/generate.service';
import { DatabaseService } from '../../services/database.service';
import { GenerateController } from '../../modules/generate/generate.controller';
import { CustomLogger } from '../../services/logger.service';

const expectedResult = {
  id: 1,
  combination: [['A1', 'B1']],
};

describe('GenerateService', () => {
  let service: GenerateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateService, DatabaseService, CustomLogger],
      controllers: [GenerateController],
    }).compile();

    service = module.get<GenerateService>(GenerateService);
    const databaseService = module.get<DatabaseService>(DatabaseService);
    jest
      .spyOn(databaseService, 'makeCombinationsTransaction')
      .mockResolvedValue(expectedResult);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate combinations', async () => {
    expect(await service.generateCombinations([1, 2, 3], 2)).toEqual(
      expectedResult,
    );
  });
});
