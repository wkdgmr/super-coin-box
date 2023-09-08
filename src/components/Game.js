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
      scene: [LoadScene, MenuScene, PlayScene],
      physics: { default: 'arcade' },
      parent: 'game',

      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,

        min: {
          width: 250,
          height: 170,
        },

        max: {
          width: 1000,
          height: 680,
        }
      }
    };

    new Phaser.Game(config);
  }

  render() {
    return <div id="game"></div>; 
  }
}

export default Game;
