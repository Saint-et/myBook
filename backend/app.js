require("dotenv").config({ path: "./env/.env" });
const express = require('express');
const path = require('path');
let session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require('./models/session')
require("dotenv").config({ path: "./env/.env" });

const app = express();


//route à suivre depuis le backend
const loginRoutes = require('./routes/login.signup');
const userRoutes = require('./routes/users');
const fileRoutes = require('./routes/Files_management');
const fileAutoRoutes = require('./routes/Files_management_auto');
const searchRoutes = require('./routes/search');
const friendslist = require('./routes/addFriend');
const notification = require('./routes/notification');
const discussions = require('./routes/discussions_management');
const adminroute = require('./routes/adminRoute');
const postroute = require('./routes/post');

// Connection à la Base de donné (DATAbase)
const db = require('./db/mysql');


app.use(express.json());
app.use(session({
  key: 'session',
  secret: process.env.TOKEN_SECRET,
  store: new SequelizeStore({
    table: 'dbsessions',
    modelKey: 'dbsessions',
    db: db,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: { SameSite: 'None' }
})
);

//Erreurs de CORS _ accepte les requête entre server avec une adresse différente `${process.env.HOST}`
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.HOST}`);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization', 'Cache-Control');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use('/api/eventv', postroute);
app.use('/api/admin', adminroute);
app.use('/api/eventv', discussions);
app.use('/api/eventv', notification);
app.use('/api/eventv', friendslist);
app.use('/api/eventv', searchRoutes);
app.use('/api/eventv', fileAutoRoutes);
app.use('/api/eventv', fileRoutes);
app.use('/api/eventv', userRoutes);
app.use('/api/auth', loginRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

//  https://levelup.gitconnected.com/complete-guide-to-upload-multiple-files-in-node-js-using-middleware-3ac78a0693f3



module.exports = app;