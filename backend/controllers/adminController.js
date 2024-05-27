const File = require("../models/files");
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


exports.GetOnefileStatisticale = async (req, res, next) => {
  await File.findOne({
    where: { id: req.params.id },
    attributes: [
      'id',
      'name',
      'data',
      'dataDescription',
      'adminId',
      'type',
      'miniature',
      'purchase',
      'totalCoins',
      'bookMarks',
      'visibility',
      'imagesCount',
      'price',
      'adult',
      'ai',
      'shop',
      'diamond',
      'view',
      'tags',
      'dateRework',
      'allowUserEditTag',
      'createdAt',
      'updatedAt']
  })
    .then((promise) => {
      if (req.session.user.isAdmin) {
        return res.status(200).json(promise)
      } else {
        return res.status(400).json({ message: 'You cannot access this page.' })
      }
    })
    .catch(() => { return res.status(400).json({ message: 'The search page no longer exists.' }) })
}

exports.GetUserDiagnosis = async (req, res, next) => {
  await User.findOne({
    where: { id: req.params.id },
    attributes: [
      'id',
      'pseudo',
      'imageUrl',
      'imageUrlCover',
      'resizeImageUrlCover',
      'premium',
      'accessPass',
      'diamondPass',
      'coinBuy',
      'coinBack',
      'coinPurchase',
      'totalCoinPurchase',
      'createdAt',
      'updatedAt']
  })
    .then((promise) => {
      if (req.session.user.isAdmin) {
        return res.status(200).json(promise)
      } else {
        return res.status(400).json({ message: 'You cannot access this page.' })
      }
    })
    .catch(() => { return res.status(400).json({ message: 'The search page no longer exists.' }) })
}