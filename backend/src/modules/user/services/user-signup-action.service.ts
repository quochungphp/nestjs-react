import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserSignupAction {
  constructor(
    private configService: ConfigService,
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
}
