import { engine } from '../Engine.js';
import Sprite from './Sprite.js';
import SpriteRenderer from './SpriteRenderer.js';
import RigidBody from './RigidBody.js';
import BoxCollider from './BoxCollider.js';
import Transform from './Transform.js';
import CuEntity from './CuEntity.js';
import BodyType from '../Primitives/BodyType.js';
import Vector3 from '../Primitives/Vector3.js';

export default class GameObject extends CuEntity {
    constructor(position, name, tag) {
        super({ name, tag });
        this.rigidBody = undefined;
        this.sprite = undefined;
        this.boxCollider = undefined;
        this.spriteRenderer = undefined;
        this.isStatic = false; // new
        super.transform = new Transform({ gameObject: this, position, name, tag });  // new
        engine.gameObjects.push(this);
    }

    setSprite({ position, size, fill, offset, cutOffset, cutSize }) {
        this.sprite = new Sprite({
            position: position,
            size: size,
            fill: fill,
            offset: offset,
            cutOffset,
            cutSize
        });
        return this;
    }

    setRigidBody({ velocity, bodyType }) {
        this.rigidBody = new RigidBody({
            velocity: velocity ?? new Vector3(0, 0, 0),
            position: this.transform.position,
            bodyType: bodyType ?? BodyType.dynamic
        });
        return this;
    }

    setBoxCollider({ offset, size, isTrigger = false }) {
        this.boxCollider = new BoxCollider({
            offset: offset ?? new Vector3(0, 0, 0),
            size: size,
            isTrigger: isTrigger,
            transform: this.transform,
            name: this.name,
            tag: this.tag
        });
        return this;
    }

    setCircleCollider() {
        return this;
    }

    setAnimator() {
        return this;
    }



    build() {
        if (!this.rigidBody && this.boxCollider)
            this.setRigidBody({ bodyType: BodyType.static });
        if (this.boxCollider)
            this.boxCollider.attachedRigidBody = this.rigidBody;
        this.spriteRenderer = new SpriteRenderer(this.sprite);
        return this;
    }

    fixedUpdate() {
        if (this.rigidBody) {
            this.rigidBody.calculatePhysics(this.boxCollider);
        }
    }

    update() {
        if (this.rigidBody) {
            this.transform.bind(this.sprite);
        }
        if (this.spriteRenderer)
            this.spriteRenderer.render();
    }

    getComponent(type) {
        for (const key of Object.keys(this)) {
            if (this[key] instanceof type)
                return this[key];
        }
    }

    static destroy() {
    }

    static instantiate() {

    }

    static findWithTag(tag) {
        return engine.gameObjects.find(o => o.tag === tag);
    }

    static findGameObjectsWithTag(tag) {
        return engine.gameObjects.filter(o => o.tag === tag);
    }

    static find(name) {
        return engine.gameObjects.find(o => o.name === name);
    }
}