import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculationService {
  calculate(expression: string): number {
    // Implement calculation logic here
    // You might use 'eval' or a safer alternative like a math expression evaluator library
    console.log(expression);
    return 40;
  }
}
