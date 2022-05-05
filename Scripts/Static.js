import Behaviour from "../Behaviour.js";
import RigidBody from "../Components/RigidBody.js";
import { Input, Keys } from "../Input.js";
import ForceMode from "../Primitives/ForceMode.js";
import Vector3 from "../Primitives/Vector3.js";

export class Static extends Behaviour {
    constructor(gameObject) {
        super(gameObject);
        this.rBody = this.getComponent(RigidBody);
    }


    update() {
        super.update();

    }


    fixedUpdate() {
        super.fixedUpdate();

        //this.rBody.movePosition(this.transform.position.add(0.5));
        if (Input.getKeyDown(Keys.h)) {
            this.gameObject.rigidBody.velocity.x = -6;
        }
        if (Input.getKeyDown(Keys.u)) {
            this.gameObject.rigidBody.addForce({ velocity: new Vector3(0, 2), impulsMode: ForceMode.impuls }); // should not work on kinematic object
            this.gameObject.rigidBody.velocity.y = -6;
        }
        if (Input.getKeyDown(Keys.j)) {
            this.gameObject.rigidBody.velocity.y = 6;
        }
        if (Input.getKeyDown(Keys.k)) {
            this.gameObject.rigidBody.velocity.x = 6;
        }
    }
}