export default class Vector {
    constructor({ x, y, z } = {}) {
        if (x)
            this.x = 0;
        if (y)
            this.y = 0;
        if (z)
            this.z = 0;
    }
}