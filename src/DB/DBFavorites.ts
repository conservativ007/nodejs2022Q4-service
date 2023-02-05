import { AddAlbumToFavoriteDto } from 'src/favorites/dto/add-favs-album.dto';
import { AddArtistToFavoriteDto } from 'src/favorites/dto/add-favs-artist.dto';
import { AddTrackToFavoriteDto } from 'src/favorites/dto/create-favs-track.dto';

export const DBFavorites = {
  favorites: {
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
  },

  getAll: () => {
    return DBFavorites.favorites;
  },

  addTrackToFavorites: (dto: AddTrackToFavoriteDto) => {
    DBFavorites.favorites.tracks.push(dto);
  },
  addAlbumToFavorites: (dto: AddAlbumToFavoriteDto) => {
    DBFavorites.favorites.albums.push(dto);
  },
  addArtistToFavorites: (dto: AddArtistToFavoriteDto) => {
    DBFavorites.favorites.artists.push(dto);
  },

  deleteTrackFromFavs: (id: string) => {
    let foundIndex = DBFavorites.favorites.tracks.findIndex(
      (track) => track.id === id,
    );
    if (foundIndex === -1) {
      return undefined;
      // this case is not processed
    }
    DBFavorites.favorites.tracks.splice(foundIndex, 1);
    return true;
  },

  deleteArtistFromFavs: (id: string) => {
    let foundIndex = DBFavorites.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (foundIndex === -1) {
      return undefined;
      // this case is not processed
    }
    DBFavorites.favorites.artists.splice(foundIndex, 1);
    return true;
  },
  deleteAlbumFromFavs: (id: string) => {
    let foundIndex = DBFavorites.favorites.albums.findIndex(
      (album) => album.id === id,
    );
    if (foundIndex === -1) {
      return undefined;
      // this case is not processed
    }
    DBFavorites.favorites.albums.splice(foundIndex, 1);
    return true;
  },
};
