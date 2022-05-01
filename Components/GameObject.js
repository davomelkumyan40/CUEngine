import { engine } from '../Engine.js';
import Sprite from './Sprite.js';
import SpriteRenderer from './SpriteRenderer.js';
import RigidBody from './RigidBody.js';
import BoxColider from './BoxCollider.js';
import Transform from './Transform.js';
import CuEntity from './CuEntity.js';

export default class GameObject extends CuEntity {
    constructor(position, name, tag) {
        super({ name, tag });
        this.rigidBody = undefined;
        this.sprite = undefined;
        this.boxColider = undefined;
        this.spriteRenderer = undefined;
        this.isStatic = false; // new
        super.transform = new Transform({ gameObject: this, position, name, tag });  // new
        engine.gameObjects.push(this);
    }

    setSprite({ position, size, fill }) {
        this.sprite = new Sprite({
            position: position,
            size: size,
            fill: fill
        });
        return this;
    }

    setRigidBody({ velocity, position }) {
        this.rigidBody = new RigidBody({
            velocity: velocity,
            position: position
        });
        return this;
    }

    setBoxColider({ position, size, isTrigger = false }) {
        this.boxColider = new BoxColider({
            position: position,
            size: size,
            isTrigger: isTrigger,
            transform: this.transform,
            name: this.name,
            tag: this.tag
        });
        return this;
    }

    build() {
        if (this.boxColider)
            this.boxColider.rigidBody = this.rigidBody;
        this.spriteRenderer = new SpriteRenderer(this.sprite);
        return this;
    }

    fixedUpdate() {
        if (this.rigidBody) {
            this.rigidBody.calculatePhysics(this.boxColider);
        }
    }

    update() {
        if (this.rigidBody) {
            this.rigidBody.bindPosition(this.sprite);
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