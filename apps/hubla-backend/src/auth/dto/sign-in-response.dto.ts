import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserDto } from '../../user/dto/user.dto';

export class SignInResponseDto extends UserDto {
  @IsString()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NjI2YmYzNS1mMWZlLTQ4ZDAtODY4ZS1lYmQ5ZTYxYjNmOTkiLCJlbWFpbCI6Im9zay5hbHZlc0BnbWFpbC5jb20iLCJuYW1lIjoiT3NjYXIgQWRtaW4iLCJpYXQiOjE2ODcxMzM3NDYsImV4cCI6MTY4NzIyMDE0Nn0.QkpPzE3BHwX9_gmHsrYWd5osoE1lS0AtQVPI1Rraokc',
  })
  accessToken: string;

  @IsString()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NjI2YmYzNS1mMWZlLTQ4ZDAtODY4ZS1lYmQ5ZTYxYjNmOTkiLCJlbWFpbCI6Im9zay5hbHZlc0BnbWFpbC5jb20iLCJuYW1lIjoiT3NjYXIgQWRtaW4iLCJpYXQiOjE2ODcxMzM3NDYsImV4cCI6MTY5NDkwOTc0Nn0.wrPD1_2P5aUmaI7vmcyKs9C9FtSsxvDHsU6-MyunFHk',
  })
  refreshToken: string;
}
