import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache/cache.module';
import { PermissionModule } from './permission/permission.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './role/role.module';
import { TransactionTypeModule } from './transaction-type/transaction-type.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule,
    PrismaModule,
    AuthModule,
    TransactionModule,
    TransactionTypeModule,
    RoleModule,
    UserModule,
    PermissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
