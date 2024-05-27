let numberRegex = new RegExp(/^\d+$/);



exports.Url = async (req, res, next) => {
    if (!numberRegex.test(req.params.id)) {
      console.log(543);
        return res.status(400).json({ message: 'Incorect identification' })
      } else {
        return next()
      }
  }
  exports.Professional = async (req, res, next) => {
    if (req.session.user.professional) {
        return res.status(400).json({ message: 'You must switch to professional mode to access this page.' })
      } else {
        return next()
      }
  }


  exports.Verification_max_image = (req, res, next) => {
    // Vérifiez le nombre d'images téléchargées (req.files)
    if (req.files && Array.isArray(req.files) && req.files.length > 200) {
      return res.status(400).json({ message: 'Too many images uploaded. Maximum limit is 200.' });
    }
    next();
  };