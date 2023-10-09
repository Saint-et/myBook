const User = require("../models/user");





exports.NewAdmin = async (req, res, next) => {
    User.update({ isAdmin: req.body.isAdmin }, { where: { id: req.params.id } })
    .then(() => {
      return res.status(200).json({ message: 'New admin' })
    })
}