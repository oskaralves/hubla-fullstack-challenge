export class PagedResponseParams<T> {
  path: string;
  search?: string;
  skip?: number;
  take?: number;
  sort?: string;
  totalRows: number;
  rows: T[];
}
