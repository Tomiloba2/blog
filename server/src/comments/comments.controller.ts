import { Controller, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UpdateReplyDto } from './dto/update-replies.dto';
import { CreateReplyDto } from './dto/create-replies.dto';
import { ProtectedRouteGuard } from 'src/auth/guards/protect.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @UseGuards(ProtectedRouteGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @UseGuards(ProtectedRouteGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @UseGuards(ProtectedRouteGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }

  @UseGuards(ProtectedRouteGuard)
  //replies
  @Post('/replies')
  createReplies(@Body() createReplyDto: CreateReplyDto) {
    return this.commentsService.createReplies(createReplyDto);
  }

  @UseGuards(ProtectedRouteGuard)
  @Patch('/replies/:id')
  updateReplies(@Param('id') id: string, @Body() updateReplyDto: UpdateReplyDto) {
    return this.commentsService.updateReplies(id, updateReplyDto);
  }

  @UseGuards(ProtectedRouteGuard)
  @Delete('/replies/:id')
  removeReplies(@Param('id') id: string) {
    return this.commentsService.removeReplies(id);
  }
}
