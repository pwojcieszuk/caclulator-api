import { ApiProperty } from '@nestjs/swagger';

export class CalculationDto {
  @ApiProperty({
    description: 'The expression to be calculated',
    example: '2 + 2',
  })
  expression: string;
}
