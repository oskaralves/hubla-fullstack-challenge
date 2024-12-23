import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwtDto } from '../dto/user-from-jwt.dto';
import { UserPayloadDto } from '../dto/user-payload.dto';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
      ignoreExpiration: false,
    });
  }
  async validate(payload: UserPayloadDto): Promise<UserFromJwtDto> {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
