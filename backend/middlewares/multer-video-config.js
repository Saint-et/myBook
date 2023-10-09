const multer = require('multer');

// Configuration de multer pour gérer les fichiers téléchargés
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Répertoire de destination pour les vidéos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nom de fichier unique
  },
});


module.exports = multer({storage: storage}).single('video');