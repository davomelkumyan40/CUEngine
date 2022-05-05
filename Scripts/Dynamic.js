import Behaviour from '../Behaviour.js';
import RigidBody from '../Components/RigidBody.js';
import Sprite from '../Components/Sprite.js';
import { Input, Keys } from '../Input.js';
import ForceMode from '../Primitives/ForceMode.js';
import Vector3 from '../Primitives/Vector3.js';


export class Dynamic extends Behaviour {
    constructor(gameObject) {
        super(gameObject);
        this.isJumping = false;
        this.rBody = this.getComponent(RigidBody);
        this.sprite = this.getComponent(Sprite);
        this.speed = 8.0;
    }

    update() {
        super.update();
    }

    fixedUpdate() {
        super.fixedUpdate();
        let hax = Input.getAxis("Horizontal");
        let vax = Input.getAxis("Vertical");
        this.rBody.velocity.x = hax.mult(this.speed).x;
        //this.rBody.velocity.y = vax.mult(this.speed).y;
        if (Input.getKeyDown(Keys.space)) {
            this.rBody.addForce(new Vector3(0, 2), ForceMode.impuls);
        }
    }
}