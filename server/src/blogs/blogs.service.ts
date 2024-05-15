import { Injectable, NotFoundException } from '@nestjs/common';
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
      return data
    } catch (error) {
      return error
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.blog.findMany({
        include: {
          User: {
            select: {
              name: true, email: true, img: true, id: true
            }
          }
        }
      })
      if (!data) {
        throw new NotFoundException('blogs not found')
      }
      return data
    } catch (error) {
      return error
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.blog.findUniqueOrThrow({
        where: { id },
        include: {
          User: {
            select: {
              name: true, email: true, img: true, id: true
            }
          }, comment: true
        }
      })
      if (!data) throw new NotFoundException('blog not found')
      return data
    } catch (error) {
      return error
    }
  }

  async update(id: string, updateBlogDto: Prisma.blogUpdateInput) {
    try {
      const existingBlog = await this.prisma.blog.findUnique({ where: { id } })
      if (!existingBlog) throw new NotFoundException('blog not found')
      const data = await this.prisma.blog.update({ where: { id }, data: updateBlogDto })
      return data
    } catch (error) {
      return error
    }
  }

  async remove(id: string) {
    try {
      const data = await this.prisma.blog.findUniqueOrThrow({ where: { id } })
      if (!data) throw new NotFoundException('blog not found ')
      return await this.prisma.blog.delete({ where: { id }, include: { comment: true } })
    } catch (error) {
      return error
    }
  }
}
