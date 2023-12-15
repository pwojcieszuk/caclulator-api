import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CalculationService } from './calculation.service';
import { CalculationDto } from './dto/calculation.dto';
import { ResultDto } from './dto/result.dto';

@ApiTags('calculation')
@Controller('calculate')
export class CalculationController {
  constructor(private readonly calculationService: CalculationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Calculate expression' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The calculation result',
    type: ResultDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  calculate(@Body() calculationDto: CalculationDto): ResultDto {
    try {
      const result = this.calculationService.calculate(
        calculationDto.expression,
      );
      return { result };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
