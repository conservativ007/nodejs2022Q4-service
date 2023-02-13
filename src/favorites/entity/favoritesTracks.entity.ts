import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoritesTracksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  constructor(partial: Partial<FavoritesTracksEntity>) {
    Object.assign(this, partial);
  }
}
