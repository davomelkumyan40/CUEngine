export default class Sprite {
    constructor({ position, size, fill, flipX, flipY }) {
        this.position = position;
        this.size = size;
        this.fill = fill;
        this.flipX = flipX ?? false; //TODO finish
        this.flipY = flipY ?? false; //TODO finish
        if (fill.src) {
            this.texture = new Image(this.size.width, this.size.height);
            this.texture.src = fill.src;
        }
    }
}