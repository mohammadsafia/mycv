import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApproveReportDto {
  @ApiProperty()
  @IsBoolean()
  approved: boolean;
}