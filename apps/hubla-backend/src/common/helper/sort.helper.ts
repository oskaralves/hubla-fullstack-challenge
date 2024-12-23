import { Injectable } from '@nestjs/common';

type OrderByParam<T> = {
  [P in keyof T]?: 'asc' | 'desc';
};

@Injectable()
export class SortHelper {
  static parseSortParam<T>(
    sort: string,
    validKeys: (keyof T)[],
  ): OrderByParam<T>[] {
    if (!sort) return [];
    return sort
      .split(',')
      .map((sortParam: string) => {
        const [field, order] = sortParam.split(':');
        if (validKeys.includes(field as keyof T)) {
          return {
            [field]: order === 'desc' ? 'desc' : 'asc',
          } as OrderByParam<T>;
        }
        return null;
      })
      .filter((item): item is OrderByParam<T> => item !== null);
  }
}
