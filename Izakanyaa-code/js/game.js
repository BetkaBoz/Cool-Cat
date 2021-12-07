import MainScene from './MainScene.js';

const config = {
  width: 1280,
  height: 640,
  parent: 'phaser-game',
  scale: {
    // Or set parent divId here
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    // Minimum size
    min: {
      width: 720,
      height: 300
    },
    max: {
        width: 1600,
        height: 800
    },
    zoom: 1,
  },
  autoRound: false,
    // Size of game canvas = game size * zoom   },,
  backgroundColor: '#333333',
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
        debug: false,
        gravity: { y: 100 }
    }
  },
  scene: [MainScene]
};

new Phaser.Game(config);