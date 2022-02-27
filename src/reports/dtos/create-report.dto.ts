import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @IsString()
  @ApiProperty()
  make: string;


  @IsString()
  @ApiProperty()
  model: string;

  @ApiProperty()
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;


  @ApiProperty()
  @IsLongitude()
  lng: number;


  @ApiProperty()
  @IsLatitude()
  lat: number;


  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;


  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
}