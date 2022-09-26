import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Order } from '.';

export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly take?: number = 10;

  @IsOptional()
  @IsString()
  readonly orderByColumn?: string = 'id';

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
