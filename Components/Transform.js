import CuEntity from "./CuEntity.js";

export default class Transform extends CuEntity {
    #position;
    constructor({ gameObject, position, name, tag }) {
        super({ name, tag, transform: gameObject.transform });
        this.gameObject = gameObject
        this.position = position;
    }

    get up() {
        return this.position.y;
    }

    get right() {
        return this.position.x;
    }

    get position() {
        return this.#position;
    }

    set position(value) {
        this.#position = value;
    }

    //TODO finish binding
    bind(sprite) {
        sprite.position.x = this.position.x;
        sprite.position.y = this.position.y;
    }

    translate(vector3) {
        this.gameObject.rigidBody.velocity = vector3;
    }
}