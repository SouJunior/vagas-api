import { BadRequestException } from '@nestjs/common';

export class CustomBadRequestException extends BadRequestException {
  constructor(message: string) {
    super({ status: 'error', message });
  }
}
