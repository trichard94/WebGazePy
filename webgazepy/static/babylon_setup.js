import { BasicScene } from './BasicScene.js';

document.addEventListener('DOMContentLoaded', () => {
    const basicScene = new BasicScene();
    basicScene.runRenderLoop();
    basicScene.resizeCanvas();
});
