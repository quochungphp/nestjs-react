import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthSigninGuard extends AuthGuard('passport-local') {}
