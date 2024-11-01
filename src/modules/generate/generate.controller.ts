import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { GenerateService } from './generate.service';
import { validateCreateCombinationDto } from './dto/validateCombinationDto';
import { CustomLogger } from '../../services/logger.service';
import type { CreateCombinationDto } from './dto/combinations.dto';

@Controller('generate')
export class GenerateController {
  constructor(
    private readonly GenerateService: GenerateService,
    private readonly logger: CustomLogger,
  ) {}

  @Post()
  async generate(@Body() createCombinationDto: CreateCombinationDto) {
    try {
      const { items, length } = createCombinationDto;

      validateCreateCombinationDto(items, length);

      return await this.GenerateService.generateCombinations(items, length);
    } catch (error) {
      // Check it the error is an HttpException and throw it again
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(error?.message);
      throw new HttpException(
        'Error generating combinations',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
