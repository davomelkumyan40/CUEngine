export default class RayHit { //TODO not done
    constructor({ hitPoint, hitCollider, contactTime, hasCollision }) {
        this.hitPoint = hitPoint;
        this.hitCollider = hitCollider;
        this.hit = hasCollision;
        this.hitTime = contactTime;
    }
}