import { Injectable } from '@nestjs/common';
import e from 'express';
import * as math from 'mathjs';

const DIVISION_BY_0_ERROR_MSG = 'Invalid operation: division by zero';
const NUMBER_TOO_LARGE_ERROR_MSG = 'Number too large';

@Injectable()
export class CalculationService {
  calculate(expression: string): number | string {
    try {
      const result = math.evaluate(expression);

      if (!isFinite(result)) {
        throw new Error(DIVISION_BY_0_ERROR_MSG);
      }

      if (Math.abs(result) > Number.MAX_SAFE_INTEGER) {
        throw new Error(NUMBER_TOO_LARGE_ERROR_MSG);
      }

      return result;
    } catch (error) {
      if (
        [DIVISION_BY_0_ERROR_MSG, NUMBER_TOO_LARGE_ERROR_MSG].includes(
          error.message,
        )
      ) {
        throw error;
      }
      throw new Error('Invalid mathematical expression');
    }
  }
}
