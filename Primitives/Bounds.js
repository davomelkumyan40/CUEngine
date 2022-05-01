import Vector3 from "./Vector3.js";

export default class Bounds {
    constructor({ min, size }) {
        this.min = min;
        this.size = size;
        this.max = new Vector3(this.min.x + this.size.width, this.min.y + this.size.height);
        this.center = new Vector3(this.min.x + this.size.width / 2, this.min.y + this.size.height / 2);
    }
}