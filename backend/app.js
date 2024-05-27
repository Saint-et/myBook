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
const profileUserRoutes = require('./routes/profileUser');
const searchRoutes = require('./routes/search');
const friendslist = require('./routes/addFriend');
const notification = require('./routes/notification');
const discussions = require('./routes/discussions_management');
const adminroute = require('./routes/adminRoute');
const postroute = require('./routes/post');
const fileDisplayRoutes = require('./routes/Files');
const filesShop = require('./routes/Files_shop');

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
    checkExpirationInterval: 15 * 60 * 1000, //15 * 60 * 1000 Vérifier l'expiration toutes les 60 secondes
    expiration: 15 * 60 * 1000 //24 * 60 * 60 * 7000 Expire la session après 60 secondes
  }),
  resave: false,
  saveUninitialized: false,
  secure: process.env.HOST === 'production',
  cookie: { SameSite: 'none' }
})
);

//Erreurs de CORS _ accepte les requête entre server avec une adresse différente `${process.env.HOST}`
app.use((req, res, next) => {
  const allowedOrigin = process.env.HOST; // Remplacez par votre domaine autorisé
  // Vérification de l'en-tête Referer
  const referer = req.get('Referer');
  if (!referer || !referer.startsWith(allowedOrigin)) {
    // Si l'en-tête Referer est absent ou ne correspond pas au domaine autorisé, renvoyer une réponse d'erreur
    return res.status(403).send('Error 403 unauthorized access. Please access our site first to view this resource. If you are already on our site, please make sure you do not access this URL directly from another source.');
  }

  // Configurations CORS
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization', 'Cache-Control');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Appel à next() pour passer au middleware suivant
  next();
});

app.use('/api/eventv', filesShop);
app.use('/api/eventv', fileDisplayRoutes);
app.use('/api/eventv', postroute);
app.use('/api/admin', adminroute);
app.use('/api/eventv', discussions);
app.use('/api/eventv', notification);
app.use('/api/eventv', friendslist);
app.use('/api/eventv', searchRoutes);
app.use('/api/eventv', fileRoutes);
app.use('/api/eventv', profileUserRoutes);
app.use('/api/eventv', userRoutes);
app.use('/api/auth', loginRoutes);



app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//  https://levelup.gitconnected.com/complete-guide-to-upload-multiple-files-in-node-js-using-middleware-3ac78a0693f3



module.exports = app;