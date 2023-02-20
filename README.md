# Project: Music Service

## Description

Created a Home Library Service! `Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!

## Downloading

⚠️ The project uses docker images, you must have a docker application in your local machine

```
git clone git@github.com:conservativ007/nodejs2022Q4-service.git
```

```
cd nodejs2022Q4-service
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm run docker:build
```

<!-- ```
npm run start
``` -->

After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing http://localhost:4000/api/.

## Testing

After application running open new terminal and enter:

First of all you must run migrations use the follow command

```
npm run typeorm:run-migrations
```

After that you can use all the tests

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

1. You can use [open-api](localhost:4000/api/) (default port 4000, you can change it in .env file)

2. For easy verification, the Insomnia json file is at the root of the project.
