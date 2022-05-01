import { engine } from '../Engine.js';
import ImpulseMode from '../Primitives/ImpulseMode.js';
import Time from '../Primitives/Time.js';

export default class RigidBody {
    #g = 9.807;
    #isVerticalForced = false;
    #isHorizontalForced = false;
    #pixelMultiplyer = 10;
    #horTime = new Time();

    constructor({ velocity, position, mass }) {
        this.velocity = velocity;
        this.position = position;
        this.time = new Time();
        this.freeFalling = true;
        //new
        this.mass = mass;
        this.rotation;
        this.freezeRotation = true;
        this.gravityScale = 1;
    }


    get gravity() {
        return this.#g * this.gravityScale;
    }

    set gravity(value) {
        this.#g = value;
    }

    addForce({ velocity, impulseMode = ImpulseMode.linear }) {
        if (impulseMode === ImpulseMode.linear)
            this.velocity = velocity;
        else if (impulseMode === ImpulseMode.impuls) {
            if (velocity.x) {
                this.velocity.x = velocity.x * this.#pixelMultiplyer;
                this.#isHorizontalForced = true;
                this.#horTime.reset(); // reset gravity
            }
            if (velocity.y) {
                this.freeFalling = false;
                this.#isVerticalForced = true;
                this.velocity.y = velocity.y * -1 * this.#pixelMultiplyer;
                this.time.reset(); // reset gravity
            }
        }
    }

    calculateFreeFalling() {
        this.velocity.y = this.gravity * this.time.deltaTime * this.#pixelMultiplyer; // each 10px === 1m  V = V0 + G * T
    }

    calculateVerticalForce() {
        this.velocity.y = (this.velocity.y + this.gravity * this.time.deltaTime); // V = V0 - G * T
        if (Math.floor(this.velocity.y) === 0) {
            this.time.reset();
            this.#isVerticalForced = false;
            this.freeFalling = true;
        }
    }

    calculateHorizontalForce() {
        this.velocity.x = (this.velocity.x + (this.velocity.x > 0 ? -1 * this.gravity : this.gravity) * this.#horTime.deltaTime); // V = V0 - G * T
        if (Math.floor(this.velocity.x) === 0) {
            this.velocity.x = 0;
            this.#horTime.reset();
            this.#isHorizontalForced = false;
        }
    }

    calculatePhysics(boxColider) {
        if (!this.#isVerticalForced && this.freeFalling) {
            this.calculateFreeFalling();
        }
        if (this.#isHorizontalForced)
            this.calculateHorizontalForce();
        if (this.#isVerticalForced)
            this.calculateVerticalForce();

        if (boxColider) {
            this.position = boxColider.transform.position = boxColider.position; // TODO
            const collidables = engine.gameObjects.filter(o => o.boxColider && o.boxColider !== boxColider);
            for (let i = 0; i < collidables.length; i++) {
                const obj = collidables[i];
                if (boxColider.rightCollision(obj.boxColider)) {
                    if (this.velocity.x > 0) {
                        this.velocity.x = 0;
                        boxColider.position.x = obj.boxColider.position.x - boxColider.size.width;
                    }
                    this.#isHorizontalForced = false;
                }
                if (boxColider.leftCollision(obj.boxColider)) {
                    if (this.velocity.x < 0) {
                        this.velocity.x = 0;
                        boxColider.position.x = obj.boxColider.position.x + obj.boxColider.size.width;
                    }
                    this.#isHorizontalForced = false;
                }
                if (boxColider.topCollision(obj.boxColider, this.velocity.y)) {
                    if (this.velocity.y < 0) {
                        this.velocity.y = 0;
                        boxColider.position.y = obj.boxColider.position.y + obj.boxColider.size.height;
                    }
                    this.#isVerticalForced = false;
                }
                if (boxColider.bottomCollision(obj.boxColider, this.velocity.y)) { //  && !this.#isVerticalForced
                    if (this.velocity.y > 0) {
                        this.velocity.y = 0;
                        boxColider.position.y = obj.boxColider.position.y - boxColider.size.height;
                    }
                    this.freeFalling = false;
                } else {
                    if (!this.freeFalling && !this.#isVerticalForced) {
                        this.time.reset();
                    }
                    this.freeFalling = true;
                }
                this.#horTime.reset();
            }
        }
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    }

    //TODO finish binding
    bindPosition(sprite) {
        sprite.position.x = this.position.x;
        sprite.position.y = this.position.y;
    }

    movePosition() {

    }
}