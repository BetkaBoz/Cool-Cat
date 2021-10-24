import MainScene from './MainScene.js';

const config = {
  width: 640,
  height: 640,
  backgroundColor: '#333333',
  type: Phaser.AUTO,
  parent: 'phaser-game',
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
