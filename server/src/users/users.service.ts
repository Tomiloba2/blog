import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: Prisma.UserCreateInput) {
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: { email: createUserDto.email }
      })
      if (existingUser) {
        throw new ForbiddenException('an account with this email already exist')
      }
      const newUser = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: await bcrypt.hash(createUserDto.password, 20)
        }
      })
      const { password, ...rest } = newUser
      return rest
    } catch (error) {
      return error
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.user.findMany({
        include: {
          blog: true,
          comment: true
        }
      })
      if (!data) {
        throw new NotFoundException('users not found')
      }
      return data.map((item) => {
        const { password, ...rest } = item
        return rest
      })
    } catch (error) {
      return error
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.user.findUniqueOrThrow({
        where: { id },
        include: {
          blog: true,
          comment: true
        }
      })
      if (!data) {
        throw new NotFoundException('user does not exist')
      }
      const { password, ...rest } = data
      return rest
    } catch (error) {

    }
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { id } })
      if (!existingUser) throw new NotFoundException('user not found')
      const data = await this.prisma.user.update({
        where: { id },
        data: updateUserDto
      })
      const { password, ...rest } = data
      return rest
    } catch (error) {
      return error
    }
  }

  async remove(id: string) {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { id } })
      if (!existingUser) throw new NotFoundException('user not found')
      const data = await this.prisma.user.delete({
        where: { id },
        include: {
          blog: true,
          comment: true
        }
      })
      return data
    } catch (error) {
      return error
    }
  }
}
