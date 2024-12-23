import { Request } from 'express';
import { UserFromJwtDto } from './user-from-jwt.dto';

export interface AuthRequestDto extends Request {
  user: UserFromJwtDto;
}
