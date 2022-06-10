import { HttpService } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepository, Repository } from 'typeorm';
import { AppModule } from '../../app.module';
import { ErrorResponseTransformInterceptor } from '../../interceptors/error-response-transform.interceptor';
import { SuccessResponseTransformInterceptor } from '../../interceptors/success-response-transform.interceptor';
import { LoggerMiddleware } from '../../middlewares/logger.middleware';
import { AuthModule } from '../../modules/auth/auth.module';
import { ConfigService } from '../../modules/shared/services/config/config.service';
import { SharedModule } from '../../modules/shared/shared.module';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { UserModule } from '../../modules/user/user.module';

export type SetupContinuousIntegrationTest = {
  configService: ConfigService;
  httpService: HttpService;
  app: INestApplication;
  moduleFixture: TestingModule;
  userRepository: Repository<UserEntity>;
};

export async function setupContinuousIntegrationTest(): Promise<SetupContinuousIntegrationTest> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule, SharedModule, AuthModule, UserModule],
  }).compile();
  const httpService = moduleFixture.get<HttpService>(HttpService);
  const configService = moduleFixture.get<ConfigService>(ConfigService);
  const userRepository = getRepository<UserEntity>(UserEntity);
  const app = moduleFixture.createNestApplication();
  app.use(new LoggerMiddleware().use);
  app.useGlobalInterceptors(
    new SuccessResponseTransformInterceptor(),
    new ErrorResponseTransformInterceptor(),
  );
  await app.init();

  return {
    httpService,
    configService,
    app,
    moduleFixture,
    userRepository,
  };
}
