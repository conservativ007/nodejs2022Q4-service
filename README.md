# Project: REST Service

## Description

Created a Home Library Service! `Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!

## Downloading

```
git clone git@github.com:conservativ007/nodejs2022Q4-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing http://localhost:4000/api/.
In root directory is Insomnia Collection file insomnia.json.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

**The created application operates with the following resources:**

- `User` (with attributes):

  ```typescript
  interface User {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
  }
  ```

- `Artist` (with attributes):

  ```typescript
  interface Artist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
  }
  ```

- `Track` (with attributes):

  ```typescript
  interface Track {
    id: string; // uuid v4
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
  }
  ```

- `Album` (with attributes):

  ```typescript
  interface Album {
    id: string; // uuid v4
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
  }
  ```

- `Favorites` (with attributes):
  ```typescript
  interface Favorites {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
  }
  ```

**Details:**

1. For `Users`, `Artists`, `Albums`, `Tracks` and `Favorites` REST endpoints with separate router paths are created

- `Users` (`/user` route)

  - `GET /user` - get all users
    - Server should answer with `status code` **200** and all users records
  - `GET /user/:id` - get single user by id
    - Server should answer with `status code` **200** and and record with `id === userId` if it exists
    - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
  - `POST /user` - create user (following DTO are used)
    `CreateUserDto`
    ```typescript
    interface CreateUserDto {
      login: string;
      password: string;
    }
    ```
    - Server should answer with `status code` **201** and newly created record if request is valid
    - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - `PUT /user/:id` - update user's password
    `UpdatePasswordDto` (with attributes):
    ```typescript
    interface UpdatePasswordDto {
      oldPassword: string; // previous password
      newPassword: string; // new password
    }
    ```
    - Server should answer with` status code` **200** and updated record if request is valid
    - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - Server should answer with` status code` **403** and corresponding message if `oldPassword` is wrong
  - `DELETE /user/:id` - delete user
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

- `Tracks` (`/track` route)

  - `GET /track` - get all tracks
    - Server should answer with `status code` **200** and all tracks records
  - `GET /track/:id` - get single track by id
    - Server should answer with `status code` **200** and and record with `id === trackId` if it exists
    - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist
  - `POST /track` - create new track
    - Server should answer with `status code` **201** and newly created record if request is valid
    - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - `PUT /track/:id` - update track info
    - Server should answer with` status code` **200** and updated record if request is valid
    - Server should answer with` status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server should answer with` status code` **404** and corresponding message if record with `id === trackId` doesn't exist
  - `DELETE /track/:id` - delete track
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist

- `Artists` (`/artist` route)

  - `GET /artist` - get all artists
    - Server should answer with `status code` **200** and all artists records
  - `GET /artist/:id` - get single artist by id
    - Server should answer with `status code` **200** and and record with `id === artistId` if it exists
    - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist
  - `POST /artist` - create new artist
    - Server should answer with `status code` **201** and newly created record if request is valid
    - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - `PUT /artist/:id` - update artist info
    - Server should answer with` status code` **200** and updated record if request is valid
    - Server should answer with` status code` **400** and corresponding message if `artist` is invalid (not `uuid`)
    - Server should answer with` status code` **404** and corresponding message if record with `id === artistId` doesn't exist
  - `DELETE /artist/:id` - delete album
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist

- `Albums` (`/album` route)

  - `GET /album` - get all albums
    - Server should answer with `status code` **200** and all albums records
  - `GET /album/:id` - get single album by id
    - Server should answer with `status code` **200** and and record with `id === albumId` if it exists
    - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist
  - `POST /album` - create new album
    - Server should answer with `status code` **201** and newly created record if request is valid
    - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - `PUT /album/:id` - update album info
    - Server should answer with` status code` **200** and updated record if request is valid
    - Server should answer with` status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server should answer with` status code` **404** and corresponding message if record with `id === albumId` doesn't exist
  - `DELETE /album/:id` - delete album
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist

- `Favorites`
  - `GET /favs` - get all favorites
    - Server should answer with `status code` **200** and all favorite records (**not their ids**), split by entity type:
    ```typescript
    interface FavoritesRepsonse {
      artists: Artist[];
      albums: Album[];
      tracks: Track[];
    }
    ```
  - `POST /favs/track/:id` - add track to the favorites
    - Server should answer with `status code` **201** and corresponding message if track with `id === trackId` exists
    - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server should answer with `status code` **422** and corresponding message if track with `id === trackId` doesn't exist
  - `DELETE /favs/track/:id` - delete track from favorites
    - Server should answer with `status code` **204** if the track was in favorites and now it's deleted id is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if corresponding track is not favorite
  - `POST /favs/album/:id` - add album to the favorites
    - Server should answer with `status code` **201** and corresponding message if album with `id === albumId` exists
    - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server should answer with `status code` **422** and corresponding message if album with `id === albumId` doesn't exist
  - `DELETE /favs/album/:id` - delete album from favorites
    - Server should answer with `status code` **204** if the album was in favorites and now it's deleted id is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if corresponding album is not favorite
  - `POST /favs/artist/:id` - add artist to the favorites
    - Server should answer with `status code` **201** and corresponding message if artist with `id === artistId` exists
    - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server should answer with `status code` **422** and corresponding message if artist with `id === artistId` doesn't exist
  - `DELETE /favs/artist/:id` - delete artist from favorites
    - Server should answer with `status code` **204** if the artist was in favorites and now it's deleted id is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if corresponding artist is not favorite

2. For now, these endpoints operate only with **in-memory** (hardcoded) data.

3. An `application/json` format used for request and response body.

4. `User`'s password excluded from server response.

5. When you delete `Artist`, `Album` or `Track`, it's `id` deleted from favorites (if was there) and references to it in other entities will become `null`. For example: `Artist` is deleted => this `artistId` in corresponding `Albums`'s and `Track`'s become `null` + this artist's `id` is deleted from favorites, same logic for `Album` and `Track`.

6. Non-existing entity can't be added to `Favorites`.

7. To run the service `npm start` command should be used.

8. Service listen on PORT `4000` by default, PORT value is stored in `.env` file.

9. Incoming requests are validated.

10. You can use [open-api](localhost:4000/api/) (default port 4000, you can change it in .env file)
