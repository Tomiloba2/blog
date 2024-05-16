import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProtectedRouteGuard } from 'src/auth/guards/protect.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(ProtectedRouteGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(ProtectedRouteGuard)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @UseGuards(ProtectedRouteGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @UseGuards(ProtectedRouteGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
