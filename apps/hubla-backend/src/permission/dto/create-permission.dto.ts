import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePermissionDto {
  @MaxLength(20)
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string;
}
