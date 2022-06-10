import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { UserEntity } from './entities/user.entity';
import { UserChangePasswordAction } from './services/user-change-password-action.service';
import { UserChangeProfileAction } from './services/user-change-profile.service';
import { UserGetProfileAction } from './services/user-get-profile-action.service';
import { UserSignupAction } from './services/user-signup-action.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [SharedModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserSignupAction,
    UserChangePasswordAction,
    UserGetProfileAction,
    UserChangeProfileAction,
  ],
})
export class UserModule {}
