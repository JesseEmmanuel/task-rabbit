import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'debug', 'log', 'error'],
  });

  app.enableCors(),
  app.setGlobalPrefix('api', {
    exclude: [{ path: '', method: RequestMethod.ALL }],
  })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
