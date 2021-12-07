import MainScene from './MainScene.js';
import Phaser from 'phaser'

function launch(containerId) {
    return new Phaser.Game({
        width: 640,
        height: 1280,
        parent: containerId,
        scale: {
            parent: containerId,
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            min: {
                width: 300,
                height: 600
            },
            max: {
                width: 800,
                height: 1600
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
                gravity: {y: 100}
            }
        },
        scene: [MainScene]
    })
}

export default launch
export {launch}
