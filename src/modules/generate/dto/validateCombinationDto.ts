import { HttpException, HttpStatus } from '@nestjs/common';

export function validateCreateCombinationDto(
  items: number[],
  length: number,
): void {
  if (!items || !length || length <= 0) {
    throw new HttpException('Invalid data found', HttpStatus.BAD_REQUEST);
  }

  if (!items.length) {
    throw new HttpException(
      'At least one item should be provided',
      HttpStatus.BAD_REQUEST,
    );
  }

  if (items.length < length) {
    throw new HttpException(
      'Combination length cannot exceed number of items',
      HttpStatus.BAD_REQUEST,
    );
  }
}
