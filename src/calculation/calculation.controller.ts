import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CalculationService } from './calculation.service';
import { CalculationDto } from './dto/calculation.dto';

@ApiTags('calculation')
@Controller('calculate')
export class CalculationController {
  constructor(private readonly calculationService: CalculationService) {}

  @Post()
  @ApiOperation({ summary: 'Calculate expression' })
  calculate(@Body() calculationDto: CalculationDto): number {
    return this.calculationService.calculate(calculationDto.expression);
  }
}
