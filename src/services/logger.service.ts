import { Injectable, Logger } from '@nestjs/common';
import { appendFileSync, existsSync, mkdirSync } from 'fs';

import { MAX_ERROR_LOG_LENGTH } from '../data/configs';
import adjustString from '../helpers/adjustString';

@Injectable()
export class CustomLogger {
  private readonly logger = new Logger();

  constructor() {
    if (!existsSync('logs')) {
      mkdirSync('logs', { recursive: true });
    }
  }

  error(message: string) {
    this.logger.error(adjustString(message, MAX_ERROR_LOG_LENGTH));
    appendFileSync(
      './logs/errors.log',
      `${new Date().toISOString()} - ${message} \n`,
    );
  }

  info(message: string) {
    this.logger.log(message);
  }
}
