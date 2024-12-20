interface SearchConditions {
  search?: string;
  fields?: string[];
}

export class SearchHelper {
  static searchBuilder({ search, fields = [] }: SearchConditions) {
    const conditions: any[] = [];

    if (search?.trim()) {
      fields.forEach((field: string) => {
        conditions.push({
          [field]: { contains: search, mode: 'insensitive' },
        });
      });
    }

    const response = { OR: conditions };
    return conditions.length > 0 ? response : undefined;
  }
}
