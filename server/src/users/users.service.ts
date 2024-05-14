import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: Prisma.UserCreateInput) {
    try {
      const data = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password
        }
      })
      return data
    } catch (error) {
      return error
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.user.findMany()
      return data
    } catch (error) {

    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.user.findUniqueOrThrow({
        where: { id }
      })
      return data
    } catch (error) {

    }
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    try {
      const data = await this.prisma.user.update({
        where: { id },
        data: updateUserDto
      })
      return data
    } catch (error) {
      return error
    }
  }

  async remove(id: string) {
    try {
      const data = await this.prisma.user.delete({
        where: {
          id
        }
      })
      return data
    } catch (error) {
      return error
    }
  }
}
