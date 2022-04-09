import Behaviour from '../Behaviour.js';
import { Input, Keys } from '../Input.js';


export default class Player extends Behaviour {
    constructor(object) {
        super(object);
        this.isJumping = false;
    }

    update() {

    }

    fixedUpdate() {
        if (Input.getKeyDown(Keys.a)) {
            this.object.rigidBody.velocity.x = -10;
        }
        if (Input.getKeyDown(Keys.space)) {
            if (!this.isJumping) {
                this.isJumping = true;
                this.object.rigidBody.addForce({ y: 2 });
            }
        }
        if (Input.getKeyDown(Keys.d)) {
            this.object.rigidBody.velocity.x = 10;
        }
        this.isJumping = !this.object.boxColider.hasBottomColision;
    }
}