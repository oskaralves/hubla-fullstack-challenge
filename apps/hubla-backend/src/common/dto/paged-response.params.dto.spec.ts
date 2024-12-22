import { PagedResponseParams } from './paged-response-params.dto';

describe('PagedResponseParams', () => {
  it('should correctly assign values to its properties', () => {
    const dto = new PagedResponseParams<string>();
    dto.path = '/test-path';
    dto.search = 'test-query';
    dto.skip = 0;
    dto.take = 10;
    dto.sort = 'name:asc';
    dto.totalRows = 100;
    dto.rows = ['item1', 'item2', 'item3'];

    expect(dto.path).toBe('/test-path');
    expect(dto.search).toBe('test-query');
    expect(dto.skip).toBe(0);
    expect(dto.take).toBe(10);
    expect(dto.sort).toBe('name:asc');
    expect(dto.totalRows).toBe(100);
    expect(dto.rows).toEqual(['item1', 'item2', 'item3']);
  });

  it('should handle optional properties correctly', () => {
    const dto = new PagedResponseParams<string>();
    dto.path = '/test-path';
    dto.totalRows = 0;
    dto.rows = [];

    expect(dto.path).toBe('/test-path');
    expect(dto.search).toBeUndefined();
    expect(dto.skip).toBeUndefined();
    expect(dto.take).toBeUndefined();
    expect(dto.sort).toBeUndefined();
    expect(dto.totalRows).toBe(0);
    expect(dto.rows).toEqual([]);
  });
});
