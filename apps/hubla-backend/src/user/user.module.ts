import { Module } from '@nestjs/common';

import { UsersController } from './controller/users.controller';
import { UserRoleHelper } from './helper/user-role.helper';
import { UserValidationHelper } from './helper/user-validation.helper';
import { CheckUserExistenceUseCase } from './use-case/check-user-existence.use-case';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { FindManyPagedUsersUseCase } from './use-case/find-many-paged-users.use-case';
import { FindUserByIdUseCase } from './use-case/find-user-by-id.use-case';
import { RemoveUserUseCase } from './use-case/remove-user.use-case';
import { UpdateUserUseCase } from './use-case/update-user.use-case';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    FindUserByIdUseCase,
    FindManyPagedUsersUseCase,
    RemoveUserUseCase,
    CheckUserExistenceUseCase,
    UserRoleHelper,
    UserValidationHelper,
  ],
  exports: [
    CreateUserUseCase,
    UpdateUserUseCase,
    FindUserByIdUseCase,
    FindManyPagedUsersUseCase,
    RemoveUserUseCase,
    RemoveUserUseCase,
    CheckUserExistenceUseCase,
    UserRoleHelper,
    UserValidationHelper,
  ],
})
export class UserModule {}
