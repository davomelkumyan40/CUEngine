import _2DGraphics from './_2DGraphics.js';
import _2DPhysics from './_2DPhysics.js';

export default class _2D {
    constructor({ height, width, update, fixedUpdate }) {
        this.objects = new Array();
        this.physics = new _2DPhysics(this.objects);
        this.physics.fixedUpdate = fixedUpdate;
        this.graphics = new _2DGraphics(height, width);
        this.graphics.objects = this.objects;
        this.graphics.update = update;
    }

    generate() {
        this.physics.calculate();
        this.graphics.render();
    }
}