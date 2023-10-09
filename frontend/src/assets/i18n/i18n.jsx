// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';



i18n.use(initReactI18next)
    .init({
        resources: {
            "en": {
                translation: {
                    // select translation component
                    titleSelectTranslation: 'Languages',
                    selectTranslation: 'Select your language (English by default) :',

                    normal: 'Normal',
                    modeEco: 'Mode Eco',

                    //title
                    options: 'Options',
                    create_a_library: 'Create a library',
                    name: 'Name',
                    description: 'Description',
                    miniature: 'Miniature',
                    ai: 'Artificial intelligence',
                    adult: 'Is this work intended for an adult audience',
                    public: 'Want to make it public',
                    comment: 'Allow you comments',
                    addTags: 'Add tags',
                    tagsFound: 'Tags found',
                    noTagsFound: 'No tags found',
                    allowUsersEditTags: 'Allow other users to edit tags',
                    notifyUsersToUpdate: 'You want to notify your community and users who have saved your work of the changes',
                    images: 'Images',
                    imageCover: 'Cover image',

                    //log component
                    login: 'Login',
                    signup: 'Signup',
                    password: 'Password',
                    password_verification: 'Verification password',
                    Identify_oneself: 'Identify oneself',
                    forgot_your_password: 'Forgot your password?',
                    resetPassword: 'Reset password',


                    //api err
                    errorConnetion: 'This email address could not be found.',
                    incorrectPassword: 'Incorrect password.',
                    emptyFields: 'please fill in all fields.',
                    errEmail: 'Please enter a valid Email Example:  user@gmail.com',
                    diffPassword: 'passwords must be the same.',
                    shortPassword: 'Password too short.',

                    //buttons
                    logout: 'Logout',
                    admin: 'Admin',
                    terms_of_use: 'Terms of Use',
                    assistance: 'Assistance',
                    parameter: 'Parameter',
                    follewers: 'Follewers',
                    follow: 'Follow',
                    unfollow: 'Unfollow',
                    continue: 'continue',
                    cancel: 'cancel',
                    send: 'send',
                    add_an_image: 'Add an image',
                    addPictures: 'Add images',
                    delete: 'Delete',
                    save: 'Save',
                    news: 'News',
                    recents: 'Recents',
                    activities: 'Activities',
                    statistical: 'Statistical',
                    information: 'Information',
                    projects: 'Projects',
                    library: 'Library',
                    tags: 'Tags',
                    gifts: 'Gifts',
                    named: 'Named',
                    create_a_new_project: 'Create a new project',
                    type_of_file: 'Type of file',
                    cancelSelection: 'Cancel selection',
                    permanentlyDelete: 'Permanently delete',
                    allSelected: 'All selected',
                    knowMore: 'know more',
                    autoRefresh: 'Auto refresh',
                    yes: 'yes',
                    no: 'no',
                    everyone: 'everyone',
                    public: 'public',
                    private: 'private',


                    //inputs
                    search: 'Search',
                    select: 'Select',
                    none: 'None',

                    //Forgot your password notice
                    "resetPasswordSteps": {
                        "title": "Read the steps carefully.",
                        "intro": "Dear user,",
                        "step1": "Enter your email address associated with your account in the field provided.",
                        "step2": "Click the \"Reset Password\" button.",
                        "step3": "In a few moments, you will receive an email to the address you provided. This message will contain a password reset link.",
                        "step4": "Go to your inbox and look for the password reset message. Also, be sure to check your junk folder in case the message is there.",
                        "step5": "Click the password reset link in the email. You will be redirected to a page where you can create a new secure password for your account.",
                        "step6": "Once you've created your new password, save it securely.",
                        "conclusion": "That's all! You now have a new password to access your account securely. If you have not requested this password reset, please ignore this email and take steps to protect the security of your account.",
                        "contactUs": "If you have any questions or encounters any problems, please feel free to contact us at",
                        "kindRegards": "Kind regards",
                        "team": "The PIC-V team"
                    },

                    //Password change confirmation notice
                    "passwordChangeConfirmation": {
                        "intro": "Dear user,",
                        "successMessage": "We are happy to inform you that your password has been successfully changed. Your account is now secured with your new password.",
                        "actionRequired": "If you have made this change, no further action is required on your part. You can now log in to your account using your new password.",
                        "notMadeChange": "If you have not made this change, please contact us immediately for additional security measures.",
                        "contactUs": "Please do not hesitate to contact us if you have any questions or need further assistance.",
                        "kindRegards": "Kind regards",
                        "team": "The PIC-V team"
                    },

                    //Password change confirmation notice
                    "imageChangeProfile": {
                        "formats": "Supported formats",
                        "size": "Maximum file size",
                        "text1": "The image will be cropped to the desired height once saved, however, you can crop it but will not be recoverable on the site. But you can always delete it whenever you want.",
                        "textCover1": "The image will be automatically cut to the desired height once saved and will therefore not be recoverable on the site. But you can always delete it whenever you want.",
                        "text2": "Please do not upload images (18+) or artworks that violate terms of Use",
                    },

                    "workFile": {
                        "refreshNotice": "Enabling auto-sync retrieves data from our database every time you return to a page and can have a slight impact on performance, but it's crucial when you're working across multiple devices. This feature synchronizes your local data with that in our database, providing a seamless and synchronized experience.",
                        "refreshNotice2": "This option is only necessary if you have made changes from another device.",

                        "workFileNotice2": "We would like to remind you of the importance of sharing only the works you have created yourself or for which you have the right to publish. In accordance with our guidelines and usage policy, any content that violates these rules may be subject to removal.",
                        "workFileNotice3": "Your respect for copyright and publishing rights is crucial to maintaining a safe and respectful environment for all members of our community. We encourage you to ensure that you have the necessary rights before sharing content on our platform.",
                        "workFileNotice4": "Thank you for your understanding and cooperation.",

                        "workFileNotice5": "We appreciate your efforts in organizing the images. Your task is simple: review and arrange the order of the images as you like. The rest is on us!",
                        "workFileNotice6": "Our system will automatically handle the display and presentation of the images according to the order you set. Sit back and relax as your content comes to life in the perfect sequence.",
                        "workFileNotice7": "The cover image and thumbnail will be displayed normally at the beginning of your full-size project in the order set.",

                        "projectDeletedMessage": {
                            "message1": "Project Deleted",
                            "message2": "The project you are trying to open has been deleted on another device.",
                            "message3": "You cannot access this page.",
                            "message4": "The search page no longer exists.",
                            "message5": "Back to previous page",
                        }

                    }

                }
            },
            "fr": {
                translation: {
                    // select translation component
                    titleSelectTranslation: 'Langues',
                    selectTranslation: 'Sélectionnez votre langue (Anglais par défaut) :',

                    normal: 'Normal',
                    modeEco: 'Mode Eco',

                    //title
                    options: 'Options',
                    create_a_library: 'Créer une bibliothèque',
                    name: 'Nom',
                    description: 'Description',
                    miniature: 'Miniature',
                    ai: 'Intelligence artificielle',
                    adult: 'Cette œuvre est-elle destinée à un public adulte',
                    public: 'Vous voulez le rendre public',
                    comment: 'Vous autoriser les commentaires',
                    addTags: 'Ajouter des tags',
                    tagsFound: 'Tags trouvés',
                    noTagsFound: 'Aucun tags n’a été détecté',
                    allowUsersEditTags: 'Autoriser d’autres utilisateurs à modifier les tags',
                    notifyUsersToUpdate: 'Vous souhaitez informer votre communauté et les utilisateurs qui ont enregistré votre travail des modifications',
                    images: 'images',
                    imageCover: 'Image de couverture',

                    //log component
                    login: 'Connexion',
                    signup: 'Inscription',
                    password: 'Mot de passe',
                    password_verification: 'Mot de passe de vérification',
                    Identify_oneself: 'S’identifier',
                    forgot_your_password: 'Mot de passe oublié ?',
                    resetPassword: 'Réinitialiser le mot de passe',


                    //api err
                    errorConnetion: 'Cette adresse e-mail est introuvable.',
                    incorrectPassword: 'Mot de passe incorrect.',
                    emptyFields: 'Veuillez remplir tous les champs.',
                    errEmail: 'Veuillez saisir une adresse e-mail valide : utilisateur@gmail.com',
                    diffPassword: 'Les mots de passe doivent être identiques.',
                    shortPassword: 'Mot de passe trop court.',

                    //buttons
                    logout: 'Déconnexion',
                    admin: 'Administrateur',
                    terms_of_use: 'Conditions d’utilisation',
                    assistance: 'Assistance',
                    parameter: 'Paramètre',
                    follewers: 'Abonnés',
                    follow: 'Suivre',
                    unfollow: 'Ne plus suivre',
                    continue: 'Continuer',
                    cancel: 'Annuler',
                    send: 'Envoyer',
                    add_an_image: 'Ajouter une image',
                    addPictures: 'Ajouter des images',
                    delete: 'Supprimer',
                    save: 'Enregistrer',
                    news: 'Actualités',
                    recents: 'Récents',
                    activities: 'Activités',
                    statistical: 'Statistiques',
                    information: 'Informations',
                    projects: 'Projets',
                    library: 'Bibliothèque',
                    tags: 'Tags',
                    gifts: 'Cadeaux',
                    named: 'Nommé',
                    create_a_new_project: 'Créer un nouveau projet',
                    type_of_file: 'Type de fichier',
                    cancelSelection: 'Annuler la sélection',
                    permanentlyDelete: 'Supprimer définitivement',
                    allSelected: 'Tous sélectionnés',
                    knowMore: 'En savoir plus',
                    autoRefresh: 'Actualisation automatique',
                    yes: 'oui',
                    no: 'non',
                    everyone: 'tout le monde',
                    public: 'publique',
                    private: 'privée',

                    //inputs
                    search: 'Recherche',
                    select: 'Selectionner',
                    none: 'Aucun',


                    //Forgot your password notice
                    "resetPasswordSteps": {
                        "title": "Lisez attentivement les étapes.",
                        "intro": "Cher utilisateur,",
                        "step1": "Entrez l'adresse e-mail associée à votre compte dans le champ prévu à cet effet.",
                        "step2": "Cliquez sur le bouton \"Réinitialiser le mot de passe\".",
                        "step3": "Dans quelques instants, vous recevrez un e-mail à l'adresse que vous avez fournie. Ce message contiendra un lien de réinitialisation du mot de passe.",
                        "step4": "Allez dans votre boîte de réception et recherchez le message de réinitialisation du mot de passe. Assurez-vous également de vérifier votre dossier de courrier indésirable au cas où le message s'y trouverait.",
                        "step5": "Cliquez sur le lien de réinitialisation du mot de passe dans l'e-mail. Vous serez redirigé vers une page où vous pourrez créer un nouveau mot de passe sécurisé pour votre compte.",
                        "step6": "Une fois que vous avez créé votre nouveau mot de passe, enregistrez-le en toute sécurité.",
                        "conclusion": "C'est tout ! Vous disposez maintenant d'un nouveau mot de passe pour accéder à votre compte en toute sécurité. Si vous n'avez pas demandé cette réinitialisation de mot de passe, veuillez ignorer cet e-mail et prendre des mesures pour protéger la sécurité de votre compte.",
                        "contactUs": "Si vous avez des questions ou rencontrez des problèmes, n'hésitez pas à nous contacter à l'adresse",
                        "kindRegards": "Cordialement",
                        "team": "L'équipe PIC-V"
                    },

                    //Password change confirmation notice
                    "passwordChangeConfirmation": {
                        "intro": "Cher utilisateur,",
                        "successMessage": "Nous sommes heureux de vous informer que votre mot de passe a été changé avec succès. Votre compte est désormais sécurisé avec votre nouveau mot de passe.",
                        "actionRequired": "Si vous avez effectué ce changement, aucune autre action de votre part n'est requise. Vous pouvez désormais vous connecter à votre compte en utilisant votre nouveau mot de passe.",
                        "notMadeChange": "Si vous n'avez pas effectué ce changement, veuillez nous contacter immédiatement pour prendre des mesures de sécurité supplémentaires.",
                        "contactUs": "N'hésitez pas à nous contacter si vous avez des questions ou si vous avez besoin d'une assistance supplémentaire.",
                        "kindRegards": "Cordialement",
                        "team": "L'équipe PIC-V"
                    },

                    "imageChangeProfile": {
                        "formats": "Formats pris en charge",
                        "size": "Taille maximale du fichier",
                        "text1": "L'image sera recadrée à la hauteur souhaitée une fois enregistrée. Cependant, vous pouvez la recadrer, mais elle ne pourra pas être récupérée sur le site. Vous pouvez toujours la supprimer quand vous le souhaitez.",
                        "textCover1": "L'image sera automatiquement coupée à la hauteur souhaitée une fois enregistrée et ne pourra donc pas être récupérée sur le site. Cependant, vous pouvez toujours la supprimer quand vous le souhaitez.",
                        "text2": "Veuillez ne pas télécharger d'images pour adultes (18+) ou d'œuvres qui violent les conditions d'utilisation."
                    },

                    "workFile": {
                        "refreshNotice": "L’activation de la synchronisation automatique récupère les données de notre base de données chaque fois que vous revenez sur une page et peut avoir un léger impact sur les performances, mais c’est crucial lorsque vous travaillez sur plusieurs appareils. Cette fonctionnalité synchronise vos données locales avec celles de notre base de données, offrant une expérience transparente et synchronisée.",
                        "refreshNotice2": "Cette option n’est nécessaire que si vous avez apporté des modifications à partir d’un autre appareil.",

                        "workFileNotice5": "Nous apprécions vos efforts dans l’organisation des images. Votre tâche est simple : révisez et organisez l’ordre des images comme vous le souhaitez. Le reste est sur nous!",
                        "workFileNotice6": "Notre système se chargera automatiquement de l’affichage et de la présentation des images selon l’ordre que vous définissez. Asseyez-vous et détendez-vous pendant que votre contenu prend vie en parfait ordre.",
                        "workFileNotice7": "L’image de couverture et la vignette seront affichées normalement au début de votre projet en taille réelle dans l’ordre défini.",

                        
                        "workFileNotice1": "Chers utilisateurs,",
                        "workFileNotice2": "Nous tenons à vous rappeler l'importance de ne partager que les œuvres que vous avez créées vous-même ou pour lesquelles vous avez le droit de publier. Conformément à nos directives et à notre politique d'utilisation, tout contenu en violation de ces règles peut faire l'objet de suppression.",
                        "workFileNotice3": "Votre respect du droit d'auteur et des droits de publication est essentiel pour maintenir un environnement sûr et respectueux pour tous les membres de notre communauté. Nous vous encourageons à vous assurer que vous avez les droits nécessaires avant de partager du contenu sur notre plateforme.",
                        "workFileNotice4": "Merci pour votre compréhension et votre coopération.",

                        "projectDeletedMessage": {
                            "message1": "Projet supprimé",
                            "message2": "Le projet que vous essayez d’ouvrir a été supprimé sur un autre appareil.",
                            "message3": "Vous ne pouvez pas accéder à cette page.",
                            "message4": "La page de recherche n’existe plus.",
                            "message5": "Retour à la page précédente",
                        }
                    }

                },
            },
            // Ajoutez d'autres langues et leurs traductions ici
        },
        lng: 'en', // Langue par défaut
        fallbackLng: 'en', // Langue de secours en cas de traduction manquante
        interpolation: {
            escapeValue: false, // Permet d'insérer des éléments HTML dans les traductions en toute sécurité
        },
    });

export default i18n;
