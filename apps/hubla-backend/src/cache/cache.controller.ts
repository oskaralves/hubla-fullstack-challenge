import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { CacheService } from './cache.service';
import { CacheType } from './dto/key.type';

@ApiTags('Cache')
@ApiExcludeController()
@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Post(':type')
  async addToken(
    @Param('type') type: CacheType,
    @Body() body: { key: string },
  ): Promise<void> {
    const { key } = body;
    await this.cacheService.set(type, key, { key }, { ttl: 2001920 });
  }

  @Get('all')
  async getTokensByCacheKey(@Query('key') key: CacheType): Promise<string[]> {
    return this.cacheService.getTokensByCacheKey(key);
  }

  @Get('cacheType/:type/:key')
  async getTokens(
    @Param('type') type: CacheType,
    @Param('key') key: string,
  ): Promise<string[] | string> {
    return this.cacheService.get(type, key);
  }

  @Delete(':type/:key')
  async deleteToken(
    @Param('type') type: CacheType,
    @Param('key') key: string,
  ): Promise<void> {
    await this.cacheService.del(type, key);
  }
}
