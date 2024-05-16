import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session'
import * as passport from "passport"
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { PrismaService } from './prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaService

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.use(session({
    secret: 'bbbekdflpdlwadkdw;d',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 36000 },
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined
      })
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(3000);
}
bootstrap();
