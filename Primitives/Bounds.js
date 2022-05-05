import Vector3 from "./Vector3.js";

export default class Bounds {
    constructor({ min, size }) {
        this.min = min;
        this.size = size;
    }

    get max() {
        return new Vector3(this.min.x + this.size.width, this.min.y + this.size.height);
    }

    get center() {
        return new Vector3(this.min.x + this.size.width / 2, this.min.y + this.size.height / 2);
    }
}