import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './Local.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './auth.session';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,SessionSerializer],
  imports: [PassportModule.register({ session: true })]
})
export class AuthModule { }
