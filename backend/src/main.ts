/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from './modules/shared/services/config/config.service';
import { bootstrapApp } from './utils/bootstrap-app';
import { bootstrapRouteLog } from './utils/bootstrap-route-log';
import { rootLogger } from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  bootstrapApp(app);
  const { port, environment, host } = new ConfigService();

  const logMessage = `api server started host: ${host}:${port} `;
  await (environment === 'production'
    ? app
        .listen(port, () => {
          rootLogger.info({ port }, logMessage);
        })
        .catch((error) => {
          rootLogger.fatal(
            {
              err: error,
              errorStack: error.stack,
            },
            'fail to start server',
          );
          process.exit(1);
        })
    : app.listen(port, () => {
        rootLogger.info({ port }, logMessage);
        bootstrapRouteLog(app);
      }));
}
bootstrap();
