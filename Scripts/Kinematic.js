import Behaviour from '../Behaviour.js';
import RigidBody from '../Components/RigidBody.js';
import { Input, Keys } from '../Input.js';
import ForceMode from '../Primitives/ForceMode.js';
import Vector3 from '../Primitives/Vector3.js';

export class Kinematic extends Behaviour {
    constructor(gameObject) {
        super(gameObject);
        this.rBody = this.getComponent(RigidBody);
    }

    update() {
        super.update();

    }


    fixedUpdate() {
        super.fixedUpdate()
        this.transform.translate(new Vector3(2, 0));

        if (Input.getKeyDown(Keys.arrowLeft)) {
            this.gameObject.rigidBody.velocity.x = -6;
        }
        if (Input.getKeyDown(Keys.arrowUp)) {
            this.gameObject.rigidBody.addForce(new Vector3(0, 2), ForceMode.impuls); // should not work on kinematic object
            this.gameObject.rigidBody.velocity.y = -6;
        }
        if (Input.getKeyDown(Keys.arrowDown)) {
            this.gameObject.rigidBody.velocity.y = 6;
        }
        if (Input.getKeyDown(Keys.arrowRight)) {
            this.gameObject.rigidBody.velocity.x = 6;
        }
    }
}