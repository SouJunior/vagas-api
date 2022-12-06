import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UpdateMyPasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'You need a stronger password.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmNewPassword: string;
}

export class CreatePasswordHashDto {
  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsString()
  confirmPassword: string;

  @IsString()
  recoverPasswordToken?: string;
}
