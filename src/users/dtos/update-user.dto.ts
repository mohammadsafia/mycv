import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    required: false
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false
  })
  password: string;
}