import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../../services/database.service';
import prefixItems from './utils/prefixItems';
import generateValidCombinations from './utils/generateValidCombinations';

@Injectable()
export class GenerateService {
  constructor(private readonly databaseService: DatabaseService) {}

  async generateCombinations(items: number[], length: number) {
    const prefixedItems = prefixItems(items);

    const validCombinations = generateValidCombinations(prefixedItems, length);

    const response = await this.databaseService.makeCombinationsTransaction(
      validCombinations,
    );

    return response;
  }
}
