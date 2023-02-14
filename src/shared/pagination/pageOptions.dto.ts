import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Order } from '.';

export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  @ApiProperty({
    description: 'Ordenação da lista',
    default: 'ASC',
  })
  readonly order?: Order = Order.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({
    description: 'Numero da pagina',
    default: 1,
  })
  readonly page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({
    description: 'Itens por pagina',
    default: 10,
  })
  readonly take?: number = 10;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Ordenação por uma coluna espeficica',
    default: 'id',
  })
  readonly orderByColumn?: string = 'id';

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
