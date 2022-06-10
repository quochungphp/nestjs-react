import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  setupContinuousIntegrationTest,
  SetupContinuousIntegrationTest,
} from '../../../utils/helper/setup-ci-test';
import { waitTime } from '../../../utils/wait-time';
import { ConfigService } from '../../shared/services/config/config.service';

describe('AuthController', () => {
  let app: INestApplication;
  let configService: ConfigService;
  let appContext: SetupContinuousIntegrationTest;
  beforeAll(async () => {
    appContext = await setupContinuousIntegrationTest();
    app = appContext.app;
    configService = appContext.configService;
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('POST /auth', () => {
    it('should return successful when user request signin', async () => {
      const time = Date.now();
      const response = await request(app.getHttpServer())
        .post('/users')
        .set('x-api-key', configService.apiKey)
        .send({
          email: `${time}@gmail.com`,
          firstName: 'Lo',
          lastName: 'Rem',
          password: '123456@abc',
          phone: 123456789,
          username: `${time}@gmail.com`,
        });
      expect(response.body).toMatchObject({
        status: 'success',
        data: {
          email: `${time}@gmail.com`,
          firstName: 'Lo',
          lastName: 'Rem',
          password: expect.any(String),
          phone: 123456789,
          username: `${time}@gmail.com`,
          provider: 'PASSWORD',
          updatedAt: expect.any(String),
          id: expect.any(Number),
          createdAt: expect.any(String),
          token: expect.any(String),
        },
      });

      const responseSigin = await request(app.getHttpServer())
        .post('/auth')
        .set('x-api-key', configService.apiKey)
        .send({
          username: `${time}@gmail.com`,
          password: '123456@abc',
        });

      expect(responseSigin.header['accesstoken'].length).toBeGreaterThan(100);
      expect(responseSigin.header['refreshtoken'].length).toBeGreaterThan(100);

      expect(responseSigin.body).toMatchObject({
        status: 'success',
        data: {
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          firstName: 'Lo',
          lastName: 'Rem',
          username: `${time}@gmail.com`,
          email: `${time}@gmail.com`,
          phone: 123456789,
          loginProvider: 'PASSWORD',
          sessionId: expect.any(String),
        },
      });
    });
  });
});
