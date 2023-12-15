import { Test, TestingModule } from '@nestjs/testing';
import { CalculationService } from './calculation.service';

describe('CalculationService', () => {
  let service: CalculationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculationService],
    }).compile();

    service = module.get<CalculationService>(CalculationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should correctly calculate an expression', () => {
    expect(service.calculate('2 + 2')).toBe(4);
    expect(service.calculate('2 * (2 + 3)')).toBe(10);
  });

  it('should handle very large numbers', () => {
    expect(service.calculate('2e+1000')).toBe('Error: Number too large');
  });

  it('should handle small numbers accurately', () => {
    expect(service.calculate('0.1 + 0.2')).toBeCloseTo(0.3);
  });

  it.only('should throw an error for division by zero', () => {
    expect(() => service.calculate('1 / 0')).toThrow(
      'Invalid operation: division by zero',
    );
  });
});
