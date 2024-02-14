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
                    showWallpapers: 'Do you want to show the wallpaper',
                    images: 'Images',
                    warning: "Warning",
                    form: 'Form',
                    imageCover: 'Cover image',
                    lastPublications: 'Last publications',
                    lastAdds: 'Last adds',

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
                    workspace: 'Workspace',
                    background: 'Background',
                    download: "Download image",
                    problem:'Report a problem',
                    terms_of_use: 'Terms of Use',
                    assistance: 'Assistance',
                    parameter: 'Parameter',
                    follewers: 'Follewers',
                    copyPageURL: 'Copy Page URL',
                    shop: 'Shop',
                    follow: 'Follow',
                    unfollow: 'Unfollow',
                    continue: 'continue',
                    cancel: 'cancel',
                    close: 'Close',
                    addTo: 'Add to',
                    send: 'send',
                    activate: 'Activate',
                    disable: 'Disable',
                    add_an_image: 'Add an image',
                    addPictures: 'Add images',
                    delete: 'Delete',
                    deleteLibrary: 'Delete library',
                    deleteLibraryAndFile: 'Delete Library and Files',
                    remove: 'Remove',
                    save: 'Save',
                    news: 'News',
                    recents: 'Recents',
                    activities: 'Activities',
                    statistical: 'Statistical',
                    information: 'Information',
                    projects: 'Projects',
                    library: 'Library',
                    tags: 'Tags',
                    donationsButton: 'Donations',
                    projectSharing: 'Shared project',
                    Known_Issue: 'Known Issue',

                    named: 'Named',
                    create_a_new_project: 'Create a new project',

                    create_a_new_library: 'Create a new library',
                    type_of_file: 'Type of file',
                    cancelSelection: 'Cancel selection',
                    permanentlyDelete: 'Permanently delete',
                    allSelected: 'All selected',
                    knowMore: 'Know more',
                    seeMore: 'See more',
                    showMore: 'Show more',
                    showLess: 'Show less',
                    autoRefresh: 'Auto refresh',
                    refresh: 'refresh',
                    yes: 'yes',
                    no: 'no',
                    everyone: 'everyone',
                    public: 'public',
                    private: 'private',
                    byLink: 'By link',


                    //inputs
                    search: 'Search',
                    select: 'Select',
                    none: 'None',
                    Back_to_previous_page: 'Back to previous page',

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

                    "file": {
                        "title": "Share Your Creativity!",
                        "text1": "At our application, we believe in the power of collaboration and sharing. Your creative work deserves to be seen by the world.",
                        "text2": "Collaborate, celebrate, and let your creativity shine.",
                        "text3": "Thank you for being part of our creative community!"
                    },
                    'projectDeletedMessage': {
                        "title": "Authentication error / nonexistent",
                        "message1": "An error occurred while loading the project:",
                        "message2": "You do not have the right to access this page.",
                        "message3": "The search page is non-existent.",
                    },
                    "subscriptions": {
                        "title1": "Manage subscriptions!",
                        "text1": "Create subscriptions that you can link to certain projects to restrict them to users who don't have a subscription.",
                        "text2": "With premium, unlock 2 new subscription cards to expand your possibilities.",

                        "title2": "Be careful,",
                        "text3": "however, if you no longer own the premium,",
                        "text4": "subscription cards will no longer be available to new users wishing to subscribe,",
                        "text5": "but users will still pay the same amount and will still have access to the content available at the chosen subscription.",

                    },
                    "libraryWorkSpace": {
                        "title": "Get organized and share!",
                        "text1": "Libraries help you keep your files tidy and well-structured.",
                        "text2": "Access and manage multiple documents in one place. Save time and streamline your workflow.",
                        "text3": "Empower your work with libraries. Start today!",

                        "libraryOptionTitle1": "When you delete a library:",
                        "libraryOptionText1": "Your documents are not deleted.",
                        "libraryOptionText2": "All common options will remain applied to the documents, you can still change them at any time.",

                        "libraryOptionTitle2": "When you delete a library and files:",
                        "libraryOptionText3": "Your documents in this library will be deleted with the library.",
                        "libraryOptionText4": "For security reasons, write",
                    },
                    "libraryWorkSpaceDisplay": {
                        "title": "Organize your library!",
                        "text1": "Create projects that are already linked to this library by clicking the Create New Project button.",
                        "text2": "Access all your projects by clicking on the Projects button.",
                        "text3": "The library can be viewed by other users, so it's designed to put consistent content.",

                        "optionText1": "Click the Remove button to detach the selected projects from the library.",
                        "optionText2": "Click the Delete button to permanently delete the selected projects.",

                    },
                    "all_parameter": {
                        "option_message1": "Premium will allow you to take full advantage of the app, more options in the workspace.",

                        "button1": "Parameter account",
                        "button2": "Premium",
                        "button3": "Assistance",
                        "button4": "Delete account",

                        "title1": "Profile",
                        "adult": "Allows you to view all adult content without going through the verification stage. This option will only be visible to you.",

                        "title2": "Confidentiality",
                        "message_title": "Accepts instant messages",
                        "message_text": "This option prevents you from receiving messages from other users.",
                        "private_title": "Private account",
                        "private_text": "This option hides your profile from the other user.",
                        "title3": "Account",

                        "user_title": "User name",
                        "user_text": "You can change the username, it must contain a minimum of 5 characters to be accepted.",

                        "email_title": "Change email address",
                        "email_text": "This option allows you to change your account's login email address.",

                        "email_sub_title1": "Email",
                        "email_sub_title2": "Password",

                        "security_sub_title": "Security",
                        "security_sub_title1": "Old Password",
                        "security_sub_title2": "New Password",
                        "security_sub_title3": "Rechecking the new password",

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

                        "workFileNotice8": "It is not mandatory to fill out the form to save the order of your images, however, if you decide to complete the form, please note that you must do so in its entirety for your changes to take effect.",

                        "projectDeletedMessage": {
                            "message1": "Project Deleted",
                            "message2": "The project you are trying to open has been deleted on another device.",
                            "message3": "You cannot access this page.",
                            "message4": "The search page no longer exists.",
                            "message5": "Back to previous page",
                        },

                        "autoLayout": {
                            "autoLayout": "Auto Layout",
                            "autoLayoutText": "Auto Layout will adapt your thumbnail and cover image, use this option only if your thumbnail and cover image don't have a layout",
                            "autoLayoutButton": "Automatic layout"
                        },

                        "selectionAnBlock": {
                            "selectionBlock": "Selection Block",
                            "selectionBlockText": "Select 2 images to select a block"
                        },

                        "byLinkText": 'Only users with the link will be able to see this document.'

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
                    warning: "Attention",
                    addTags: 'Ajouter des tags',
                    tagsFound: 'Tags trouvés',
                    noTagsFound: 'Aucun tags n’a été trouvé.',
                    allowUsersEditTags: 'Autoriser d’autres utilisateurs à modifier les tags',
                    notifyUsersToUpdate: 'Vous souhaitez informer votre communauté et les utilisateurs qui ont enregistré votre travail des modifications',
                    showWallpapers: 'Voulez-vous afficher le fond d’écran',
                    images: 'Images',
                    form: 'Formulaire',
                    imageCover: 'Image de couverture',
                    lastPublications: 'Dernières publications',
                    lastAdds: 'Derniers ajouts',

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
                    copyPageURL: 'Copier l’URL de la page',
                    shop: 'Boutique',
                    background: 'Arrière-plan',
                    problem:'Signaler un problème',
                    download: "Télécharger l’image",
                    follow: 'Suivre',
                    unfollow: 'Ne plus suivre',
                    activate: 'Activer',
                    disable: 'Désactiver',
                    continue: 'Continuer',
                    cancel: 'Annuler',
                    close: 'Fermer',
                    addTo: 'Ajouter à',
                    send: 'Envoyer',
                    add_an_image: 'Ajouter une image',
                    addPictures: 'Ajouter des images',
                    delete: 'Supprimer',
                    deleteLibrary: 'Supprimer la bibliothèque',
                    deleteLibraryAndFile: 'Supprimer la bibliothèque et les fichiers',
                    remove: 'Retirer',
                    save: 'Enregistrer',
                    news: 'Actualités',
                    recents: 'Récents',
                    activities: 'Activités',
                    statistical: 'Statistiques',
                    information: 'Informations',
                    projects: 'Projets',
                    library: 'Bibliothèque',
                    tags: 'Tags',
                    donationsButton: 'Cadeaux',
                    projectSharing: 'Projet partagé',
                    Known_Issue: 'Problème signalé',

                    named: 'Nommé',
                    create_a_new_project: 'Créer un nouveau projet',
                    create_a_new_library: 'Créer une nouvelle bibliothèque',
                    type_of_file: 'Type de fichier',
                    cancelSelection: 'Annuler la sélection',
                    permanentlyDelete: 'Supprimer définitivement',
                    allSelected: 'Tous sélectionnés',
                    knowMore: 'En savoir plus',
                    seeMore: 'Voir plus',
                    showMore: 'Afficher plus',
                    showLess: 'Afficher moins',
                    autoRefresh: 'Actualisation automatique',
                    refresh: 'Actualiser',
                    yes: 'oui',
                    no: 'non',
                    everyone: 'tout le monde',
                    public: 'publique',
                    private: 'privée',
                    byLink: 'Par lien',

                    //inputs
                    search: 'Recherche',
                    select: 'Selectionner',
                    none: 'Aucun',
                    Back_to_previous_page: 'Retour à la page précédente',


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

                    "file": {
                        "title": "Partagez votre créativité!",
                        "text1": "Dans notre application, nous croyons au pouvoir de la collaboration et du partage. Votre travail créatif mérite d’être vu par le monde.",
                        "text2": "Collaborez, célébrez et laissez briller votre créativité.",
                        "text3": "Merci de faire partie de notre communauté créative!"
                    },
                    'projectDeletedMessage': {
                        "title": "Erreur d’authentification / inexistant",
                        "message1": "Une erreur s’est produite lors du chargement du projet:",
                        "message2": "Vous n’avez pas le droit d’accéder à cette page.",
                        "message3": "La page de recherche est inexistante.",
                    },
                    "subscriptions": {
                        "title1": "Gérez les abonnements!",
                        "text1": "Créez des abonnements que vous pouvez lier à certains projets pour limiter l’accès aux utilisateurs qui n’ont pas d’abonnement.",
                        "text2": "Avec Premium, débloquez 1 nouvelles cartes d’abonnement pour élargir vos possibilités.",

                        "title2": "Attention,",
                        "text3": "toutefois, si vous ne possédez plus le Premium,",
                        "text4": "les cartes d’abonnement ne seront plus disponibles pour les nouveaux utilisateurs souhaitant s’abonner,",
                        "text5": "mais les utilisateurs qui possèdent déjà l’abonnement paieront toujours le même montant et auront toujours accès au contenu disponible de l’abonnement choisi.",

                    },
                    "libraryWorkSpace": {
                        "title": "Organisez-vous et partagez !",
                        "text1": "Les bibliothèques vous aident à garder vos fichiers bien rangés et bien structurés.",
                        "text2": "Accédez à plusieurs documents et gérez-les en un seul endroit. Gagnez du temps et rationalisez votre flux de travail.",
                        "text3": "Optimisez votre travail grâce aux bibliothèques. Commencez dès aujourd’hui !",

                        "libraryOptionTitle1": "Lorsque vous supprimez une bibliothèque:",
                        "libraryOptionText1": "Vos documents ne sont pas supprimés.",
                        "libraryOptionText2": "Toutes les options courantes resteront appliquées aux documents, vous pouvez toujours les modifier à tout moment.",

                        "libraryOptionTitle2": "Lorsque vous supprimez une bibliothèque et des fichiers:",
                        "libraryOptionText3": "Vos documents dans cette bibliothèque seront supprimés avec la bibliothèque.",
                        "libraryOptionText4": "Pour des raisons de sécurité, écrivez",
                    },
                    "libraryWorkSpaceDisplay": {
                        "title": "Organisez votre bibliothèque !",
                        "text1": "Créez des projets déjà liés à cette bibliothèque en cliquant sur le bouton Créer un nouveau projet.",
                        "text2": "Accédez à tous vos projets en cliquant sur le bouton Projets.",
                        "text3": "La bibliothèque peut être consultée par d’autres utilisateurs, elle est donc conçue pour mettre un contenu cohérent.",

                        "optionText1": "Cliquez sur le bouton Retirer pour détacher les projets sélectionnés de la bibliothèque.",
                        "optionText2": "Cliquez sur le bouton Supprimer pour supprimer définitivement les projets sélectionnés."
                    },
                    "all_parameter": {
                        "option_message1": "Premium vous permettra de profiter pleinement de l’application, plus d’options dans l’espace de travail.",

                        "button1": "Paramètres du compte",
                        "button4": "Supprimer le compte",


                        "title1": "Profil",
                        "adult": "vous permet de visualiser tout le contenu pour adultes sans passer par l’étape de vérification. Cette option ne sera visible que par vous.",
                        "title2": "Confidentialité",
                        "message_title": "Accepte les messages instantanés",
                        "message_text": "Cette option vous empêche de recevoir des messages d’autres utilisateurs.",
                        "private_title": "Compte privé",
                        "private_text": "Cette option permet de masquer votre profil aux yeux des autres utilisateurs.",
                        "title3": "Compte",
                        "user_title": "Nom d’utilisateur",
                        "user_text": "Vous pouvez changer le nom d’utilisateur, il doit contenir un minimum de 5 caractères pour être accepté.",
                        
                        "email_title": "Modifier l’adresse e-mail",
                        "email_text": "Cette option vous permet de modifier l’adresse e-mail de connexion de votre compte.",

                        "email_sub_title1": "Votre adresse e-mail",
                        "email_sub_title2": "Mot de passe",

                        "security_sub_title": "Sécurité",
                        "security_sub_title1": "Ancien mot de passe",
                        "security_sub_title2": "Nouveau mot de passe",
                        "security_sub_title3": "Revérification du nouveau mot de passe",
                    },
                    "workFile": {
                        "refreshNotice": "L’activation de la synchronisation automatique récupère les données de notre base de données chaque fois que vous revenez sur une page et peut avoir un léger impact sur les performances, mais c’est crucial lorsque vous travaillez sur plusieurs appareils. Cette fonctionnalité synchronise vos données locales avec celles de notre base de données, offrant une expérience transparente et synchronisée.",
                        "refreshNotice2": "Cette option n’est nécessaire que si vous avez apporté des modifications à partir d’un autre appareil.",


                        "workFileNotice1": "Chers utilisateurs,",
                        "workFileNotice2": "Nous tenons à vous rappeler l'importance de ne partager que les œuvres que vous avez créées vous-même ou pour lesquelles vous avez le droit de publier. Conformément à nos directives et à notre politique d'utilisation, tout contenu en violation de ces règles peut faire l'objet de suppression.",
                        "workFileNotice3": "Votre respect du droit d'auteur et des droits de publication est essentiel pour maintenir un environnement sûr et respectueux pour tous les membres de notre communauté. Nous vous encourageons à vous assurer que vous avez les droits nécessaires avant de partager du contenu sur notre plateforme.",
                        "workFileNotice4": "Merci pour votre compréhension et votre coopération.",

                        
                        "workFileNotice5": "Nous apprécions vos efforts dans l’organisation des images. Votre tâche est simple : révisez et organisez l’ordre des images comme vous le souhaitez. Le reste est sur nous!",
                        "workFileNotice6": "Notre système se chargera automatiquement de l’affichage et de la présentation des images selon l’ordre que vous définissez. Asseyez-vous et détendez-vous pendant que votre contenu prend vie en parfait ordre.",
                        "workFileNotice7": "L’image de couverture et la vignette seront affichées normalement au début de votre projet en taille réelle dans l’ordre défini.",

                        "workFileNotice8": "Il n'est pas obligatoire de remplir le formulaire pour enregistrer l'ordre de vos images, cependant, si vous décidez de remplir le formulaire, veuillez noter que vous devez le faire entièrement pour que vos modifications soient prises en compte.",

                        "projectDeletedMessage": {
                            "message1": "Projet supprimé",
                            "message2": "Le projet que vous essayez d’ouvrir a été supprimé sur un autre appareil.",
                            "message3": "Vous ne pouvez pas accéder à cette page.",
                            "message4": "La page de recherche n’existe plus.",
                            "message5": "Retour à la page précédente",
                        },

                        "autoLayout": {
                            "autoLayout": "Disposition automatique",
                            "autoLayoutText": "La mise en page automatique adaptera votre miniature et votre image de couverture, utilisez cette option uniquement si votre vignette et votre image de couverture n’ont pas de mise en page",
                            "autoLayoutButton": "Mise en page automatique"
                        },

                        "selectionAnBlock": {
                            "selectionBlock": "Bloc de sélection",
                            "selectionBlockText": "Sélectionnez 2 images pour sélectionner un bloc"
                        },

                        "byLinkText": 'Seuls les utilisateurs disposant du lien pourront voir ce document.'
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
