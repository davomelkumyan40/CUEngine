import { engine } from '../Engine.js';
import BodyType from '../Primitives/BodyType.js';
import ForceMode from '../Primitives/ForceMode.js';
import Time from '../Primitives/Time.js';
import Vector3 from '../Primitives/Vector3.js';

export default class RigidBody {
    #g = 9.807;
    #isVerticalForced = false;
    #isHorizontalForced = false;
    #pixelMultiplyer = 10;
    #horTime = new Time();
    #position = undefined;

    constructor({ velocity, position, bodyType }) {
        this.#position = position;
        this.velocity = velocity;
        this.time = new Time();
        this.freeFalling = true;
        //new
        //this.mass = mass;
        this.rotation;
        this.freezeRotation = true;
        this.gravityScale = 1;
        this.bodyType = bodyType;
    }


    get gravity() {
        return this.#g * this.gravityScale;
    }

    set gravity(value) {
        this.#g = value;
    }

    addForce(velocity, impulsMode = ForceMode.linear) {
        if (this.bodyType !== BodyType.dynamic) return;
        if (impulsMode === ForceMode.linear)
            this.velocity = velocity;
        else if (impulsMode === ForceMode.impuls) {
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
        if (this.bodyType !== BodyType.dynamic) return;
        this.velocity.y = this.gravity * this.time.deltaTime * this.#pixelMultiplyer; // each 10px === 1m  V = V0 + G * T
    }

    calculateVerticalForce() {
        if (this.bodyType !== BodyType.dynamic) return;
        this.velocity.y = (this.velocity.y + this.gravity * this.time.deltaTime); // V = V0 - G * T
        if (Math.floor(this.velocity.y) === 0) {
            this.time.reset();
            this.#isVerticalForced = false;
            this.freeFalling = true;
        }
    }

    calculateHorizontalForce() {
        if (this.bodyType !== BodyType.dynamic) return;
        this.velocity.x = (this.velocity.x + (this.velocity.x > 0 ? -1 * this.gravity : this.gravity) * this.#horTime.deltaTime); // V = V0 - G * T
        if (Math.floor(this.velocity.x) === 0) {
            this.velocity.x = 0;
            this.#horTime.reset();
            this.#isHorizontalForced = false;
        }
    }

    calculatePhysics(boxCollider) {
        if (this.bodyType === BodyType.dynamic) { // physics will affect on body only and only if body type is dynamic
            if (!this.#isVerticalForced && this.freeFalling) {
                this.calculateFreeFalling();
            }
            if (this.#isHorizontalForced)
                this.calculateHorizontalForce();
            if (this.#isVerticalForced)
                this.calculateVerticalForce();
        }

        //calculating collision
        if (!boxCollider || this.bodyType === BodyType.static) return;
        this.#position = boxCollider.transform.position; // TODO
        const collidables = engine.gameObjects.filter(o => o.boxCollider && o.boxCollider !== boxCollider);
        for (let i = 0; i < collidables.length; i++) {
            const obj = collidables[i];
            if (boxCollider.rightCollision(obj.boxCollider)) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    boxCollider.transform.position.x = obj.boxCollider.bounds.min.x - boxCollider.size.width - boxCollider.offset.x;
                }
                this.#isHorizontalForced = false;
            }
            if (boxCollider.leftCollision(obj.boxCollider)) {
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                    boxCollider.transform.position.x = obj.boxCollider.bounds.min.x + obj.boxCollider.size.width - boxCollider.offset.x;
                }
                this.#isHorizontalForced = false;
            }
            if (boxCollider.topCollision(obj.boxCollider, this.velocity.y)) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    boxCollider.transform.position.y = obj.boxCollider.bounds.min.y + obj.boxCollider.size.height - boxCollider.offset.y;
                }
                this.#isVerticalForced = false;
            }
            if (boxCollider.bottomCollision(obj.boxCollider, this.velocity.y)) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    boxCollider.transform.position.y = obj.boxCollider.bounds.min.y - boxCollider.size.height - boxCollider.offset.y;
                }
                this.freeFalling = false;
            } else {
                if (!this.freeFalling && !this.#isVerticalForced) {
                    this.time.reset();
                    this.freeFalling = true;
                }
            }
            this.#horTime.reset();
        }
        this.#position.y += this.velocity.y;
        this.#position.x += this.velocity.x;
    }


    //just teleports to position
    movePosition(vector3) {
        this.#position.x = vector3.x;
        this.#position.y = vector3.y;
        this.#position.z = vector3.z;
    }
}