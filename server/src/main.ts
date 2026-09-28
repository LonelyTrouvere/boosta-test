import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: config.get<string>('FRONTEND_URL', 'http://localhost:3000'),
    credentials: true,
  });
  app.enableShutdownHooks();

  const port = config.get<number>('PORT', 4000);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
