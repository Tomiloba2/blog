import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async validateUser(createAuthDto:CreateAuthDto) {
    try {
      const data = await this.prisma.user.findUnique({
        where: { email:createAuthDto.email }
      })
      if (!data) {
        throw new NotFoundException('account does not exist')
      }
      const verifyPassword = await bcrypt.compare(createAuthDto.password, data.password)
      if (!verifyPassword) {
        throw new UnauthorizedException('password is incorrect')
      }
      return { msg: "authenticated" }
    } catch (error) {
      return error
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
