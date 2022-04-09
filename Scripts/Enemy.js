import Behaviour from '../Behaviour.js';
import { Input, Keys } from '../Input.js';

export default class Enemy extends Behaviour {
    constructor(object) {
        super(object);
    }

    update() {

    }

    fixedUpdate() {
        if (Input.getKeyDown(Keys.arrowLeft)) {
            this.object.rigidBody.addForce({ x: -5 });
        }
        if (Input.getKeyDown(Keys.arrowUp)) {
            this.object.rigidBody.addForce({ y: 2 });
        }
        if (Input.getKeyDown(Keys.arrowRight)) {
            this.object.rigidBody.addForce({ x: 5 });
        }
    }
}