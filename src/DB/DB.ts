import { v4 as uuid } from 'uuid';
import { CreateAlbumDto } from '../albums/dto/create-album.dto';
import { UpdateAlbumDto } from '../albums/dto/update-album.dto';
import { CreateArtistDto } from '../artists/dto/create-artist.dto';
import { UpdateArtistDto } from '../artists/dto/update-artist.dto';
import { CreateTrackDto } from '../tracks/dto/create-track.dto';
import { UpdateTrackDto } from '../tracks/dto/update-track.dto';
import { CreateUserDto } from '../users/dto/create-user.dto.ts';
import { UpdateUserDto } from '../users/dto/update-user.dto';

export const DB = {
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
      id: '9310bca1-9110-4c75-b314-0a8b8dd1f39d',
      name: 'Avrile Lavigne',
      grammy: false,
    },
    {
      id: '76c48802-5a4e-4393-89c8-84bcf1eab35c',
      name: 'Michael Jackson',
      grammy: true,
    },
  ],

  albums: [
    {
      id: '3711e2b6-4f7c-446f-b005-e1479253a2f1',
      name: 'Let Go',
      year: 2002,
      artistId: '9310bca1-9110-4c75-b314-0a8b8dd1f39d',
    },
    {
      id: 'd09a382c-3695-4aac-9211-ce83a9947fea',
      name: 'Thriller',
      year: 1982,
      artistId: '76c48802-5a4e-4393-89c8-84bcf1eab35c',
    },
  ],

  tracks: [
    {
      id: '51c890c7-e424-480b-afe9-5ad12536a2dc',
      name: 'Together',
      artistId: '9310bca1-9110-4c75-b314-0a8b8dd1f39d',
      albumId: '3711e2b6-4f7c-446f-b005-e1479253a2f1',
      duration: 4,
    },
    {
      id: '38f35876-e638-48c8-ad93-9e9542848677',
      name: 'The Girl Is Mine',
      artistId: '76c48802-5a4e-4393-89c8-84bcf1eab35c',
      albumId: '76c48802-5a4e-4393-89c8-84bcf1eab35c',
      duration: 4,
    },
  ],

  getAll: (what: string) => {
    if (what === 'users') return DB.users;
    if (what === 'artists') return DB.artists;
    if (what === 'albums') return DB.albums;
    if (what === 'tracks') return DB.tracks;
  },

  createUser: (dto: CreateUserDto) => {
    let newUser = {
      id: uuid(),
      ...dto,
      version: 1,
      createdAt: Number(Date.now()),
      updatedAt: Number(Date.now()),
    };

    DB.users.push(newUser);
    return newUser;
  },

  createArtist: (dto: CreateArtistDto) => {
    let newArtist = {
      id: uuid(),
      ...dto,
    };

    DB.artists.push(newArtist);
    return newArtist;
  },

  createAlbum: (dto: CreateAlbumDto) => {
    let { artistId } = dto;

    let newAlbum = {
      id: uuid(),
      ...dto,
      artistId: artistId ? artistId : null,
    };

    DB.albums.push(newAlbum);
    return newAlbum;
  },

  createTrack: (dto: CreateTrackDto) => {
    let { artistId, albumId } = dto;

    let newTrack = {
      id: uuid(),
      ...dto,
      artistId: artistId ? artistId : null,
      albumId: albumId ? albumId : null,
    };

    DB.tracks.push(newTrack);
    return newTrack;
  },

  getById: (id: string, what: string) => {
    if (what === 'users') return DB.users.find((user) => user.id === id);
    if (what === 'artists')
      return DB.artists.find((artist) => artist.id === id);
    if (what === 'albums') return DB.albums.find((album) => album.id === id);
    if (what === 'tracks') return DB.tracks.find((track) => track.id === id);
  },

  update: (id: string, dto: UpdateUserDto) => {
    let foundIndex = DB.users.findIndex((user) => user.id === id);
    if (foundIndex === -1) return null;

    let foundUser = DB.users[foundIndex];

    let version = Number(foundUser.version);
    version += 1;

    foundUser = {
      ...foundUser,
      ...dto,
      version,
      updatedAt: Number(Date.now()),
    };

    DB.users.splice(foundIndex, 1, foundUser);
    return foundUser;
  },

  updateArtist: (id: string, dto: UpdateArtistDto) => {
    let foundIndex = DB.artists.findIndex((user) => user.id === id);
    if (foundIndex === -1) return null;

    let foundArtist = DB.artists[foundIndex];

    foundArtist = {
      ...foundArtist,
      ...dto,
    };

    DB.artists.splice(foundIndex, 1, foundArtist);
    return foundArtist;
  },

  updateAlbum: (id: string, dto: UpdateAlbumDto) => {
    let foundIndex = DB.albums.findIndex((user) => user.id === id);
    if (foundIndex === -1) return null;

    let foundAlbum = DB.albums[foundIndex];

    foundAlbum = {
      ...foundAlbum,
      ...dto,
    };

    DB.albums.splice(foundIndex, 1, foundAlbum);
    return foundAlbum;
  },

  updateTrack: (id: string, dto: UpdateTrackDto) => {
    let foundIndex = DB.tracks.findIndex((track) => track.id === id);
    if (foundIndex === -1) return null;

    let foundTrack = DB.tracks[foundIndex];

    foundTrack = {
      ...foundTrack,
      ...dto,
    };

    DB.tracks.splice(foundIndex, 1, foundTrack);
    return foundTrack;
  },

  delete: (id: string, what: string) => {
    let foundIndex: any;

    if (what === 'artists')
      foundIndex = DB.artists.findIndex((artist) => artist.id === id);
    if (what === 'users')
      foundIndex = DB.users.findIndex((user) => user.id === id);
    if (what === 'albums')
      foundIndex = DB.albums.findIndex((album) => album.id === id);
    if (what === 'tracks')
      foundIndex = DB.tracks.findIndex((track) => track.id === id);

    if (foundIndex === -1) {
      return false;
    }

    if (what === 'artists') DB.artists.splice(foundIndex, 1);
    if (what === 'users') DB.users.splice(foundIndex, 1);
    if (what === 'albums') DB.albums.splice(foundIndex, 1);
    if (what === 'tracks') DB.tracks.splice(foundIndex, 1);
    return true;
  },
};
