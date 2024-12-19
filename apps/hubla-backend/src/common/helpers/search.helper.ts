interface SearchConditions {
  search?: string;
  fields?: string[];
  filters?: Record<
    string,
    { field: string; values: any[]; operator?: 'in' | 'contains' | 'equals' }
  >;
}

export class SearchHelper {
  static searchBuilder({
    search,
    fields = [],
    filters = {},
  }: SearchConditions) {
    const conditions: any[] = [];

    if (search?.trim()) {
      fields.forEach((field: string) => {
        conditions.push({
          [field]: { contains: search, mode: 'insensitive' },
        });
      });
    }

    if (filters) {
      Object.entries(filters).forEach(([key, { field, values, operator }]) => {
        if (values?.length) {
          const nestedCondition =
            operator === 'in'
              ? { [field]: { in: values } }
              : operator === 'contains'
                ? { [field]: { contains: values[0], mode: 'insensitive' } }
                : { [field]: { equals: values[0] } };

          conditions.push({
            [key]: {
              some: nestedCondition,
            },
          });
        }
      });
    }

    const response = { OR: conditions };
    return conditions.length > 0 ? response : undefined;
  }
}
