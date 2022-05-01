import Behaviour from '../Behaviour.js';
import { Input, Keys } from '../Input.js';
import ImpulsMode from '../Primitives/ImpulseMode.js';
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
            this.gameObject.rigidBody.addForce({ velocity: new Vector3(0, 2), impulsMode: ImpulsMode.impuls });
        }
        if (Input.getKeyDown(Keys.arrowDown)) {
            this.gameObject.rigidBody.velocity.y = 6;
        }
        if (Input.getKeyDown(Keys.arrowRight)) {
            this.gameObject.rigidBody.velocity.x = 6;
        }
    }
}