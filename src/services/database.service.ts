import { Injectable } from '@nestjs/common';
import { createConnection, type Connection } from 'mysql2/promise';

import { CustomLogger } from './logger.service';

const CONNECTION_NOT_FOUND_ERROR =
  'Connection not found, not inserting the data';

@Injectable()
export class DatabaseService {
  constructor(private readonly logger: CustomLogger) {}

  private connection: Connection;

  public async connect() {
    try {
      this.connection = await createConnection({
        uri: process.env.DATABASE_URL + process.env.DATABASE_NAME,
      });

      this.logger.info('Connected to database successfully!');
      return this.connection;
    } catch (error) {
      this.logger.error(
        `Failed to connect to database, message: ${error?.message}`,
      );
    }
  }

  public async makeCombinationsTransaction(combination: string[][]) {
    const connection = global.connection;

    if (global.connection) {
      this.logger.error(CONNECTION_NOT_FOUND_ERROR);
      throw new Error(CONNECTION_NOT_FOUND_ERROR);
    }

    try {
      await connection.beginTransaction();

      const flattenedItems = combination.flatMap((comb) => comb);

      await this.insertItems(flattenedItems);
      const saveCombinationResult = await this.insertCombination(combination);

      const response = {
        id: saveCombinationResult.insertId,
        combination,
      };

      await this.insertResponse({
        ...response,
        timestamp: new Date(),
      });
      await connection.commit();

      return response;
    } catch (error) {
      await connection.rollback();
      await connection.end();
      this.logger.error(`Failed to save data, message: ${error?.message}`);
    }
  }

  private async insertItems(itemTexts: string[]) {
    const connection = global.connection;

    const placeholders = itemTexts.map(() => '(?)').join(',');
    const values = [...itemTexts];

    const [result] = await connection.execute(
      `INSERT INTO items (initial_letter) VALUES ${placeholders}`,
      values,
    );

    return result;
  }

  private async insertCombination(combination: string[][]) {
    const connection = global.connection;

    const [result] = await connection.execute(
      'INSERT INTO combinations (combination) VALUES (?)',
      [JSON.stringify(combination)],
    );

    return result;
  }

  private async insertResponse({
    timestamp,
    combination,
    id,
  }: {
    timestamp: Date;
    combination: string[][];
    id: number;
  }) {
    const connection = global.connection;

    const [result] = await connection.execute(
      'INSERT INTO responses (id, timestamp, combination) VALUES (?, ?, ?)',
      [id, timestamp, combination],
    );
    return result;
  }
}
