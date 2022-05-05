import BodyType from '../Primitives/BodyType.js';
import Bounds from '../Primitives/Bounds.js';
import Vector3 from '../Primitives/Vector3.js';
import Collider from './Collider.js';
import RayHit from '../Primitives/RayHit.js';

export default class BoxCollider extends Collider {
    #bounds;

    constructor({ offset, size, attachedRigidBody, isTrigger, transform, tag, name }) {
        super({ offset, attachedRigidBody, isTrigger, transform, tag, name });
        this.size = size;
        this.#bounds = new Bounds({ min: transform.position.add(offset), size });
    }

    get bounds() {
        if (this.attachedRigidBody.bodyType === BodyType.static) return this.#bounds;
        this.#bounds.min = this.transform.position.add(this.offset);
        this.#bounds.size = this.size;
        return this.#bounds;
    }

    cast() {
        //TODO new feature rayCastCollision maybe comming soon
    }


    verticalCollision(collider) {
        return (this.bounds.min.x < collider.bounds.max.x &&
            this.bounds.max.x > collider.bounds.min.x);
    }

    horizontalCollision(collider) {
        return (this.bounds.min.y < collider.bounds.max.y &&
            this.bounds.max.y > collider.bounds.min.y);
    }

    topCollision(collider, velocity_y) {
        return this.bounds.min.y + velocity_y <= collider.bounds.max.y &&
            this.bounds.min.y > collider.bounds.min.y &&
            this.verticalCollision(collider);
    }

    bottomCollision(collider, velocity_y) {
        return (this.bounds.max.y + velocity_y >= collider.bounds.min.y &&
            this.bounds.min.y < collider.bounds.min.y &&
            this.verticalCollision(collider));
    }

    leftCollision(collider) {
        return this.bounds.min.x <= collider.bounds.max.x &&
            this.bounds.max.x > collider.bounds.max.x &&
            this.horizontalCollision(collider);
    }

    rightCollision(collider) {
        return this.bounds.max.x >= collider.bounds.min.x &&
            this.bounds.min.x < collider.bounds.min.x &&
            this.horizontalCollision(collider);
    }
}