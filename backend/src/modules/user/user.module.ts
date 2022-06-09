import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { UserEntity } from './entities/user.entity';
import { UserSignupAction } from './services/user-signup-action.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [SharedModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserSignupAction],
  exports: [UserSignupAction],
})
export class UserModule {}
