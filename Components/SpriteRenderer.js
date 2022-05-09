import { engine } from '../Engine.js';

export default class SpriteRenderer {
    constructor(sprite) {
        this.sprite = sprite;
    }

    render() { // TODO FIX BUGS
        const c = engine.graphics.context;
        if (this.sprite.fill.src) {
            this.#renderImage();
        }
        else if (this.sprite.fill.color) {
            c.fillStyle = this.sprite.fill.color;
            c.fillRect(this.sprite.position.x, this.sprite.position.y, this.sprite.size.width, this.sprite.size.height);
        }
    }

    #renderImage() {
        const c = engine.graphics.context;
        const img = this.sprite.texture;
        let fx = this.sprite.flipX ? -1 : 1;
        let fy = this.sprite.flipY ? -1 : 1;

        if (this.sprite.flipX || this.sprite.flipY) {
            if (this.sprite.flipX)
                c.translate(this.sprite.size.width, 0);
            if (this.sprite.flipY)
                c.translate(0, this.sprite.size.height);
            c.scale(fx, fy);
        }
        c.drawImage(img, this.sprite.position.x, this.sprite.position.y, this.sprite.size.width, this.sprite.size.height);
        if (this.sprite.flipX || this.sprite.flipY)
            c.setTransform(1, 0, 0, 1, 0, 0);
    }
}