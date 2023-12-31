import Phaser from 'phaser';

class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' });
  }

  create() {
    // This method is called once, just after 'preload()'
    // It will initialize our scene, like the positions of the sprites

    // additional pointer
    this.input.addPointer(1);

    // Check for mobile or desktop device
    if (!this.sys.game.device.os.desktop) {
      this.addMobileInputs();

      // Create an empty label to write the error message if needed
      this.rotateLabel = this.add.text(250, 170, '',
        { font: '30px Arial', fill: '#fff', backgroundColor: '#000' });
      this.rotateLabel.setOrigin(0.5, 0.5);

      // call 'orientationChange' when the device is rotated
      this.scale.on('orientationchange', this.orientationChange, this);

      this.orientationChange();
    }



    // player physics
    this.player = this.physics.add.sprite(250, 170, 'player');
    this.player.body.gravity.y = 500;

    // monster physics
    this.enemies = this.physics.add.group();
    // Call 'addEnemy' every 2.2 seconds
    this.time.addEvent({
      delay: 2200,
      callback: () => this.addEnemy(),
      loop: true,
    });

    // user input
    this.arrow = this.input.keyboard.createCursorKeys();

    // interactive object creation
    this.coin = this.physics.add.sprite(60, 130, 'coin');

    // Display the score
    this.scoreLabel = this.add.text(30, 25, 'score: 0',
      { font: '18px Arial', fill: '#fff' });
    // Initialize the score variable
    this.score = 0;

    // Display coords
    this.coordLabel = this.add.text(370, 25, 'x: 0, y: 0',
      { font: '18px Arial', fill: '#fff' });

    // level creation
    this.createWorld();

    // sound effects
    this.jumpSound = this.sound.add('jump');
    this.coinSound = this.sound.add('coin');
    this.deadSound = this.sound.add('dead');
  }

  update() {
    // This method is called 60 times per second after 'create()'
    // It will handle all the game's logic

    /*  if (!this.sys.game.device.os.desktop
      && this.input.activePointer.y < 60) {
      // if we tap near the top of the game on mobile
      // it probably means we want to mute the game
      // so we oon't start the play scene
        return;
      } */

    // move player
    this.movePlayer();

    if (!this.player.active) {
      return;
    }

    // display player coordinates
    this.coordLabel.setText(`x: ${Math.round(this.player.x)}, y: ${Math.round(this.player.y)}`);

    // player collision detection
    this.physics.collide(this.player, this.walls);

    if (this.player.y > 340 || this.player.y < 0) {
      this.playerDie();
    }

    // check for overlap with enemies
    if (this.physics.overlap(this.player, this.enemies)) {
      this.playerDie();
    }

    // enemy collision detection
    this.physics.collide(this.enemies, this.walls);

    // check for overlap with interactable item
    if (this.physics.overlap(this.player, this.coin)) {
      this.takeCoin();
    }
  }

  addMobileInputs() {
    this.moveLeft = false;
    this.moveRight = false;

    let jumpButton = this.add.sprite(400, 290, 'jumpButton');
    jumpButton.setInteractive();
    jumpButton.on('pointerdown', this.jumpPlayer, this);
    jumpButton.alpha = 0.5;

    let leftButton = this.add.sprite(100, 290, 'leftButton');
    leftButton.setInteractive();
    leftButton.on('pointerover', () => this.moveLeft = true, this);
    leftButton.on('pointerout', () => this.moveLeft = false, this);
    leftButton.alpha = 0.5;

    let rightButton = this.add.sprite(180, 290, 'rightButton');
    rightButton.setInteractive();
    rightButton.on('pointerover', () => this.moveRight = true, this);
    rightButton.on('pointerout', () => this.moveRight = false, this);
    rightButton.alpha = 0.5;
  }
  
  movePlayer() {
    // if the left arrow key is pressed
    if (this.arrow.left.isDown || this.moveLeft) {
      // Move the player to the left
      // The velocity is in pixels per second
      this.player.body.velocity.x = -200;
    }
    // if the right arrow key is pressed
    else if (this.arrow.right.isDown || this.moveRight) {
      // Move the player to the right
      this.player.body.velocity.x = 200;
    }
    else {
      // stop the player
      this.player.body.velocity.x = 0;
    }

    // if the up arrow key is pressed and the player is on the ground
    if (this.arrow.up.isDown && this.player.body.onFloor()) {
      // Move the player upward (jump)
      this.jumpSound.play(); // jump audio
      this.player.body.velocity.y = -320;
    }
  }

  orientationChange() {
    if (this.scale.orientation === Phaser.Scale.PORTRAIT) {
      this.rotateLabel.setText(' rotate your device in landscape ');
      this.scene.pause();
    } else if (this.scale.orientation === Phaser.Scale.LANDSCAPE) {
      this.rotateLabel.setText('');
      this.scene.resume();
    }
  }

  playerDie() {
    this.deadSound.play(); // player death audio
    this.scene.start('MenuScene', { score: this.score });
  }
  
  addEnemy() {
    let enemy = this.enemies.create(250, -10, 'enemy');

    enemy.body.gravity.y = 500;
    enemy.body.velocity.x = Phaser.Math.RND.pick([-100, 100]);
    enemy.body.bounce.x = 1;

    this.time.addEvent({
      delay: 10000,
      callback: () => enemy.destroy(),
    });
  }

  updateCoinPosition() {
    // Store all the possible coin positions in an array
    let positions = [
      { x: 140, y: 60 },
      { x: 360, y: 60 },
      { x: 60, y: 140 },
      { x: 440, y: 140 },
      { x: 130, y: 300 },
      { x: 370, y: 300 },
    ];

    // Remove the current coin position from the array
    positions = positions.filter(coin => coin.x !== this.coin.x);

    // Randomly select a position from the array
    let newPosition = Phaser.Math.RND.pick(positions);

    // Set the new position of the coin
    this.coin.setPosition(newPosition.x, newPosition.y);
  }

  takeCoin() {
    // Destroy the coin to make it disappear from the game
    // this.coin.destroy();
    // var newX = Phaser.Math.RND.between(0, 390);
    // var newY = Phaser.Math.RND.between(0, 270);

    // increase the score by x and Update the score label by using its 'text' property
    this.coinSound.play(); // coin audio
    this.score += 5;
    this.scoreLabel.setText('score: ' + this.score);

    // Set the new coin position
    this.updateCoinPosition();

  }

  createWorld() {
    // Create an empty static groupm with physics
    this.walls = this.physics.add.staticGroup();

    // Create the 10 walls in the group
    this.walls.create(10, 170, 'wallV'); // Left
    this.walls.create(490, 170, 'wallV'); // Right

    this.walls.create(50, 10, 'wallH'); // Top left
    this.walls.create(450, 10, 'wallH'); // Top right
    this.walls.create(50, 330, 'wallH'); // Bottom left
    this.walls.create(450, 330, 'wallH'); // Bottom right

    this.walls.create(0, 170, 'wallH');  // Middle left
    this.walls.create(500, 170, 'wallH'); // Middle right
    this.walls.create(250, 90, 'wallH'); //  Middle top
    this.walls.create(250, 250, 'wallH'); // Middle bottom
  }
}

export default PlayScene;
