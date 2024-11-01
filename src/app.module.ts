import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { GenerateModule } from './modules/generate/generate.module';
import { DatabaseService } from './services/database.service';
import { CustomLogger } from './services/logger.service';

@Module({
  imports: [
    GenerateModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [DatabaseService, CustomLogger],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}

  async onModuleInit() {
    global.connection = await this.databaseService.connect();
  }
}
