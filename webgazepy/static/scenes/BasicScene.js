import { Camera } from '../engine/Camera.js';
import { Light } from '../engine/Light.js';
import { Ground } from '../engine/Ground.js';
import { IOHandler } from '../engine/IOHandler.js';

export class BasicScene {
    constructor(engine) {
        this.engine = engine
    }
    createScene() {
        const scene = new BABYLON.Scene(this.engine);
        const camera = new Camera(scene);
        camera.cameraInstance.setPosition(new BABYLON.Vector3(0, 4, -15));
        new IOHandler(scene);
        new Light(scene);
        new Ground(scene);

        const sphereOpts = { segments: 32, diameter: 2 };
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", sphereOpts, scene);
        sphere.position = new BABYLON.Vector3(0, 1, 0);

        return scene;
    }
}
