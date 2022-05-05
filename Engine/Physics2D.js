import { designer } from "../Engine.js";
import RayHit from "../Primitives/RayHit.js";

export default class Physics2D {
    constructor(gameObjects) {
        this.calculationInterval = 0.02; // by default in unity also
        this.gameObjects = gameObjects;
    }

    startCalculating() {
        setInterval(() => {
            //first running user side code
            designer.layouts.forEach((l) => {
                l.fixedUpdate();
            });
            //then running engine calculation
            this.gameObjects.forEach(o => {
                o.fixedUpdate();
            });
        }, this.calculationInterval * 1000);
    }

    //TODO finish
    //origin is vector of start ray
    //dir is vector of direction ray
    // target is the collider of rect
    static rayCast(origin, direction, target) {
        const noCollision = new RayHit({ hasCollision: false });
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

        return new RayHit({ hitPoint: contact_point, hitCollider: target, contactTime: t_hit_near, hasCollision: true });
    }
}