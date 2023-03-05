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

## Running application in Docker container

```
npm run docker:build
```

After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing http://localhost:4000/api/.

For easy verification, the Insomnia json file is at the root of the project.

## Testing

After application running you can use tests:

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```
