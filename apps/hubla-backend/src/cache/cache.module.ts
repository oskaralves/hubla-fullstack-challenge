import { CacheModule as CacheManagerModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { CacheController } from './cache.controller';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheManagerModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        password: configService.get('REDIS_PASSWORD'),
        ttl: 10,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CacheController],
  providers: [CacheService],
})
export class CacheModule {}
