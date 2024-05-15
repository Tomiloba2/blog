import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UpdateReplyDto } from './dto/update-replies.dto';
import { CreateReplyDto } from './dto/create-replies.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
  //replies
  @Post('/replies')
  createReplies(@Body() createReplyDto: CreateReplyDto) {
    return this.commentsService.createReplies(createReplyDto);
  }
  @Patch('/replies/:id')
  updateReplies(@Param('id') id: string, @Body() updateReplyDto: UpdateReplyDto) {
    return this.commentsService.updateReplies(id, updateReplyDto);
  }

  @Delete('/replies/:id')
  removeReplies(@Param('id') id: string) {
    return this.commentsService.removeReplies(id);
  }
}
