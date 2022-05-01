import CuEntity from "./CuEntity.js";

export default class Colider extends CuEntity {
    constructor({ position, rigidBody, isTrigger, transform, tag, name }) {
        super({ tag, name });
        this.position = position;
        this.attachedRigidBody = rigidBody;
        this.isTrigger = isTrigger;
        this.shapeCount;
        this.transform = transform;
    }

    static Destroy() {

    }
}