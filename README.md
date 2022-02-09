# Course app
Used technologies: React, Express and MySQL *(sequelize)*

## Instructions

First clone this repository.
```bash
$ git clone https://github.com/firatcanulukaya/course-app.git
```

Install dependencies. Make sure you already have [`nodejs`](https://nodejs.org/en/) & [`npm`](https://www.npmjs.com/) installed in your system.

```bash
$ cd client
$ npm install # or yarn
```
```bash
$ cd backend
$ npm install # or yarn
```

Make sure you have installed `nodemon` globally.

Change the database configuration in `backend/config/config.json` file. You should change the `username`, `password`, `database` and `host` properties in the development.

You should run `npx sequelize db:migrate` to create the database tables.

Run it
```bash
$ cd backend
$ npm start # or yarn start
```
```bash
$ cd client
$ npm start # or yarn start
```