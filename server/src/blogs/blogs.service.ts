import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) { }

  async create(createBlogDto: Prisma.blogCreateInput) {
    try {
      const data = await this.prisma.blog.create({
        data: createBlogDto
      })
    } catch (error) {

    }
  }

  async findAll() {
    try {
      const data = await this.prisma.blog.findMany()
      return data
    } catch (error) {

    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.blog.findUniqueOrThrow({ where: { id } })
    } catch (error) {

    }
  }

  async update(id: string, updateBlogDto: Prisma.blogUpdateInput) {
    try {
      const data = await this.prisma.blog.update({ where: { id }, data: updateBlogDto })
    } catch (error) {

    }
  }

  async remove(id: string) {
    try {
      const data = await this.prisma.blog.findUniqueOrThrow({ where: { id } })
    } catch (error) {

    }
  }
}
