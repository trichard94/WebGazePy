import { Camera } from './engine/Camera.js';
import { Light } from './engine/Light.js';
import { Ground } from './engine/Ground.js';
import { IOHandler } from './engine/IOHandler.js';

export class BasicScene {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);

        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = this.createScene();
    }

    createScene() {
        const scene = new BABYLON.Scene(this.engine);
        
        const camera = new Camera(scene);
        camera.cameraInstance.setPosition(new BABYLON.Vector3(0, 4, -15));

        new IOHandler(scene);

        const light = new Light(scene);
        const ground = new Ground(scene);
        
        // const axes = new BABYLON.Debug.AxesViewer(scene, 5);

        const sphereOpts = {segments:32, diameter: 2};
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", sphereOpts, scene);
        sphere.position = new BABYLON.Vector3(0, 1, 0);

        return scene;
    }

    runRenderLoop() {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    resizeCanvas() {
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
}