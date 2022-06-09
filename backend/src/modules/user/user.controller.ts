import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AppRequest } from '../../utils/app-request';
import { UserSignupDto } from './dtos/user-signup.dto';
import { UserSignupAction } from './services/user-signup-action.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UsePipes(new ValidationPipe({ transform: true }))
export class UserController {
  constructor(private userSignupAction: UserSignupAction) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Req() request: AppRequest, @Body() payload: UserSignupDto) {
    return this.userSignupAction.execute(request, payload);
  }
}
