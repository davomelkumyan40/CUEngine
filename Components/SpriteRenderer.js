import { engine } from '../Engine.js';

export default class SpriteRenderer {
    constructor(sprite) {
        this.sprite = sprite;
    }

    render() { // TODO FIX BUGS
        if (this.sprite.fill.src) {
            if (this.sprite.offset && this.sprite.cutSize) {
                engine.graphics.context.drawImage(this.sprite.texture, this.sprite.offset.x, this.sprite.offset.y, this.sprite.cutSize.x, this.sprite.cutSize.y, this.sprite.position.x, this.sprite.position.y, this.sprite.size.width, this.sprite.size.height);
            }
            else {
                engine.graphics.context.drawImage(this.sprite.texture, this.sprite.position.x, this.sprite.position.y, this.sprite.size.width, this.sprite.size.height);
            }
        }
        else if (this.sprite.fill.color) {
            engine.graphics.context.fillStyle = this.sprite.fill.color;
            engine.graphics.context.fillRect(this.sprite.position.x, this.sprite.position.y, this.sprite.size.width, this.sprite.size.height);
        }
    }
}