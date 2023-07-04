import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCurriculumDto {
  @ApiProperty({ example: '1235689523635479' })
  @IsString()
  @IsNotEmpty()
  key: string;
}
