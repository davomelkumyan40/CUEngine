import { engine } from '../Engine.js';
import { Input } from '../Input.js';
import Vector3D from '../Primitives/Vector3.js';

export default class SpriteRenderer {
    constructor(sprite) {
        this.sprite = sprite;
    }

    render() {
        if (this.sprite.fill.color) {
            engine.graphics.context.fillStyle = this.sprite.fill.color;
            engine.graphics.context.fillRect(this.sprite.position.x, this.sprite.position.y, this.sprite.size.width, this.sprite.size.height);
        }
    }

    
}