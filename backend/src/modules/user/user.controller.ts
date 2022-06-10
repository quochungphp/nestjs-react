import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AppRequest } from '../../utils/app-request';
import { AuthJwtGuard } from '../auth/guards/auth-jwt.guard';
import { UserChangePasswordDto } from './dtos/user-change-pasword.dto';
import { UserSignupDto } from './dtos/user-signup.dto';
import { UserChangePasswordAction } from './services/user-change-password-action.service';
import { UserGetProfileAction } from './services/user-get-profile-action.service';
import { UserSignupAction } from './services/user-signup-action.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UsePipes(new ValidationPipe({ transform: true }))
export class UserController {
  constructor(
    private userSignupAction: UserSignupAction,
    private userChangePasswordAction: UserChangePasswordAction,
    private userGetProfileAction: UserGetProfileAction,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Req() request: AppRequest, @Body() payload: UserSignupDto) {
    return this.userSignupAction.execute(request, payload);
  }

  @UseGuards(AuthJwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('change-password')
  async changePassword(
    @Req() request: AppRequest,
    @Body() payload: UserChangePasswordDto,
  ) {
    return this.userChangePasswordAction.execute(request, payload);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthJwtGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('/profile')
  async profile(@Req() request: AppRequest) {
    return this.userGetProfileAction.execute(request);
  }
}
