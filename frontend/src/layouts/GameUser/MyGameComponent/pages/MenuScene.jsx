import Phaser from 'phaser';
import background from '../../../../assets/gameComponents/backgrounds/2151121007.jpg';
import menuSong from '../../../../assets/gameComponents/music/button-124476.mp3';
import menuSongBackground from '../../../../assets/gameComponents/music/the-final-boss-battle-158700.mp3';
import wolfCry from '../../../../assets/gameComponents/music/wolf-howling-140235.mp3';



export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    init(data) {
        this.leaveGame = data.leaveGame;
        this.userPseudo = data.userPseudo;
        this.userLevel = data.userLevel;
        this.userImg = data.userImg
    }

    preload() {
        // Code de préchargement des ressources
        this.load.image('profileImage', this.userImg);
        this.load.image('backgroundMenuScene', background);
        this.load.audio('mySound', menuSong);
        this.load.audio('mySoundBackground', menuSongBackground);
        this.load.audio('wolfCry', wolfCry);
    }

    create() {
        const windowWidth = this.sys.game.config.width;
        const windowHeight = this.sys.game.config.height;

        // Écoutez l'événement de redimensionnement de la fenêtre
        this.scale.on('resize', this.resizeGame, this);
        this.mySound = this.sound.add('mySound', { loop: false });
        this.wolfCry = this.sound.add('wolfCry', { loop: false });

        if (!this.backgroundMusic || !this.backgroundMusic.isPlaying) {
            this.backgroundMusic = this.sound.add('mySoundBackground');
            this.backgroundMusic.play({ loop: true });
        }



        // Code de création des éléments du jeu
        const background = this.add.image(0, 0, 'backgroundMenuScene').setOrigin(0);
        background.setScale(this.cameras.main.width / background.width, this.cameras.main.height / background.height);

        // Dans la fonction create de votre scène
        const profileImage = this.add.sprite(windowWidth * 0.1, windowHeight * 0.15, 'profileImage')

        const borderRadius = 70;
        const maskWidth = 140; // Largeur du masque
        const maskHeight = 140;
        // Calculer les coordonnées pour le masque d'arrondi en fonction de la position du sprite
        const maskX = profileImage.x - maskWidth / 2;
        const maskY = profileImage.y - maskHeight / 2;

        // Créer le masque d'arrondi
        const maskGraphics = this.make.graphics();
        maskGraphics.fillStyle(0xffffff); // Couleur du masque
        maskGraphics.fillRoundedRect(maskX, maskY, maskWidth, maskHeight, borderRadius);
        const mask = maskGraphics.createGeometryMask();
        profileImage.setScale(0.7)

        // Appliquer le masque au sprite
        profileImage.setMask(mask);

        const pseudoUser = this.add.text(windowWidth * 0.1, windowHeight * 0.3, this.userPseudo, { fontSize: '34px', fill: '#fff', fontFamily: 'Honk', fontStyle: 'bold', align: 'center' });
        pseudoUser.setOrigin(0.5);

        const levelUser = this.add.text(windowWidth * 0.1, windowHeight * 0.35, `lvl:  ${this.userLevel}`, { fontSize: '34px', fill: '#fff', fontFamily: 'Honk', fontStyle: 'bold', align: 'center' });
        levelUser.setOrigin(0.5);

        const titleMain = this.add.text(windowWidth * 0.5, windowHeight * 0.2, 'Werewolf Attack!', { fontSize: '84px', fill: '#fff', fontFamily: 'Honk', fontStyle: 'bold', align: 'center' });
        titleMain.setOrigin(0.5);

        const playButton = this.add.text(windowWidth * 0.5, windowHeight * 0.4, 'Play', { fontSize: '54px', fill: '#fff', fontFamily: 'Honk', fontStyle: 'bold', align: 'center' });
        playButton.setOrigin(0.5);
        playButton.setInteractive();

        // Animation lorsqu'on survole le bouton
        playButton.on('pointerover', () => {
            this.mySound.play();
            playButton.setScale(1.2); // Augmente la taille du bouton
        });

        // Animation lorsqu'on quitte le bouton
        playButton.on('pointerout', () => {
            playButton.setScale(1); // Rétablit la taille normale du bouton
        });

        // Ajoute un événement de clic au bouton "Jouer"
        playButton.on('pointerdown', () => {
            this.wolfCry.play(); // Démarrer la scène principale du jeu
            this.scene.start('GameScene');
        });

        const playButtonOption = this.add.text(windowWidth * 0.5, windowHeight * 0.5, 'Option', { fontSize: '54px', fill: '#fff', fontFamily: 'Honk', fontStyle: 'bold', align: 'center' });
        playButtonOption.setOrigin(0.5);
        playButtonOption.setInteractive();

        // Animation lorsqu'on survole le bouton
        playButtonOption.on('pointerover', () => {
            this.mySound.play();
            playButtonOption.setScale(1.2); // Augmente la taille du bouton
        });

        // Animation lorsqu'on quitte le bouton
        playButtonOption.on('pointerout', () => {
            playButtonOption.setScale(1); // Rétablit la taille normale du bouton
        });

        const playButtonLeave = this.add.text(windowWidth * 0.5, windowHeight * 0.6, 'Leave game', { fontSize: '54px', fill: '#fff', fontFamily: 'Honk', fontStyle: 'bold', align: 'center' });
        playButtonLeave.setOrigin(0.5);
        playButtonLeave.setInteractive();

        // Animation lorsqu'on survole le bouton
        playButtonLeave.on('pointerover', () => {
            this.mySound.play();
            playButtonLeave.setScale(1.2); // Augmente la taille du bouton
        });

        // Animation lorsqu'on quitte le bouton
        playButtonLeave.on('pointerout', () => {
            playButtonLeave.setScale(1); // Rétablit la taille normale du bouton
        });

        // Ajoute un événement de clic au bouton "Jouer"
        playButtonLeave.on('pointerdown', () => {
            this.mySound.play();
            this.leaveGame();
        });


    }

    resizeGame() {
        const width = this.scale.parentSize.width;
        const height = this.scale.parentSize.height;

        // Redimensionnez la scène du jeu en fonction de la taille de la fenêtre
        this.cameras.resize(width, height);
    }

    update() {
        // Code de mise à jour de l'état du jeu

    }
}