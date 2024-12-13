import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Status } from 'src/modules/applications/enums/status.enum';

export class UpdateStatusDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  applicationId: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}
