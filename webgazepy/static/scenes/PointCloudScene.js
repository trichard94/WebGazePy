import { Camera } from '../engine/Camera.js';
import { Light } from '../engine/Light.js';
import { Ground } from '../engine/Ground.js';
import { IOHandler } from '../engine/IOHandler.js';

export class PointCloudScene {
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
    
        return scene;
    }
}