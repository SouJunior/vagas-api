import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckResponse {
    @ApiProperty({
      example: 'DOWN',
    })
    databaseStatus: string;
  
    @ApiProperty({
      example: 'OK',
    })
    mailerStatus: string;

}
  