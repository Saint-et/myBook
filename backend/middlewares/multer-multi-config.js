const multer = require('multer');



// Configuration de multer pour stocker les images sur le disque dur
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //if (!req.files || Object.keys(req.files).length === 0) {
    //  // Aucun fichier n'a été téléchargé, vous pouvez ajouter une logique personnalisée ici
    //  return res.status(400).send('Aucun fichier n\'a été téléchargé.');
    //}
    // Spécifiez le répertoire de destination où les images seront stockées.
    cb(null, 'uploads'); // Le répertoire 'images' doit exister préalablement.
  },
  filename: (req, file, cb) => {
    // Spécifiez comment les fichiers seront nommés.
    const name = file.originalname.split(' ').join('').split('(').join('').split(')').join('')
    cb(null, Date.now() + '-' + name);
  },
});


// Création de l'objet multer avec la configuration de stockage
const upload = multer({ storage: storage });


// Middleware pour recevoir plusieurs images
const uploadMultipleImages = upload.array('uploads', 200) // 'images' est le nom du champ de formulaire qui contient les images, 5 est le nombre maximum d'images acceptées

module.exports = uploadMultipleImages;

