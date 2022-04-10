import { _2d } from '../CuEngine.js';
import Sprite from './Sprite.js';
import SpriteRenderer from './SpriteRenderer.js';
import RigidBody from './RigidBody.js';
import BoxColider from './BoxColider.js';

export default class GameObject {
    constructor() {
        this.rigidBody = undefined;
        this.sprite = undefined;
        this.boxColider = undefined;
        this.spriteRenderer = undefined;
        _2d.objects.push(this);
    }

    //TODO test
    static create({ sprite, rigidBody, boxColider } = {}) {
        const object = new GameObject();
        object.rigidBody = rigidBody;
        object.sprite = sprite;
        object.boxColider = boxColider;
        _2d.objects.push(this);
        return this;
    }

    setSprite({ position, size, fill }) {
        this.sprite = new Sprite({
            position: position,
            size: size,
            fill: fill
        });
        this.spriteRenderer = new SpriteRenderer(this.sprite);
        return this;
    }

    setRigidBody({ velocity, position, size }) {
        this.rigidBody = new RigidBody({
            velocity: velocity,
            position: position,
            size: size
        });
        return this;
    }

    setBoxColider({ position, size }) {
        this.boxColider = new BoxColider({
            position: position,
            size: size
        });
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
}