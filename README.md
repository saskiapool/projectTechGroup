# projectTechGroup dating app

<!-- slogan  -->

## Table of contents

- About
  - Build with
- Installing the project
  - Setup database
  - Launch the project
- Team
- Sources

## About

<!-- some info about the dating app -->

### 🛠 Build with

- NodeJS
- EJS
- MongoDB
- NPM packages
- Lots of love

## Installing the project

First of all, make sure you have **NodeJS** and **NPM** installed otherwise the project won't work.

1. Clone the repository
   `git clone https://github.com/Vuurvos1/projectTechGroup.git`
2. Cd into the project folder
3. Run `npm install` to install the needed npm packages

### Setting up the database

1. Create a MongoDB database
2. Create the following collections: **users**, **chats**
3. Create a .env containing these variables:

```
DB_HOST= link to mongodb database
DB_NAME= name of database
DB_USER= database username
DB_PASSWORD= database password
SECRET= session secret
GIPHY_APIKEY = get your giphy API key at https://developers.giphy.com/
```

### 🚀 Launching the project

You can use `npm start` to start the project or `npm run dev` if you are a developer

By default, the project will be hosted on **port 3000**

## Team

Sam de Kanter || [Vuurvos1](https://github.com/Vuurvos1) \
Simon Planje || [SimonPlanje](https://github.com/SimonPlanje) \
Saskia Pool || [saskiapool](https://github.com/saskiapool)

## 📝 Sources

Bachtiar, W. (2015, June 13). MongoDB: best design for messaging app. Retrieved 9 June 2020, from https://stackoverflow.com/questions/30823944/mongodb-best-design-for-messaging-app/30830429#30830429

Delgado, C. (2016, October 4). How to use Socket.IO properly with Express Framework in Node.js. Retrieved 8 June 2020, from https://ourcodeworld.com/articles/read/272/how-to-use-socket-io-properly-with-express-framework-in-node-js

Moffat, M. (2018, April 19). Nodejs - Re-use MongoDB database connection in routes. Retrieved 9 June 2020, from https://mrvautin.com/re-use-mongodb-database-connection-in-routes/

Osk. (n.d.). express-socket.io-session. Retrieved 9 June 2020, from https://openbase.io/js/express-socket.io-session

Wikipedia contributors. (2020, June 13). Bcrypt. Retrieved 14 June 2020, from https://en.wikipedia.org/wiki/Bcrypt
