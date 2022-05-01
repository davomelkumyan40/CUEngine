import Vector from "../Primitives/Vector3.js"
import CuEntity from "./CuEntity.js";

export default class Transform extends CuEntity {
    constructor({ gameObject, position, name, tag }) {
        super({ name, tag, transform: gameObject.transform });
        this.gameObject = gameObject
        this.position = position;
        this.right = this.position.x;
        this.up = this.position.y;
    }

    translate() {
    }
}