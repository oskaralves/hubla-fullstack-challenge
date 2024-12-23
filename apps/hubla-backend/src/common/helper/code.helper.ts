import { Injectable } from '@nestjs/common';

@Injectable()
export class CodeHelper {
  static generateRandomNumber(size = 6): string {
    const randomNumber = Math.floor(Math.random() * 1000000).toString();
    return randomNumber.padStart(size, '0');
  }
}
