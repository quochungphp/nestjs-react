import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { UserEntity } from '../user/entities/user.entity';
import { AuthJwtGuard } from './guards/auth-jwt.guard';
import { AuthSignInAction } from './services/auth-signin-action.service';
import { AuthValidateAction } from './services/auth-validate-action.service';
import { AuthJwtStrategy } from './strategies/auth-jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthSigninGuard } from './guards/auth-signin.guard';
import { AuthSigninStrategy } from './strategies/auth-signin.strategy';
import { AuthSignOutAction } from './services/auth-signout-action.service';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [
    AuthJwtStrategy,
    AuthJwtGuard,
    AuthSigninStrategy,
    AuthValidateAction,
    AuthSignInAction,
    AuthSigninGuard,
    AuthSignOutAction,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
