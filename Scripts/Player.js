import Input from '../Input.js';
import Behavior from '../Behavior.js';

export default class Player extends Behavior {
    update() {

    }

    fixedUpdate() {
        if (Input.getKeyDown("a")) {
            this.object.rigidBody.addForce({ x: -5 });
        }
        if (Input.getKeyDown("space")) {
            this.object.rigidBody.addForce({ y: 2 });
        }
        if (Input.getKeyDown("d")) {
            this.object.rigidBody.addForce({ x: 5 });
        }
    }
}