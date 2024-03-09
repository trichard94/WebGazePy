export class Camera {
    constructor(canvas, scene) {
        this.name = "camera";
        this.alpha = 0;
        this.beta = 0;
        this.radius = 0;
        this.target = new BABYLON.Vector3.Zero();
        this.scene = scene;
        this.canvas = canvas;
        this.lastCameraPosition = null

        this.cameraInstance = this.createCamera();
        this.cameraInstance.angularSensibilityX = 700;
        this.cameraInstance.angularSensibilityY = 700;
        this.cameraInstance.wheelPrecision = 100;
    }

    createCamera() {
        const camera = new BABYLON.ArcRotateCamera(
            this.name,
            this.alpha,
            this.beta,
            this.radius,
            this.target,
            this.scene
        );
        camera.attachControl(this.canvas, true);
        return camera;
    }

    logCameraPosition() {
        if (this.cameraInstance) {
            const currentCameraPosition = this.cameraInstance.position.clone();
            if (!this.lastCameraPosition || !this.lastCameraPosition.equals(currentCameraPosition)) {
                console.log('Camera Position:', currentCameraPosition);
                this.lastCameraPosition = currentCameraPosition.clone();
            }
        }
    }
}
