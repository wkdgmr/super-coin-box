import Phaser from 'phaser';

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create(data) {
    // Retrieve the score, if there is one
    const score = data.score ? data.score : 0;

    // Display a background image
    this.add.image(250, 170, 'background');

    // Display the name of the game
    const nameLabel = this.add.text(250, 80, 'Super Coin Box', {
      font: '50px Arial',
      fill: '#fff',
    });
    nameLabel.setOrigin(0.5, 0.5);

    // Display the score
    const scoreText = 'score: ' + score;
    const scoreLabel = this.add.text(250, 170, scoreText, {
      font: '25px Arial',
      fill: '#fff',
    });
    scoreLabel.setOrigin(0.5, 0.5);

    // Display how to start the game
    let startText;
    if (this.sys.game.device.os.desktop) {
      startText = 'press the up arrow key to start';
    } else {
      startText = 'touch the screen to start';
    }

    // Display the label on the screen
    let startLabel = this.add.text(250, 260, startText, {
      font: '25px Arial',
      fill: '#fff',
    });
    startLabel.setOrigin(0.5, 0.5);

    // Store the up arrow key
    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  }

  update() {
    if (this.upKey.isDown || (!this.sys.game.device.os.desktop
      && this.input.activePointer.isDown)) {
      this.scene.start('PlayScene');
    }
  }
}

export default MenuScene;
