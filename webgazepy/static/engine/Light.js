export class Light {
    constructor(scene) {
        this.name = "main_light";
        this.direction = new BABYLON.Vector3(0, 1, 0);
        this.scene = scene;

        this.intensity = 0.65;
        this.lightInstance = this.createLight();
    }

    createLight() {
        const light = new BABYLON.HemisphericLight(this.name, this.direction, this.scene);
        light.intensity = this.intensity;
        return light;
    }
}
