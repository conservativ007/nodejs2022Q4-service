import { v4 as uuid } from 'uuid';
import { CreateArtistDto } from './artists/dto/create-artist.dto';
import { UpdateArtistDto } from './artists/dto/update-artist.dto';
import { CreateUserDto } from './users/dto/create-user.dto.ts';
import { UpdateUserDto } from './users/dto/update-user.dto';

export const DBUsers = {
  users: [
    {
      id: '4b9f6abb-eb3d-434d-b8d2-cd0b63c8e32f',
      login: 'vasia',
      password: '1234',
      version: 0,
      createdAt: Number(Date.now()),
      updatedAt: Number(Date.now()),
    },
    {
      id: '4b9f6abb-eb3d-434d-b8d2-cd0b63c8e32x',
      login: 'petia',
      password: '000',
      version: 3,
      createdAt: Number(Date.now()),
      updatedAt: Number(Date.now()),
    },
  ],

  artists: [
    {
      id: '4b9f6abb-eb3d-434d-b8d2-cd0b63c8e32f',
      name: 'Avrile Lavigne',
      grammy: false,
    },
    {
      id: '4b9f6abb-eb3d-434d-b8d2-cd0b63c8e92f',
      name: 'Michael Jackson',
      grammy: true,
    },
  ],

  getAll: (what: string) => {
    if (what === 'users') return DBUsers.users;
    if (what === 'artists') return DBUsers.artists;
  },

  createUser: (dto: CreateUserDto) => {
    let newUser = {
      id: uuid(),
      ...dto,
      version: 1,
      createdAt: Number(Date.now()),
      updatedAt: Number(Date.now()),
    };

    DBUsers.users.push(newUser);
    return newUser;
  },

  createArtist: (dto: CreateArtistDto) => {
    let newArtist = {
      id: uuid(),
      ...dto,
    };

    DBUsers.artists.push(newArtist);
    return newArtist;
  },

  getById: (id: string, what: string) => {
    if (what === 'users') return DBUsers.users.find((user) => user.id === id);
    if (what === 'artists')
      return DBUsers.artists.find((artist) => artist.id === id);
  },

  update: (id: string, dto: UpdateUserDto) => {
    let foundIndex = DBUsers.users.findIndex((user) => user.id === id);
    if (foundIndex === -1) return null;

    let foundUser = DBUsers.users[foundIndex];

    let version = Number(foundUser.version);
    version += 1;

    foundUser = {
      ...foundUser,
      ...dto,
      version,
      updatedAt: Number(Date.now()),
    };

    console.log('from db users');
    console.log(foundUser);

    DBUsers.users.splice(foundIndex, 1, foundUser);
    return foundUser;
  },

  updateArtist: (id: string, dto: UpdateArtistDto) => {
    let foundIndex = DBUsers.artists.findIndex((user) => user.id === id);
    if (foundIndex === -1) return null;

    let foundArtist = DBUsers.artists[foundIndex];

    foundArtist = {
      ...foundArtist,
      ...dto,
    };

    DBUsers.artists.splice(foundIndex, 1, foundArtist);
    return foundArtist;
  },

  delete: (id: string, what: string) => {
    let foundIndex: any;

    if (what === 'artists')
      foundIndex = DBUsers.artists.findIndex((user) => user.id === id);
    if (what === 'users')
      foundIndex = DBUsers.users.findIndex((user) => user.id === id);

    if (foundIndex === -1) {
      return false;
    }

    if (what === 'artists') DBUsers.artists.splice(foundIndex, 1);
    if (what === 'users') DBUsers.users.splice(foundIndex, 1);
    return true;
  },
};
