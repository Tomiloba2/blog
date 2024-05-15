import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateReplyDto } from './dto/create-replies.dto';
import { UpdateReplyDto } from './dto/update-replies.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) { }
  async create(createCommentDto: CreateCommentDto) {
    try {
      const data = await this.prisma.comment.create({
        data: {
          content: createCommentDto.content,
          userId: createCommentDto.userId,
          blogId: createCommentDto.blogId
        }
      })
      return data
    } catch (error) {
      return error
    }
  }
  async update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      const existingComment = await this.prisma.comment.findUnique({ where: { id } })
      if (!existingComment) {
        throw new NotFoundException('comment does not exist')
      }
      const newComment = await this.prisma.comment.update({
        where: { id },
        data: {
          content: updateCommentDto.content
        }
      })
      return newComment
    } catch (error) {
      return error
    }
  }

  async remove(id: string) {
    try {
      const existingComment = await this.prisma.comment.findUnique({ where: { id } })
      if (!existingComment) {
        throw new NotFoundException('comment does not exist')
      }
      const deleteComment = await this.prisma.comment.delete({
        where: { id }
      })
      return deleteComment
    } catch (error) {
      return error
    }
  }

  //replies
  async createReplies(createReplyDto: CreateReplyDto) {
    try {
      const data = await this.prisma.replies.create({
        data: {
          content: createReplyDto.content,
          userId: createReplyDto.userId,
          blogId: createReplyDto.blogId,
          commentId:createReplyDto.commentId
        }
      })
      return data
    } catch (error) {
      return error
    }
  }
  async updateReplies(id: string, updateReplyDto: UpdateReplyDto) {
    try {
      const existingComment = await this.prisma.replies.findUnique({ where: { id } })
      if (!existingComment) {
        throw new NotFoundException('comment does not exist')
      }
      const newComment = await this.prisma.replies.update({
        where: { id },
        data: {
          content: updateReplyDto.content
        }
      })
      return newComment
    } catch (error) {
      return error
    }
  }

    async removeReplies(id: string) {
    try {
      const existingComment = await this.prisma.replies.findUnique({ where: { id } })
      if (!existingComment) {
        throw new NotFoundException('comment does not exist')
      }
      const deleteComment = await this.prisma.replies.delete({
        where: { id }
      })
      return deleteComment
    } catch (error) {
      return error
    }
  }
}
