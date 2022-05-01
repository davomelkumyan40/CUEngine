import Behaviour from '../Behaviour.js';
import { engine } from '../Engine.js';
import { Input, Keys } from '../Input.js';
import Vector3 from '../Primitives/Vector3.js';

export default class Enemy extends Behaviour {
    constructor(gameObject) {
        super(gameObject);
    }

    update() {
        super.update();

    }



    fixedUpdate() {
        super.fixedUpdate();
        // this.object.rigidBody.position = new Vector3(Input.mouseX, Input.mouseY);
        // this.object.boxColider.position = new Vector3(Input.mouseX, Input.mouseY);
        //this.drawLine(rayOrigin);

        if (Input.getKeyDown(Keys.arrowLeft)) {
            this.gameObject.rigidBody.velocity.x = -6;
        }
        if (Input.getKeyDown(Keys.arrowUp)) {
            this.gameObject.rigidBody.addForce({ y: 1 });
        }
        if (Input.getKeyDown(Keys.arrowDown)) {
            this.gameObject.rigidBody.velocity.y = 6;
        }
        if (Input.getKeyDown(Keys.arrowRight)) {
            this.gameObject.rigidBody.velocity.x = 6;
        }
    }
}