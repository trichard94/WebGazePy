export class IOHandler {
    constructor(scene) {
        this.scene = scene;
        this.keyStates = {};
        this.registerKeyboardCallbacks();
    }

    registerKeyboardCallbacks() {
        this.scene.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
                case BABYLON.KeyboardEventTypes.KEYDOWN:
                    this.handleKeyDown(kbInfo);
                    break;
            }
        });
    }

    handleKeyDown(kbInfo) {
        if (kbInfo.event.key === 'i') {
            this.handleKeyi();
        }
    }

    handleKeyi() {
        if (this.keyStates['i']) {
            this.scene.debugLayer.hide();
            this.keyStates['i'] = false;
        } else {
            this.scene.debugLayer.show({embedMode: true});
            this.keyStates['i'] = true;
        }
    }
}
