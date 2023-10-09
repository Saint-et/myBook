

exports.LoginTrue = (req, res, next) => {
    if (req.session.user !== undefined) {
        return res.status(200).json( true )
      } else {
        return next()
      } 
}

exports.LoginFalse = async (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(400).json( false )
      } else {
        return next()
      } 
}

exports.Invited = async (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(200).json( false )
    } else {
      return next()
    } 
}

exports.Premium = async (req, res, next) => {
  
}