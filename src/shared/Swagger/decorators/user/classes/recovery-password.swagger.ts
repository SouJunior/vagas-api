import { ApiProperty } from '@nestjs/swagger';

export class RecoveryPasswordSwagger {
  @ApiProperty({
    example:
      'Caso esse e-mail esteja cadastrado no sistema, será encaminhado para ele uma mensagem de orientação sobre os próximos passos para a redefinição da senha.',
  })
  message: string;
}