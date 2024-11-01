import { Module } from '@nestjs/common';

import { GenerateService } from './generate.service';
import { GenerateController } from './generate.controller';
import { DatabaseService } from '../../services/database.service';
import { CustomLogger } from '../../services/logger.service';

@Module({
  providers: [GenerateService, DatabaseService, CustomLogger],
  controllers: [GenerateController],
})
export class GenerateModule {}
