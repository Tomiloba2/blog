import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ProtectedRouteGuard } from 'src/auth/guards/protect.guard';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) { }

  @UseGuards(ProtectedRouteGuard)
  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @UseGuards(ProtectedRouteGuard)
  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @UseGuards(ProtectedRouteGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @UseGuards(ProtectedRouteGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @UseGuards(ProtectedRouteGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
