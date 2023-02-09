import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.ts';
import { UsersService } from './users.service';

import { Response } from 'express';
import { UserEntity } from './entity/user.entity';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.getById(id);
    return new UserEntity(user);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    let serializeUser = new UserEntity(user);
    return serializeUser;
  }

  @HttpCode(200)
  @Put(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserPasswordDto,
  ) {
    const user = await this.userService.update(id, dto);
    return new UserEntity(user);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteUSer(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.userDelete(id);
  }
}
