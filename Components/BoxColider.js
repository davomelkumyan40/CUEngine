import Colider from './Colider.js';

export default class BoxColider extends Colider {
    constructor({ position, size }) {
        super({ position, size });
        this.hasBottomColision = false;
    }

    colidesTopWith({ colider, velocity_y }) {
        return this.position.y + velocity_y < colider.position.y + colider.size.height &&
            this.position.x < colider.position.x + colider.size.width &&
            this.position.x + this.size.width > colider.position.x &&
            this.position.y + this.size.height > colider.position.y + colider.size.height &&
            this.position.y > colider.position.y;
    }

    colidesBottomWith({ colider, velocity_y }) {
        return this.position.y + this.size.height + velocity_y > colider.position.y &&
            this.position.x < colider.position.x + colider.size.width &&
            this.position.x + this.size.width > colider.position.x &&
            this.position.y < colider.position.y &&
            this.position.y + this.size.height < colider.position.y + colider.size.height;
    }

    colidesLeftWith(colider) {
        return this.position.x <= colider.position.x + colider.size.width &&
            this.position.x + this.size.width > colider.position.x + colider.size.width &&
            this.position.y + this.size.height > colider.position.y &&
            this.position.y < colider.position.y + colider.size.height;
    }

    colidesRightWith(colider) {
        return this.position.x + this.size.width >= colider.position.x &&
            this.position.x < colider.position.x &&
            this.position.y + this.size.height > colider.position.y &&
            this.position.y < colider.position.y + colider.size.height;
    }
}