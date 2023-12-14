import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CalculationDto {
  @ApiProperty({
    description: 'The expression to be calculated',
    example: '2 + 2',
  })
  @IsNotEmpty({ message: 'Expression is required' })
  @IsString({ message: 'Expression must be a string' })
  @Matches(/^[0-9+\-*/(). ]+$/, {
    message: 'Expression contains invalid characters',
  })
  expression: string;
}
