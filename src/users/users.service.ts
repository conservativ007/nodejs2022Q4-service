import { Injectable } from '@nestjs/common';
import { DBUsers } from 'src/DB';
import { CreateUserDto } from './dto/create-user.dto.ts';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  getAll() {
    return DBUsers.getAll('users');
  }

  create(dto: CreateUserDto) {
    return DBUsers.createUser(dto);
  }

  getById(id: string) {
    return DBUsers.getById(id, 'users');
  }

  update(id: string, dto: UpdateUserDto) {
    return DBUsers.update(id, dto);
  }

  userDelete(id: string) {
    return DBUsers.delete(id, 'users');
  }
}
