//route model user
const User = require('../models/user');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const Token = require('../models/token');


//Utilisation de la variable d'environnement
require("dotenv").config({ path: "../env/.env" });


//utilisation de bcrypt pour crypter le mot de passe
const bcrypt = require('bcrypt');
const { Sequelize } = require('../db/mysql');


//inscription avec vérification Email et hash mot de passe
exports.signup = async (req, res, next) => {
  let myRegexEmail = new RegExp(/^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i);

  if (req.body.pseudo == '' || req.body.email == '' || req.body.password == '') {
    return res.status(400).json({ message: 'emptyFields' });
  }
  else if (myRegexEmail.test(req.body.email) == false) {
    return res.status(400).json({ message: 'errEmail' });
  }
  else if (req.body.password != req.body.password_verification) {
    return res.status(400).json({ message: 'diffPassword' })
  }
  else if (req.body.password.length < 6) {
    return res.status(400).json({ message: 'shortPassword' })
  }

  try {
    await bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = User.build({
          pseudo: req.body.pseudo,
          email: req.body.email,
          password: hash
        })

        try {
          user.save()
            .then(() => {
              User.findOne({ where: { email: req.body.email }, attributes: ['id', 'password', 'email', 'premium', 'adultAccess'] })
                .then(promise => {
                  if (!promise) {
                    return res.status(400).json({ message: 'errorConnetion' });
                  } else {
                    bcrypt.compare(req.body.password, promise.password)
                      .then(valid => {
                        if (!valid) {
                          return res.status(400).json({ message: 'incorrectPassword' });
                        } else {
                          req.session.user = promise
                          promise.save()
                            .then(() => { return res.status(200).json({ message: 'log' }) })
                        }
                      })
                  }
                })
            })
        } catch (err) {
          return res.status(400).json({ message: 'Try a different email address.' });
        }
      })

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    const err = new Error('signup fail.');
    err.unique_id = 1; // ERR_HISTORICAL(1)
    err.error_code = 500;
    return next(err);
  }
};

//connexion avec vérification Email et mot de passe
exports.login = async (req, res, next) => {
  if (req.body.email == undefined) {
    return res.status(400).json({ message: 'refresh the page' });
  }
  try {
    await User.findOne({ where: { email: req.body.email }, attributes: ['id', 'password', 'email', 'premium', 'adultAccess'] })
      .then(promise => {
        if (!promise) {
          return res.status(400).json({ message: 'errorConnetion' });
        } else {
          bcrypt.compare(req.body.password, promise.password)
            .then(valid => {
              if (!valid) {
                return res.status(400).json({ message: 'incorrectPassword' });
              } else {
                req.session.user = promise
                promise.save()
                  .then(() => { return res.status(200).json({ message: 'log' }) })
              }
            })
        }
      })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    const err = new Error('login fail.');
    err.unique_id = 2; // ERR_HISTORICAL(2)
    err.error_code = 500;
    return next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.session.destroy()
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    const err = new Error('logout fail.');
    err.unique_id = 3; // ERR_HISTORICAL(3)
    err.error_code = 500;
    return next(err);
  }
  return res.status(200).json("User logged out!")
}

exports.PasswordForgot = async (req, res, next) => {

  let myRegexEmail = new RegExp(/^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i);

  if (req.body.email == '') {
    return res.status(400).json({ message: 'emptyFields' });
  }

  if (myRegexEmail.test(req.body.to) == false) {
    return res.status(400).json({ message: 'errEmail' });
  }
  try {
    await User.findOne({ where: { email: req.body.to } })
      .then(async (user) => {
        if (!user) {
          return res.status(400).json({ message: 'errorConnetion' }); // Arrêtez le processus si l'utilisateur n'est pas trouvé.
        }

        const generateResetPasswordToken = () => {
          // Générer un token aléatoire de 32 octets (256 bits)
          const token = crypto.randomBytes(32).toString('hex');
          return token;
        }

        const generateTokenAndExpiration = () => {
          const token = generateResetPasswordToken(); // Générer le token
          const expires = new Date(); // Date actuelle
          expires.setHours(expires.getHours() + 1); // Ajouter 1 heure (par exemple, la durée de validité est d'1 heure)

          return { token, expires };
        }

        const { token, expires } = generateTokenAndExpiration();

        // Vérifier si l'utilisateur a déjà un token actif
        const existingToken = await Token.findOne({ where: { userId: user.id, used: false } });

        // Si un token actif existe, marquez-le comme utilisé ou invalidez-le
        if (existingToken) {
          existingToken.used = true; // Ou une autre méthode d'invalidation
          await existingToken.save();
        }

        try {
          Token.create({ token, expires, userId: user.id, used: false })
            .then(() => {

              const { to } = req.body;

              const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: 'picturevweb@gmail.com',
                  pass: 'duxwkozsicgzkocc',
                  //email: picturevweb@gmail.com
                  //password app:  duxwkozsicgzkocc
                  //password: pictureVweb971
                },
              });


              const mailOptions = {
                from: 'picturevweb@gmail.com',
                to,
                subject: 'Password reset',
                html:
                  `
            <div style="width: 100%; display: flex; justify-content: center;">
            <div style="width: 100%; max-width: 600px; margin-bottom: 20px;">
            <h1>PIC-V</h1>
            <p style="width: 100%;">Dear user,</p>
            <p style="width: 100%;">You recently requested a recovery of your password. To ensure the security of your account, please use the verification code below to reset your password:</p>
            <p>Verification Code:</p>
            <a href='http://192.168.1.12:3000/password-forgot/${token}' target="_blank" rel="noopener noreferrer">
            <button style='background: #ec1c24; border: none; border-radius: 10px; height: 40px; font-size: 20px; font-weight: 600; cursor: pointer;'>
            Password reset
            </button>
            </a>
            <p style="width: 100%;">If you did not request this password recovery, please ignore this email.</p>
            <div style="width: 100%;">Kind regards</div>
            <div style="width: 100%;">The Support Team</div>
            </div>
            </div>
            `
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  res.status(500).json({ message: 'Internal Server Error' });
                  const err = new Error('Error sending email forget pass word.');
                  err.unique_id = 4; // ERR_HISTORICAL(4)
                  err.error_code = 500;
                  return next(err);
                } else {
                  return res.status(200).json({ message: 'Email sent successfully' });
                }
              });

            })
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
          const err = new Error('Error creating the token.');
          err.unique_id = 5; // ERR_HISTORICAL(5)
          err.error_code = 500;
          return next(err);
        }
      })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    const err = new Error('Error searching for user.');
    err.unique_id = 6; // ERR_HISTORICAL(6)
    err.error_code = 500;
    return next(err);
  }
}

exports.ResetPassWord = async (req, res, next) => {

  if (req.body.password_verification == '' || req.body.password == '') {
    return res.status(400).json({ message: 'emptyFields' });
  }
  else if (req.body.password != req.body.password_verification) {
    return res.status(400).json({ message: 'diffPassword' })
  }
  else if (req.body.password.length < 6) {
    return res.status(400).json({ message: 'shortPassword' })
  }
  try {
    await Token.findOne({ where: { token: req.params.key } })
      .then(async (token) => {
        if (token === null) {
          return res.status(400).json({ message: 'Token not found or already used token' });
        }

        if (token.used === true) {
          // Le token n'est pas valide
          return res.status(400).json({ message: 'Invalid or already used token' });
        }

        const isTokenExpired = (expirationDate) => {
          const currentTimestamp = Date.now(); // Obtenez le timestamp actuel en millisecondes
          const tokenExpirationTimestamp = new Date(expirationDate).getTime(); // Obtenez le timestamp de la date d'expiration

          // Comparez les timestamps
          return currentTimestamp > tokenExpirationTimestamp;
        };

        // Utilisation :
        const tokenExpirationDate = token.expires; // Date d'expiration du token
        const tokenIsExpired = isTokenExpired(tokenExpirationDate);

        if (tokenIsExpired) {
          return res.status(400).json({ message: 'The token has expired.' });
        } else {
          await bcrypt.hash(req.body.password, 10)
            .then((hash) => {
              User.update({ password: hash }, { where: { id: token.userId } })
                .then(() => {
                  Token.destroy({ where: { userId: token.userId } })
                    .then(() => {
                      return res.status(200).json({ message: 'Password changed' });
                    })
                })
            })
        }
      })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    const err = new Error('Reset pass word fail.');
    err.unique_id = 7; // ERR_HISTORICAL(7)
    err.error_code = 500;
    return next(err);
  }
}