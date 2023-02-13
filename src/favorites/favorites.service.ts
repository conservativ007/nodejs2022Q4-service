import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Repository } from 'typeorm';
import { FavoritesArtistsEntity } from './entity/favoriteArtist.entity';
import { FavoritesAlbumsEntity } from './entity/favoritesAlbum.entity';
import { FavoritesTracksEntity } from './entity/favoritesTracks.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesArtistsEntity)
    private favArtists: Repository<FavoritesArtistsEntity>,

    @InjectRepository(FavoritesAlbumsEntity)
    private favAlbums: Repository<FavoritesAlbumsEntity>,

    @InjectRepository(FavoritesTracksEntity)
    private favTracks: Repository<FavoritesTracksEntity>,

    private trackService: TracksService,
    private artistService: ArtistsService,
    private albumsService: AlbumsService,
  ) {}

  async getAll() {
    let artists = await this.favArtists.find();
    let albums = await this.favAlbums.find();
    let tracks = await this.favTracks.find();

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrackToFavs(id: string) {
    let track = await this.trackService.getById(id, true);
    let trackToFavs = this.favTracks.create(track);
    return await this.favTracks.save(trackToFavs);
  }

  async addAlbumToFavs(id: string) {
    let album = await this.albumsService.getById(id, true);
    let albumToFavs = this.favAlbums.create(album);
    return await this.favAlbums.save(albumToFavs);
  }

  async addArtistToFavs(id: string) {
    let artist = await this.artistService.getById(id, true);
    let artistToFavs = this.favArtists.create(artist);
    return await this.favArtists.save(artistToFavs);
  }

  async deleteTrackFromFavs(id: string) {
    try {
      await this.favTracks.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    await this.favTracks.delete(id);
  }

  async deleteArtistFromFavs(id: string) {
    try {
      await this.favArtists.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    await this.favArtists.delete(id);
  }

  async deleteAlbumFromFavs(id: string) {
    try {
      await this.favAlbums.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    await this.favAlbums.delete(id);
  }
}
