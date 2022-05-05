import CuEntity from "./CuEntity.js";

export default class Collider extends CuEntity {
    constructor({ offset, attachedRigidBody, isTrigger, transform, tag, name }) {
        super({ tag, name });
        this.offset = offset;
        this.attachedRigidBody = attachedRigidBody;
        this.isTrigger = isTrigger;
        this.shapeCount;
        this.transform = transform;
        this.onCollisionEnter = new Event("collisionEnter");
        this.onCollisionExit = new Event("collisionExit");
        this.onCollisionStay = new Event("collisionStay");
        this.onTriggerEnter = new Event("triggerEnter");
        this.onTriggerExit = new Event("triggerExit");
        this.onTriggerStay = new Event("triggerStay");
    }

    static Destroy() {

    }

}