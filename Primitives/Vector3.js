export default class Vector3 {
    constructor(x, y, z) {
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.z = z ?? 0;
    }

    static up = new Vector3(0, -1, 0);
    static down = new Vector3(0, 1, 0);
    static left = new Vector3(-1, 0, 0);
    static right = new Vector3(1, 0, 0);

    equals(vector3) {
        return (this.x === vector3.x && this.y === vector3.y) //  && this.z === vector3.z
    }

    #isVector(vector3) {
        return (vector3.x || vector3.x === 0 && vector3.y || vector3.y === 0 && vector3.z || vector3.z === 0);
    }

    add(vector3) {
        if (this.#isVector(vector3))
            return new Vector3(this.x + vector3.x, this.y + vector3.y, this.z + vector3.z);
        else return new Vector3(this.x + vector3, this.y + vector3, this.z + vector3);
    }

    sub(vector3) {
        if (this.#isVector(vector3))
            return new Vector3(this.x - vector3.x, this.y - vector3.y, this.z - vector3.z);
        else return new Vector3(this.x - vector3, this.y - vector3, this.z - vector3);
    }

    div(vector3) {
        if (this.#isVector(vector3))
            return new Vector3(this.x / vector3.x, this.y / vector3.y, this.z / vector3.z);
        else return new Vector3(this.x / vector3, this.y / vector3, this.z / vector3);
    }

    mult(vector3) {
        if (this.#isVector(vector3))
            return new Vector3(this.x * vector3.x, this.y * vector3.y, this.z * vector3.z);
        else return new Vector3(this.x * vector3, this.y * vector3, this.z * vector3);
    }

    normalize() {
        let length = this.x * this.x + this.y * this.y;
        if (length > 0) {
            length = Math.sqrt(length);
            const inverseLength = 1.0 / length;
            this.x *= inverseLength;
            this.y *= inverseLength;
        } else {
            this.x = 1;
            this.y = 0;
        }
        return length;
    }
}