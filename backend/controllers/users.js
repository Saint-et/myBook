const User = require('../models/user');
const fs = require('fs');
//utilisation de bcrypt pour crypter le mot de passe
const bcrypt = require('bcrypt');

exports.getProfil = async (req, res, next) => {
  await User.findOne({
    where: { id: req.session.user.id },
    attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'isAdmin', 'isMaster', 'premium', 'resizeImageUrlCover', 'adultAccess']
  })
    .then(user => {
      return res.status(200).json({ user })
    });
};

exports.getProfilFollowers = async (req, res, next) => {
  await User.findOne({
    where: { id: req.session.user.id },
    attributes: ['followers', 'iFollow']
  })
    .then(followers => {
      User.findAll({
        where: { id: followers.dataValues.followers },
        attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'premium', 'resizeImageUrlCover']
      })
        .then(promise => {
          User.findAll({
            where: { id: followers.dataValues.iFollow },
            attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'premium', 'resizeImageUrlCover']
          })
            .then(iFollow => {
              return res.status(200).json({ promise, iFollow })
            })
        })
    });
};


exports.getUserProfil = async (req, res, next) => {
  if (req.session.user != undefined) {
    await User.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'isAdmin', 'isMaster', 'premium', 'resizeImageUrlCover', 'adultAccess', 'followers']
    })
      .then(user => {
        if (user === null) {
          return res.status(400).json({ message: 'Incorect identification' })
        }
        User.findOne({
          where: { id: req.session.user.id },
          attributes: ['followers', 'pinnedUsers']
        })
          .then(MyProfile => {

            let profileTable = MyProfile.dataValues.followers != null ? MyProfile.dataValues.followers : [];
            const followersuserId = profileTable.filter((id) => id == user.dataValues.id);

            let usertable = user.dataValues.followers != null ? user.dataValues.followers : [];
            const userId = usertable.filter((id) => id == req.session.user.id);

            let table = MyProfile.dataValues.pinnedUsers != null ? MyProfile.dataValues.pinnedUsers : [];
            const filteredPinnedUsers = table.filter((id) => id == user.dataValues.id);


            return res.status(200).json({ user, followersuserId, filteredPinnedUsers, sessionId: req.session.user.id, userId, adultAccess: req.session.user.adultAccess })

          })
      })
  } else {
    await User.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'isAdmin', 'premium', 'followers', 'resizeImageUrlCover']
    })
      .then(user => {
        return res.status(200).json({ user, adultAccess: 0 })
      })
  }

}

exports.updateUserAdultAccess = async (req, res, next) => {
  User.update({ adultAccess: req.body.adultAccess }, { where: { id: req.session.user.id } })
    .then(() => {
      User.findOne({ where: { id: req.session.user.id }, attributes: ['id', 'password', 'email', 'premium', 'adultAccess'] })
        .then(promise => {
          req.session.user = promise
          promise.save()
          return res.status(200).json({ message: 'adultAccess changed' })

        })
    })
}


exports.updateUserName = async (req, res, next) => {
  User.update({ pseudo: req.body.pseudo }, { where: { id: req.session.user.id } })
    .then(() => {
      return res.status(200).json({ message: 'Username changed' })
    })
}

exports.updateUser = async (req, res, next) => {

  const userImg = req.file ?
    {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
      ...req.body,
      imageUrl: req.body.PrevImage != null && req.body.imageUrl == null ? null : req.body.imageUrl
    };



  if (userImg.PrevImage != null) {
    const filename = userImg.PrevImage.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => { });
  }

  await User.update({ ...userImg }, { where: { id: req.session.user.id } })
    .then(() => { return res.status(200).json({ message: 'user changed' }); })
}


exports.updateCoverPicture = async (req, res, next) => {
  const userImg = req.file ?
    {
      ...req.body,
      imageUrlCover: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      //image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
      ...req.body
    };


  if (userImg.PrevImage != userImg.image) {
    const filename = userImg.PrevImage.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => { });
  }

  if (userImg.image === 'null') {
    await User.update({ ...userImg, imageUrlCover: null }, { where: { id: req.session.user.id } })
      .then(() => { return res.status(200).json({ message: 'user changed' }); })
  } else {
    await User.update({ ...userImg }, { where: { id: req.session.user.id } })
      .then(() => { return res.status(200).json({ message: 'user changed' }); })
  }
}


exports.updatePseudo = async (req, res, next) => {
  let myRegex = new RegExp(/^[0-9a-zA-Z-éçàùè]+$/i);
  if (myRegex.test(req.body.pseudo) === false) {
    return res.status(400).json({ message: 'Special characters are not supported.' });
  }
  else if (req.body.pseudo.length < 5) {

    return res.status(400).json({ message: 'Fill in all fields correctly (5 characters minimum per field).' });

  } else {
  }
}

exports.updateUserEmail = async (req, res, next) => {
  let myRegexEmail = new RegExp(/^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i);

  if (req.body.password == '' || req.body.password == undefined) {
    return res.status(400).json({ message: 'please fill in all fields.' });
  }

  await User.findOne({
    where: { id: req.session.user.id },
    attributes: ['password']
  })
    .then((promise) => {

      bcrypt.compare(req.body.password, promise.password)
        .then(valid => {
          if (!valid) {
            return res.status(400).json({ message: 'Incorrect password.' });
          }

          if (req.body.email == '') {
            return res.status(400).json({ message: 'please fill in all fields' });
          }
          else if (myRegexEmail.test(req.body.email) == false) {
            return res.status(400).json({ message: 'Please enter a valid Email Example:  user4534@gmail.com' });
          }
          User.update({ email: req.body.email }, { where: { id: req.session.user.id } })
            .then(() => { return res.status(200).json({ message: "The user's email has successfully changed" }); })

        })
    })
}


exports.updateSecurityUser = async (req, res, next) => {
  if (req.body.newPassword === "" || req.body.newPasswordVerification === "" || req.body.oldPassword === "") {
    return res.status(400).json({ message: 'please fill in all fields.' });
  }
  if (req.body.newPassword.length < 8 || req.body.newPasswordVerification.length < 8) {
    return res.status(400).json({ message: 'The password must contain at least 8 characters.' });
  }
  if (req.body.newPassword !== req.body.newPasswordVerification) {
    return res.status(400).json({ message: 'The verification password does not match the new password.' });
  }
  await User.findOne({
    where: { id: req.session.user.id },
    attributes: ['password']
  })
    .then((promise) => {

      bcrypt.compare(req.body.oldPassword, promise.password)
        .then(valid => {
          if (!valid) {
            return res.status(400).json({ message: 'The old password is incorrect.' });
          } else {
            bcrypt.hash(req.body.newPassword, 10)
              .then(newHash => {
                User.update({ password: newHash }, { where: { id: req.session.user.id } })
                  .then(() => res.status(200).json({ message: 'user changed' }));
              })
          }
        })
    })
};


exports.updateUserPrivate = async (req, res, next) => {
  User.update({ private: req.body.private }, { where: { id: req.session.user.id } })
    .then(() => {
      return res.status(200).json({ message: 'private changed' })
    })
}

exports.updateUserPremium = async (req, res, next) => {
  User.update({ premium: req.body.premium }, { where: { id: req.session.user.id } })
    .then(() => {
      return res.status(200).json({ message: 'private changed' })
    })
}

exports.updateUserAll = async (req, res, next) => {
  User.update({ ...req.body }, { where: { id: req.session.user.id } })
    .then(() => {
      return res.status(200).json({ message: 'user changed' })
    })
}

exports.getUserPopulars = async (req, res, next) => {
  await User.findAll({
    where: {},
    attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'isAdmin', 'premium', 'resizeImageUrlCover', 'adultAccess']
  })
    .then(promise => {
      return res.status(200).json({ promise })
    });
};

exports.updatePinnedUser = async (req, res, next) => {
  await User.findOne({ where: { id: req.session.user.id } })
    .then((user) => {
      let table = user.dataValues.pinnedUsers != null ? user.dataValues.pinnedUsers : [];
      const filteredUsers = table.filter((id) => id == req.body.pinnedUsers)
      if (parseInt(filteredUsers) == req.body.pinnedUsers) {
        const filtered = table.filter((id) => id != req.body.pinnedUsers)
        User.update({ pinnedUsers: filtered }, { where: { id: req.session.user.id } })
          .then(() => { return res.status(200).json({ message: "The user's pinned has successfully changed" }); })
      } else {
        const unique = Array.from(new Set([...user.dataValues.pinnedUsers != null ? user.dataValues.pinnedUsers : [], req.body.pinnedUsers]));
        User.update({ pinnedUsers: unique }, { where: { id: req.session.user.id } })
          .then(() => { return res.status(200).json({ message: "The user's pinned has successfully changed" }); })
      }
    })
};

exports.getUserPinned = async (req, res, next) => {
  await User.findOne({ where: { id: req.session.user.id } })
    .then((user) => {
      User.findAll({
        where: { id: user.dataValues.pinnedUsers },
        attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'isAdmin', 'premium', 'resizeImageUrlCover', 'adultAccess']
      })
        .then(promise => {
          return res.status(200).json({ promise });
        })
        .catch(() => { return res.status(400).json({ message: 'no found pinned users' }) })
    })
    .catch(() => { return res.status(400).json({ message: 'no found pinned users' }) })
};