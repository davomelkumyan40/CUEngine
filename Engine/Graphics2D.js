import { designer } from "../Engine.js";
import Time from "../Primitives/Time.js";

export default class Graphics2D {
    constructor(height, width, gameObjects) {
        this.brush = document.createElement('canvas');
        document.body.appendChild(this.brush);
        this.context = this.brush.getContext('2d');
        this.brush.height = height;
        this.brush.width = width;
        this.height = height;
        this.width = width;
        this.time = new Date();
        this.vsync = true;
        this.fps = 59;
        this.fpsInterval = 1000 / this.fps;
        this.gameObjects = gameObjects;
        this.fpsCount = 0;
    }

    #fpst = new Time();

    startRendering() {
        if (this.#fpst.deltaTime > 1) {
            this.#fpst.reset();
            this.fpsCount = 0;
        }
        window.requestAnimationFrame(this.startRendering.bind(this));
        const now = new Date();
        const elapsed = now - this.time;
        if (this.vsync) {
            if (elapsed > this.fpsInterval) {
                this.fpsCount++;
                this.time = now - (elapsed % this.fpsInterval);
                this.render();
            }
        }
        else {
            this.fpsCount++;
            this.render();
        }
    }

    render() {
        //first running engine side render
        this.gameObjects.forEach((o) => {
            o.update();
        });
        // then running user side render
        designer.layouts.sort((l1, l2) => {
            return l1.transform.position.z - l2.transform.position.z;
        }).forEach((l) => {
            l.update();
        });

    }
}