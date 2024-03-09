import { SceneTemplate } from './scenes/SceneTemplate.js';

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const sceneSelector = document.getElementById('sceneSelector');

var scene = new SceneTemplate(engine).getScene();
createBaseSphere(scene, 2);

sceneSelector.addEventListener('change', (event) => {
    const selectedScene = event.target.value;
    switch (selectedScene) {
        case 'sphere':
            scene = new SceneTemplate(engine).getScene();
            createBaseSphere(scene, 2);
            break;
        case 'cube':
            scene = new SceneTemplate(engine).getScene();
            createBaseCube(scene, 1);
            break;
        case 'pointCloudSimple':
            scene = new SceneTemplate(engine).getScene();
            createPCL(scene, 10000);
            break;
        default:
            break;
    }
});

engine.runRenderLoop(() => {
    scene.render();
});


window.addEventListener('resize', () => {
    engine.resize();
});


function createBaseSphere(scene, diameter) {
    const sphereOpts = { segments: 32, diameter: diameter };
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", sphereOpts, scene);
    sphere.position = new BABYLON.Vector3(0, 1, 0);
}

function createBaseCube(scene, size) {
    const cubeOpts = { size: size};
    const cube = BABYLON.MeshBuilder.CreateBox("cube", cubeOpts, scene);
    cube.position = new BABYLON.Vector3(0, 0.5, 0);
}

function createPCL(scene, count) {
    const pcs = new BABYLON.PointsCloudSystem("pcs", 1, scene) 
    pcs.addPoints(count);
    pcs.pointSize = 3;
    pcs.buildMeshAsync();
}


