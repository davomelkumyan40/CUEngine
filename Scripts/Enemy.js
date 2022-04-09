import Input from '../Input.js';
import Behavior from '../Behavior.js';

export default class Enemy extends Behavior {
    update() {

    }

    fixedUpdate() {
        if (Input.getKeyDown("ArrowLeft")) {
            this.object.rigidBody.addForce({ x: -5 });
        }
        if (Input.getKeyDown("ArrowUp")) {
            this.object.rigidBody.addForce({ y: 2 });
        }
        if (Input.getKeyDown("ArrowRight")) {
            this.object.rigidBody.addForce({ x: 5 });
        }
    }
}