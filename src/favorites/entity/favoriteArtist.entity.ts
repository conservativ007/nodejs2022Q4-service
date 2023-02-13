import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoritesArtistsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  constructor(partial: Partial<FavoritesArtistsEntity>) {
    Object.assign(this, partial);
  }
}
