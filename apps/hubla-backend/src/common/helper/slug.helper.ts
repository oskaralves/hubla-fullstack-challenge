import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class SlugHelper {
  static createSlug(name: string): string {
    return slugify(name, {
      lower: true,
      locale: 'pt',
      remove: /[*+~.()'"!:@]/g,
      trim: true,
    });
  }

  static generateUniqueSlug(name: string, existingSlugs: string[]): string {
    const slug = this.createSlug(name);

    let uniqueSlug = slug;
    let counter = 1;
    while (existingSlugs.includes(uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return uniqueSlug;
  }
}
