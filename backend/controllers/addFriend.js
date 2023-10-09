const User = require('../models/user');


exports.addFollowers = async (req, res, next) => {
  await User.findOne({ where: { id: req.body.userId[0] }})
   .then(user => {
    User.findOne({ where: { id: req.session.user.id }})
    .then(userSession => {
      const uniqueSession = Array.from(new Set([...userSession.dataValues.iFollow != null? userSession.dataValues.iFollow : [], req.body.userId[0]]));
      User.update({iFollow: uniqueSession}, {where : { id: req.session.user.id }})
      .then(() => {
        const unique = Array.from(new Set([...user.dataValues.followers != null? user.dataValues.followers : [], req.session.user.id]));
        User.update({followers: unique}, {where : { id: req.body.userId[0] }})
        .then(() => {
          return res.status(200).json({ message: 'user add followers' })
    })
      })
    })
    });
}

exports.cancelFollowers = async (req, res, next) => {
  await User.findOne({ where: { id: req.body.userId[0] }})
   .then(users => {
    User.findOne({ where: { id: req.session.user.id }})
    .then(userSession => {
      let tableSession = userSession.dataValues.iFollow != null? userSession.dataValues.iFollow : [];
      const filteredUsersSession = tableSession.filter((id) => id != req.body.userId[0]);
      User.update({iFollow: filteredUsersSession}, {where : { id: req.session.user.id }})
      .then(() => {
        let table = users.dataValues.followers != null? users.dataValues.followers : [];
        const filteredUsers = table.filter((id) => id != req.session.user.id);
        User.update({followers: filteredUsers}, {where : { id: req.body.userId[0] }})
        .then(() => {
          return res.status(200).json({ message: 'follower removed' });
        })
      })
    })
   })
}

exports.removeFollowers = async (req, res, next) => {
  await User.findOne({ where: { id: req.session.user.id }})
   .then(users => {
    let table = users.dataValues.followers
    const filteredUsers = table.filter((id) => id != req.body.userId)
    User.update({followers: filteredUsers}, {where : { id: req.session.user.id }})
    .then(() => {
      return res.status(200).json({ message: 'follower removed' })
    })
   })
}