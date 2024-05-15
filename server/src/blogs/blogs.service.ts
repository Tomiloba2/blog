import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) { }

  async create(createBlogDto: CreateBlogDto) {
    try {
      const data = await this.prisma.blog.create({
        data: {
          title: createBlogDto.title,
          userId: createBlogDto.userId,
          content: createBlogDto.content,
          imgId: createBlogDto.imgId,
          imgUrl: createBlogDto.imgUrl
        }
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
          }, 
          comment: true,
          replies:true
        }
      })
      if (!data) throw new NotFoundException('blog not found')
      return data
    } catch (error) {
      return error
    }
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    try {
      const existingBlog = await this.prisma.blog.findUnique({ where: { id } })
      if (!existingBlog) throw new NotFoundException('blog not found')
      const data = await this.prisma.blog.update({
        where: { id }, data: {
          title: updateBlogDto.title,
          userId: updateBlogDto.userId,
          content: updateBlogDto.content,
          imgId: updateBlogDto.imgId,
          imgUrl: updateBlogDto.imgUrl
        }
      })
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
