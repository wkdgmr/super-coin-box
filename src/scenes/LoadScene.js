import Phaser from 'phaser';

class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadScene' });
  }

  preload() {
    // Load all assets
    const baseUrl = process.env.REACT_APP_BASE_URL;

    // background
    this.load.image('background', `${baseUrl}/assets/background.png`);

    // audio assets
    // jump
    this.load.audio('jump', [`${baseUrl}/assets/jump.ogg`, `${baseUrl}/assets/jump.mp3`]);
    // take coin
    this.load.audio('coin', [`${baseUrl}/assets/coin.ogg`, `${baseUrl}/assets/coin.mp3`]);
    // player dies
    this.load.audio('dead', [`${baseUrl}/assets/dead.ogg`, `${baseUrl}/assets/dead.mp3`]);

    // player assets
    this.load.image('player', `${baseUrl}/assets/player.png`);

    // monster assets
    this.load.image('enemy', `${baseUrl}/assets/enemy.png`);

    // interactive object assets
    this.load.image('coin', `${baseUrl}/assets/coin.png`);

    // level assets
    this.load.image('wallV', `${baseUrl}/assets/wallVertical.png`);
    this.load.image('wallH', `${baseUrl}/assets/wallHorizontal.png`);

    // Display a loading label
    const loadLabel = this.add.text(250, 170, 'loading', {
      font: '30px Arial',
      fill: '#fff',
    });

    // Change the point of origin of the text to make sure it will be centered
    loadLabel.setOrigin(0.5, 0.5);
  }

  create() {
    // Start the menu scene
    this.scene.start('MenuScene');
  }
}

export default LoadScene;
