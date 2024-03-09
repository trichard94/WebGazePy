import { BasicScene } from './scenes/BasicScene.js';
import { PointCloudScene } from './scenes/PointCloudScene.js';

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const sceneSelector = document.getElementById('sceneSelector');
let currentScene = new BasicScene(engine).createScene();

sceneSelector.addEventListener('change', (event) => {
    const selectedScene = event.target.value;
    switch (selectedScene) {
        case 'basic':
            console.log("Basic Scene selected");
            currentScene = new BasicScene(engine).createScene();
            break;
        case 'pointCloud':
            console.log("PointCloud Scene selected");
            currentScene = new PointCloudScene(engine).createScene();
            break;
        default:
            break;
    }
});

engine.runRenderLoop(() => {
    currentScene.render();
});


window.addEventListener('resize', () => {
    engine.resize();
});
