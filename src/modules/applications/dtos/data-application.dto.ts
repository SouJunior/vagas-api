import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DataApplicationDto {
  @ApiProperty({
    example: '4b9864dc-79cf-4018-96a4-ad82137ba321',
    description: 'ID do usuário',
  })
  @IsString()
  @IsNotEmpty({ message: 'O campo user_id não pode estar vazio' })
  user_id: string;

  @ApiProperty({
    example: '4b9864dc-79cf-4018-96a4-ad82137ba321',
    description: 'ID da vaga',
  })
  @IsString()
  @IsNotEmpty({ message: 'O campo job_id não pode estar vazio' })
  job_id: string;

  @ApiProperty({
    example: 'fed50a27-3f51-4642-bfd6-57d5bd3c352a',
    description: 'ID do currículo',
  })
  @IsString()
  @IsNotEmpty({ message: 'O campo curriculum_id não pode estar vazio' })
  curriculum_id: string;
}
