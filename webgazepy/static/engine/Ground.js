export class Ground {
    constructor(canvas, scene) {
        this.name = "ground";
        this.scene = scene;
        this.width = 5;
        this.height = 5;
        this.subdivision = 10

        this.options = {width: this.width, height: this.height, subdivisions: this.subdivision};
        this.material = new BABYLON.StandardMaterial('groundMaterial', this.scene);
        this.lightInstance = this.createGround();
    }

    createGround() {
        const ground = BABYLON.MeshBuilder.CreateGround(this.name, this.options, this.scene);
        ground.material = this.material;
        ground.material.wireframe = true;
        return ground;
    }
}
