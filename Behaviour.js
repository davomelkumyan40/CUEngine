import Vector from "./Primitives/Vector.js";
import { designer } from "./CuEngine.js";

export default class Behaviour {
    constructor(object) {
        this.object = object;
        this.transform = new Vector(0, 0, 0);
    }

    update() {

    }

    fixedUpdate() {
        if (this.object.sprite) {
            this.object.sprite.position.x += this.transform.x;
            this.object.sprite.position.y += this.transform.y;
        }
        if (this.object.boxColider) {
            this.object.boxColider.position.x += this.transform.x;
            this.object.boxColider.position.y += this.transform.y;
        }
    }

    getComponent(type) {
        return designer.layouts.find(o => o instanceof type);
    }
}