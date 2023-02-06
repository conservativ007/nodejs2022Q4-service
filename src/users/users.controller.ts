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
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.ts';
import { UsersService } from './users.service';

import { Response } from 'express';
import { UserEntity } from './entity/UserEntity';
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
  getUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ): UserEntity {
    const user = this.userService.getById(id);
    if (user === undefined) {
      res.status(404);
      return;
    }
    res.status(200);
    return new UserEntity(user);
  }

  @Post()
  createUser(@Body() dto: CreateUserDto): UserEntity {
    const user = this.userService.create(dto);
    return new UserEntity(user);
  }

  @HttpCode(200)
  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserPasswordDto,
  ): UserEntity {
    const user = this.userService.update(id, dto);
    return new UserEntity(user);
  }

  @Delete(':id')
  deleteUSer(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const isUserDeleted = this.userService.userDelete(id);
    if (isUserDeleted === true) {
      res.status(204);
      return;
    }
    res.status(404);
  }
}
