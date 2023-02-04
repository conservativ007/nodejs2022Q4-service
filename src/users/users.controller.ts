import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.ts';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

import { Response } from 'express';
import { UserValidationPipe } from '../validation/createUserValidationPipe';
import { ValidationPipe } from '../validation/validation.pipe';
import { UserEntity } from './entity/UserEntity';

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
    let user = this.userService.getById(id);
    if (user === undefined) {
      res.status(404);
      return;
    }
    res.status(200);
    return new UserEntity(user);
  }

  @UsePipes(UserValidationPipe)
  @Post()
  createUser(@Body() dto: CreateUserDto): UserEntity {
    let user = this.userService.create(dto);
    return new UserEntity(user);
  }

  // @UsePipes(UserValidationPipe)
  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) dto: UpdateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): UserEntity {
    let user = this.userService.update(id, dto);

    if (Object.keys(dto).length === 0) {
      res.status(400);
      return;
    }

    if (user === null) {
      res.status(404);
      return;
    }

    return new UserEntity(user);
  }

  @Delete(':id')
  deleteUSer(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    let isUserDeleted = this.userService.userDelete(id);
    if (isUserDeleted === true) {
      res.status(204);
      return;
    }
    res.status(404);
  }
}
