import { Module } from '@nestjs/common';
import { RolesController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [],
  controllers: [RolesController],
  providers: [RoleService],
})
export class RoleModule {}
