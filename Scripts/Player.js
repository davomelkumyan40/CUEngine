import Behaviour from '../Behaviour.js';
import RigidBody from '../Components/RigidBody.js';
import { Input, Keys } from '../Input.js';
import ImpulsMode from '../Primitives/ImpulseMode.js';
import Vector3 from '../Primitives/Vector3.js';


export default class Player extends Behaviour {
    constructor(gameObject) {
        super(gameObject);
        this.isJumping = false;
        this.rBody = this.getComponent(RigidBody);
        this.speed = 8.0;
    }

    update() {
        super.update();
    }

    fixedUpdate() {
        super.fixedUpdate();
        let ax = Input.getAxis("Horizontal");
        this.rBody.addForce({ velocity: ax.mult(this.speed), impulseMode: ImpulsMode.linear });
        // if (Input.getKeyDown(Keys.f)) {
        //     this.rBody.addForce({ x: 1 });
        // }
        // if (Input.getKeyDown(Keys.a)) {
        //     this.rBody.velocity.x = -6;
        // }
        // if (Input.getKeyDown(Keys.w)) {
        //     this.rBody.velocity.y = -6;
        // }
        // if (Input.getKeyDown(Keys.s)) {
        //     this.rBody.velocity.y = 6;
        // }
        if (Input.getKeyDown(Keys.space)) {
            // if (!this.isJumping) {
            //     this.isJumping = true;
            this.rBody.addForce({ velocity: new Vector3(0, 2), impulseMode: ImpulsMode.impuls });
            //}
        }
        // if (Input.getKeyDown(Keys.d)) {
        //     this.rBody.velocity.x = 6;
        // }
        //this.isJumping = !this.object.boxColider.hasBottomColision;
    }
}