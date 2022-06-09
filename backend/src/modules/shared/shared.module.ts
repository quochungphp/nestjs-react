import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from './services/config/config.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    HttpModule.register({}),
  ],
  exports: [ConfigService, CacheModule, HttpModule],
  providers: [ConfigService, HttpModule],
})
export class SharedModule {}
