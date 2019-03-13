## nest-typeorm-oauth

A back-end server stater repository, using modern technologies, such as:
 * [Nest](https://github.com/nestjs/nest) - A progressive [Node.js](http://nodejs.org) framework for building efficient and scalable server-side applications, heavily inspired by [Angular](https://angular.io).
 * [MongoDB](https://github.com/mongodb/mongo) - a NoSQL database
 * [TypeORM](https://typeorm.io) - most mature Object Relational Mapper (ORM) available so far, provides a support for a lot of different databases such as PostgreSQL, SQLite, and even MongoDB (NoSQL)
 * [TypeScript](https://github.com/Microsoft/TypeScript) - superset of JS which compiles to JS, providing compile-time type checking
* [Passport](https://github.com/jaredhanson/passport) - a popular library used to implement JavaScript authentication
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - a JavaScript json web tokens implementation by auth0

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Instructions

### Database 

To update database connection, update the ormconfig.json file.

### Enviroment variables
Set NODE_ENV environment variable to development or production so ConfigModule can load the right .env file.

Create a development.env files with the following variables:  
GOOGLE_CLIENT_ID={{your google client id}}  
GOOGLE_CLIENT_SECRET={{your google client secret}}  
JWT_SECRET={{your jwt secret}}  
EXPIRES_IN=3600  

For more instruction on on enviroment variables, please see this [Configuration](https://docs.nestjs.com/techniques/configuration) technique.
