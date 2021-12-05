import MainScene from './MainScene.js';

const config = {
  width: 640,
  height: 640,
  parent: 'phaser-game',
  scale: {
    // Or set parent divId here
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    // Minimum size
    min: {
      width: 360,
      height: 360
    },
    // Maximum size
    max: {
      width: 800,
      height: 800
    },
    // Or set maximum size like these
    // maxWidth: 1600,
    // maxHeight: 1200,
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
