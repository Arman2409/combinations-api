import { Test, TestingModule } from '@nestjs/testing';

import { GenerateController } from '../../modules/generate/generate.controller';
import { GenerateService } from '../../modules/generate/generate.service';
import { DatabaseService } from '../../services/database.service';
import { CustomLogger } from '../../services/logger.service';

describe('GenerateController', () => {
  let controller: GenerateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerateController],
      providers: [GenerateService, DatabaseService, CustomLogger],
    }).compile();

    controller = module.get<GenerateController>(GenerateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should fail for invalid data', () => {
    expect(controller.generate({ items: [], length: 0 })).rejects.toThrow(
      'Invalid data found',
    );
  });
});
