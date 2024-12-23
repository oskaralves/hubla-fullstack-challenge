import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { SignInRequestDto } from '../dto/sign-in-request.dto';

@Injectable()
export class SignInValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const loginRequestBody = new SignInRequestDto();
    loginRequestBody.email = body.email;
    loginRequestBody.password = body.password;
    const validations = await validate(loginRequestBody);
    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc, curr) => {
          return [...acc, ...Object.values(curr.constraints)];
        }, []),
      );
    }
    next();
  }
}
