import { PartialType } from '@nestjs/swagger';
import { CreateSavedJobDto } from './create-saved-job.dto';

export class UpdateSavedJobDto extends PartialType(CreateSavedJobDto) {}
