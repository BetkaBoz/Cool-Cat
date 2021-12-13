import MainScene from './MainScene.js';
import Phaser from 'phaser'

function launch(containerId) {
    return new Phaser.Game({
        width: 1280,
        height: 640,
        parent: containerId,
        scale: {
            // Or set parent divId here
            parent: containerId,
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
                gravity: {y: 100}
            }
        },
        scene: [MainScene]
    })
}

export default launch
export {launch}
