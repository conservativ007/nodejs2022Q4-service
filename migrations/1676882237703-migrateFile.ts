import { MigrationInterface, QueryRunner } from "typeorm";

export class migrateFile1676882237703 implements MigrationInterface {
    name = 'migrateFile1676882237703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "album_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" character varying, CONSTRAINT "PK_319a74c2085b42849b15412a3bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_c6ec16b57b60c8096406808021d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites_artists_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_e6645c76d274e4c5062fd3ac208" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites_albums_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" character varying, CONSTRAINT "PK_3a1797de84d1dda4109cfcd6aa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites_tracks_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" character varying, "albumId" character varying, "duration" integer NOT NULL, CONSTRAINT "PK_59fe9f9e996b20b94b854ddfffd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" character varying, "albumId" character varying, "duration" integer NOT NULL, CONSTRAINT "PK_9cc0e8a743e689434dac0130098" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "track_entity"`);
        await queryRunner.query(`DROP TABLE "favorites_tracks_entity"`);
        await queryRunner.query(`DROP TABLE "favorites_albums_entity"`);
        await queryRunner.query(`DROP TABLE "favorites_artists_entity"`);
        await queryRunner.query(`DROP TABLE "artist_entity"`);
        await queryRunner.query(`DROP TABLE "album_entity"`);
    }

}
