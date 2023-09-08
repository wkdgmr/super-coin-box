import React from 'react';
import Phaser from 'phaser';
import LoadScene from '../scenes/LoadScene';
import MenuScene from '../scenes/MenuScene';
import PlayScene from '../scenes/PlayScene';

class Game extends React.Component {
  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      width: 500,
      height: 340,
      backgroundColor: '#3498db',
      parent: 'game', 
      scene: [LoadScene, MenuScene, PlayScene],
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
    };

    new Phaser.Game(config);
  }

  render() {
    return <div id="game"></div>; 
  }
}

export default Game;
