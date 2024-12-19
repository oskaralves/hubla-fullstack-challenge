import { PagedResponseParams } from '../dto/paged-response-params.dto';
import { PagedResponseDto } from '../dto/paged-response.dto';

export class ResponseHelper {
  static pagedResponse<T>({
    path,
    search,
    skip = 0,
    take = 10,
    sort,
    rows,
    totalRows,
  }: PagedResponseParams<T>): PagedResponseDto<T> {
    const totalPages = Math.ceil(totalRows / take);
    const currentPage = Math.min(totalPages, Math.floor(skip / take) + 1);
    const hasMore = currentPage < totalPages;
    const searchTerm = search ? `&search=${search}` : '';
    const sortTerm = sort ? `&sort=${sort}` : '';
    const prevUrl =
      skip > 0
        ? `${path}?skip=${Math.max(
            skip - take,
            0,
          )}&take=${take}${searchTerm}${sortTerm}`
        : null;
    const nextUrl = hasMore
      ? `${path}?skip=${skip + take}&take=${take}${searchTerm}${sortTerm}`
      : null;

    const links = { prev: prevUrl, next: nextUrl };
    const meta = { timestamp: new Date() };

    return {
      countRows: rows.length,
      totalRows,
      currentPage,
      totalPages,
      hasMore,
      links,
      meta,
      rows,
    };
  }
}
