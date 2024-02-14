const User = require("../models/user");





exports.NewAdmin = async (req, res, next) => {
  if (req.body.isAdmin === false) {
    User.update({ isAdmin: req.body.isAdmin, isMaster: false }, { where: { id: req.params.id } })
    .then(() => {
      return res.status(200).json({ message: 'New admin' })
    })
  } else {
    User.update({ isAdmin: req.body.isAdmin }, { where: { id: req.params.id } })
    .then(() => {
      return res.status(200).json({ message: 'New admin' })
    })
  }
}

exports.NewMaster = async (req, res, next) => {
  if (req.body.isMaster === false) {
    User.update({ isMaster: req.body.isMaster }, { where: { id: req.params.id } })
  .then(() => {
    return res.status(200).json({ message: 'New master' })
  })
  } else {
    User.update({ isMaster: req.body.isMaster, isAdmin: true }, { where: { id: req.params.id } })
  .then(() => {
    return res.status(200).json({ message: 'New master' })
  })
  }
}