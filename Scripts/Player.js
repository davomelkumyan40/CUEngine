import Behaviour from '../Behaviour.js';
import { Input, Keys } from '../Input.js';


export default class Player extends Behaviour {
    constructor(object) {
        super(object);
        this.isJumping = false;
    }

    update() {
        super.update();
    }

    fixedUpdate() {
        super.fixedUpdate();
        if (Input.getKeyDown(Keys.a)) {
            this.object.rigidBody.velocity.x = -6;
        }
        if (Input.getKeyDown(Keys.space)) {
            if (!this.isJumping) {
                this.isJumping = true;
                this.object.rigidBody.addForce({ y: 3 });
            }
        }
        if (Input.getKeyDown(Keys.d)) {
            this.object.rigidBody.velocity.x = 6;
        }
        this.isJumping = !this.object.boxColider.hasBottomColision;
    }
}