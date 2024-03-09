class BasicScene {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        
        this.lastCameraPosition = null
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = this.createScene();
    }

    createScene() {
        const scene = new BABYLON.Scene(this.engine);


        const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 10, new BABYLON.Vector3.Zero(), scene);
        camera.attachControl(this.canvas, true);


        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 10, subdivisions: 4 }, scene);
        ground.material = new BABYLON.StandardMaterial('groundMaterial', scene);
        ground.material.wireframe = true;

        const xArrow = this.createArrow(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(2, 0, 0), BABYLON.Color3.Red());
        const yArrow = this.createArrow(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 2, 0), BABYLON.Color3.Green());
        const zArrow = this.createArrow(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 2), BABYLON.Color3.Blue());

        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
        sphere.position.x = 1;
        sphere.position.y = 1;
        sphere.position.z = 1;

        return scene;
    }

    createArrow(start, end, color) {
        const points = [start, end];
        const lines = BABYLON.MeshBuilder.CreateLines("lines", { points: points }, this.scene);
        lines.color = color;
        return lines;
    }

    runRenderLoop() {
        this.engine.runRenderLoop(() => {
            this.logCameraPosition();
            this.scene.render();
        });
    }

    resizeCanvas() {
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

    logCameraPosition() {
        const camera = this.scene.activeCamera;
        if (camera) {
            const currentCameraPosition = camera.position.clone();
            if (!this.lastCameraPosition || !this.lastCameraPosition.equals(currentCameraPosition)) {
                console.log('Camera Position:', currentCameraPosition);
                this.lastCameraPosition = currentCameraPosition.clone();
            }
        }
    }
}

export { BasicScene };