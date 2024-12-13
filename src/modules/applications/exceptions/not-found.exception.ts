import { NotFoundException } from '@nestjs/common';

export class CustomNotFoundException extends NotFoundException {
  constructor(message: string) {
    super({ status: 'error', message });
  }
}
