import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordRequestDto {
  @IsString()
  code: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // @todo: add validation with password field
  passwordConfirmation: string;
}
