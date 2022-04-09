import { _2d } from '../CuEngine.js';
import Time from '../Primitives/Time.js';

export default class RigidBody {
    constructor({ velocity, position, size }) {
        this.velocity = velocity;
        this.position = position;
        this.size = size;
        this.g = 9.807;
        this.time = new Time();
        this.isForced = false;
        this.pixelMultiplyer = 10;
        this.freeFalling = true;
    }

    addForce(velocity) {
        if (velocity.x) {
            this.velocity.x = velocity.x;
        }
        if (velocity.y) {
            this.isForced = true;
            this.velocity.y = velocity.y * -1 * this.pixelMultiplyer;
            this.time.reset(); // reset gravity
        }
    }

    calculateFreeFalling(seconds) {
        this.velocity.y = this.g * seconds * this.pixelMultiplyer; // each 10px === 1m  V = V0 + G * T
    }

    calculateForce(seconds) {
        this.velocity.y = (this.velocity.y + this.g * seconds); // V = V0 - G * T
        if (Math.floor(this.velocity.y) === 0) {
            this.time.reset();
            this.isForced = false;
            this.freeFalling = true;
        }
    }

    calculatePhysics(boxColider) {
        const seconds = this.time.deltaTime;
        if (!this.isForced) {
            if (this.freeFalling) {
                this.calculateFreeFalling(seconds);
            }
        }
        else this.calculateForce(seconds);

        if (boxColider) {
            boxColider.dropColision();
            boxColider.position = this.position;
            for (let i = 0; i < _2d.objects.length; i++) {
                const obj = _2d.objects[i];
                if (obj.boxColider && obj.boxColider !== boxColider) {
                    if (boxColider.colidesRightWith(obj.boxColider)) {
                        boxColider.hasRightColision = true;
                        if (this.velocity.x > 0)
                            this.velocity.x = 0;
                        this.position.x = obj.boxColider.position.x - this.size.width;
                    }
                    if (boxColider.colidesLeftWith(obj.boxColider)) {
                        boxColider.hasLeftColision = true;
                        if (this.velocity.x < 0)
                            this.velocity.x = 0;
                        this.position.x = obj.boxColider.position.x + obj.boxColider.size.width;
                    }
                    if (boxColider.colidesTopWith({ colider: obj.boxColider, velocity_y: this.velocity.y })) {
                        this.isForced = false;
                        this.velocity.y = 0;
                        this.position.y = obj.boxColider.position.y + obj.boxColider.size.height + 1;
                    }
                    if (boxColider.colidesBottomWith({ colider: obj.boxColider, velocity_y: this.velocity.y })) { //  && !this.isForced
                        this.velocity.y = 0;
                        this.position.y = obj.boxColider.position.y - this.size.height;
                        boxColider.hasBottomColision = true;
                        obj.boxColider.hasTopColision = true;
                    } else {
                        obj.boxColider.hasTopColision = false;
                        if (!this.freeFalling && !this.isForced) {
                            this.time.reset();
                        }
                    }
                }

            }
            this.freeFalling = _2d.objects.every(
                o => o.boxColider ?
                    o.boxColider.hasTopColision ? false : true
                    : true);
        }

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.velocity.x = 0;

    }

    //TODO finish binding
    bindPosition(sprite) {
        sprite.position.x = this.position.x;
        sprite.position.y = this.position.y;
    }
}