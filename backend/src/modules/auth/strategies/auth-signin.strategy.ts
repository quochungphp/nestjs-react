import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDto } from '../../user/dtos/user.dto';
import { AuthValidateAction } from '../services/auth-validate-action.service';

@Injectable()
export class AuthSigninStrategy extends PassportStrategy(
  Strategy,
  'passport-local',
) {
  constructor(private readonly authValidateAction: AuthValidateAction) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string): Promise<UserDto> {
    return this.authValidateAction.execute(username, password);
  }
}
