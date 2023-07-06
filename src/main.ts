import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression';
import * as session from 'express-session';
import helmet from 'helmet';
import * as csurf from 'csurf';
import 'dotenv/config';
import * as path from 'path';
import * as moduleAlias from 'module-alias';
import { NestExpressApplication } from '@nestjs/platform-express';

moduleAlias.addAliases({
  '@common': __dirname + '/src/common',
  '@base': __dirname + '/src/base',
  '@models': __dirname + '/src/models',
  '@auth': __dirname + '/src/auth',
  '@config': __dirname + '/src/config',
});


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.use(compression());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }))
  app.use(helmet());
  // app.use(csurf());
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
