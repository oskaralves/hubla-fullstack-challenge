import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, Length, Matches } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  emailVerified?: Date;
  cellphoneVerified?: Date;

  @ApiPropertyOptional({
    example: 'Abcd123!',
    description: `A senha é utilizada para efetuar login.<br /><small>
    → Deve conter ao menos 1 letra maiúscula<br />
    → Deve conter ao menos 1 letra minúscula<br />
    → Deve conter ao menos 1 número<br />
    → Deve conter ao menos 1 caractere especial.</small>`,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' && value.trim() === '' ? null : value,
  )
  @Length(6, 90, {
    message: 'password must be longer than or equal to 6 characters',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password?: string | null;
}
