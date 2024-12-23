import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordHelper {
  static async hashPasswordAsync(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  static async comparePasswordsAsync({
    hash,
    password,
  }: {
    hash: string;
    password: string;
  }): Promise<boolean> {
    return await argon2.verify(hash, password);
  }
}
