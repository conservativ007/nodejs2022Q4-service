import { Injectable } from '@nestjs/common';
import { DB } from 'src/DB';
import { CreateUserDto } from './dto/create-user.dto.ts';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  getAll() {
    return DB.getAll('users');
  }

  create(dto: CreateUserDto) {
    return DB.createUser(dto);
  }

  getById(id: string) {
    return DB.getById(id, 'users');
  }

  update(id: string, dto: UpdateUserDto) {
    return DB.update(id, dto);
  }

  userDelete(id: string) {
    return DB.delete(id, 'users');
  }
}
