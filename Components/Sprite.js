export default class Sprite {
    constructor({ position, size, fill, offset, cutSize, flip }) {
        this.position = position;
        this.size = size;
        this.fill = fill;
        this.flip = flip; //TODO finish
        if (fill.src) {
            this.texture = new Image(this.size.width, this.size.height);
            this.texture.src = fill.src;
            this.offset = offset;
            this.cutSize = cutSize;
        }
    }
}