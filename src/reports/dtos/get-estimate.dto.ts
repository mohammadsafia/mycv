import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  @ApiProperty()
  make: string;


  @IsString()
  @ApiProperty()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @ApiProperty()
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Transform(({ value }) => parseFloat(value))
  @ApiProperty()
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @ApiProperty()
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => parseInt(value))
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}