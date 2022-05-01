import Bounds from '../Primitives/Bounds.js';
import Vector3 from '../Primitives/Vector3.js';
import Colider from './Collider.js';
import Collision from './RayHit.js';

export default class BoxColider extends Colider {
    constructor({ position, size, rigidBody, isTrigger, transform, tag, name }) {
        super({ position, rigidBody, isTrigger, transform, tag, name });
        this.size = size;
        this.bounds = new Bounds({ min: position, size });
    }

    //origin is vector of start ray
    //dir is vector of direction ray
    // target is the collider of rect
    rayCast(origin, direction, target) {
        const noCollision = new Collision({ hasCollision: false });
        let invdir = new Vector3(1 / direction.x, 1 / direction.y);

        let t_near = new Vector3();
        t_near.x = (target.position.x - origin.x) * invdir.x;
        t_near.y = (target.position.y - origin.y) * invdir.y;
        let t_far = new Vector3();
        t_far.x = (target.position.x + target.size.width - origin.x) * invdir.x;
        t_far.y = (target.position.y + target.size.height - origin.y) * invdir.y;

        if (isNaN(t_far.y) || isNaN(t_far.x)) return noCollision;
        if (isNaN(t_near.y) || isNaN(t_near.x)) return noCollision;

        if (t_near.x > t_far.x) {
            let x = t_near.x;
            t_near.x = t_far.x;
            t_far.x = x;
        }
        if (t_near.y > t_far.y) {
            let y = t_near.y;
            t_near.y = t_far.y;
            t_far.y = y;
        }

        if (t_near.x > t_far.y || t_near.y > t_far.x) return noCollision;

        let t_hit_near = Math.max(t_near.x, t_near.y);

        let t_hit_far = Math.min(t_far.x, t_far.y);

        if (t_hit_far < 0)
            return noCollision;

        let contact_point = origin.x + t_hit_near * direction.x;
        contact_point = origin.y + t_hit_near * direction.y;

        let contact_normal;
        if (t_near.x > t_near.y)
            if (direction.x < 0)
                contact_normal = Direction.right;
            else contact_normal = Direction.left;
        else if (t_near.x < t_near.y)
            if (direction.y < 0)
                contact_normal = Direction.down;
            else contact_normal = Direction.up;

        return new Collision({ hitPoint: contact_point, hitCollider: target, contactTime: t_hit_near, hasCollision: true });
    }


    verticalCollision(collider) {
        return (this.position.x < collider.position.x + collider.size.width &&
            this.position.x + this.size.width > collider.position.x);
    }

    horizontalCollision(collider) {
        return (this.position.y < collider.position.y + collider.size.height &&
            this.position.y + this.size.height > collider.position.y);
    }

    topCollision(collider, velocity_y) {
        return this.position.y + velocity_y <= collider.position.y + collider.size.height &&
            this.position.y > collider.position.y &&
            this.verticalCollision(collider);
    }

    bottomCollision(collider, velocity_y) {
        return (this.position.y + this.size.height + velocity_y >= collider.position.y &&
            this.position.y < collider.position.y &&
            this.verticalCollision(collider));
    }

    leftCollision(collider) {
        return this.position.x <= collider.position.x + collider.size.width &&
            this.position.x + this.size.width > collider.position.x + collider.size.width &&
            this.horizontalCollision(collider);
    }

    rightCollision(collider) {
        return this.position.x + this.size.width >= collider.position.x &&
            this.position.x < collider.position.x &&
            this.horizontalCollision(collider);
    }
}