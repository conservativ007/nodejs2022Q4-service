import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  hashedRt: string;

  constructor(partial: Partial<AuthEntity>) {
    Object.assign(this, partial);
  }
}
