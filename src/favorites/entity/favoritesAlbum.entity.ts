import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoritesAlbumsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  constructor(partial: Partial<FavoritesAlbumsEntity>) {
    Object.assign(this, partial);
  }
}
