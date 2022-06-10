import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '../../shared/services/config/config.service';

@Injectable()
export class AuthVerifyApiKey implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [request] = context.getArgs();
    const xApiKey = request.headers['x-api-key'];
    if (!xApiKey) {
      throw new UnauthorizedException('XApiKey Not Found');
    }

    const { apiKey } = this.configService;
    if (xApiKey !== apiKey) {
      throw new UnauthorizedException('XApiKey Not Correct');
    }

    return true;
  }
}
