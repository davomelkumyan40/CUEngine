import { _2d } from '../CuEngine.js';

export default class SpriteRenderer {
    constructor(sprite) {
        this.sprite = sprite;
    }

    render() {
        if (this.sprite.fill.color) {
            _2d.graphics.context.fillStyle = this.sprite.fill.color;
            _2d.graphics.context.fillRect(this.sprite.position.x, this.sprite.position.y, this.sprite.size.width, this.sprite.size.height);
        }
    }
}