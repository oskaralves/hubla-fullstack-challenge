import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';
import { CacheType } from './dto/key.type';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async set(
    cacheType: CacheType,
    key: string,
    value: unknown,
    options?: CachingConfig,
  ): Promise<void> {
    await this.cacheManager.set(`${cacheType}:${key}`, value, options);
  }

  async get<T = any>(cacheType: CacheType, key: string | number): Promise<T> {
    return this.cacheManager.get(this.generateCacheKey(cacheType, key));
  }

  async del(cacheType: CacheType, key: string | number): Promise<void> {
    return await this.cacheManager.del(this.generateCacheKey(cacheType, key));
  }

  async getTokensByCacheKey(cacheKey: CacheType): Promise<string[]> {
    const keys = await this.getKeysByCacheKey(cacheKey);
    const tokens = await Promise.all(
      keys.map((key) => this.cacheManager.get<string>(key)),
    );
    return tokens.filter((token) => token !== null);
  }

  private async getKeysByCacheKey(cacheKey: CacheType): Promise<string[]> {
    const allKeys = await this.cacheManager.store.keys();
    console.log('allKeys', allKeys);

    return allKeys.filter((key) => key.startsWith(`${cacheKey}:`));
  }

  private generateCacheKey(cacheKey: CacheType, key: string | number): string {
    return `${cacheKey}:${key}`;
  }
}
