import Colider from './Colider.js';

export default class BoxColider extends Colider {
    constructor({ position, size }) {
        super({ position, size });
        this.hasBottomColision = false;
        this.hasTopColision = false;
        this.hasLeftColision = false;
        this.hasRightColision = false;
    }

    dropColision() {
        this.hasBottomColision =
            this.hasTopColision =
            this.hasLeftColision =
            this.hasRightColision = false;
    }

    colidesTopWith({ colider, velocity_y }) {
        return this.position.y + velocity_y < colider.position.y + colider.size.height &&
            this.position.x < colider.position.x + colider.size.width &&
            this.position.x + this.size.width > colider.position.x &&
            this.position.y + this.size.height > colider.position.y + colider.size.height &&
            this.position.y > colider.position.y;
    }

    colidesBottomWith({ colider, velocity_y }) {
        let colCondition = this.position.y + this.size.height + velocity_y > colider.position.y &&
            this.position.x < colider.position.x + colider.size.width &&
            this.position.x + this.size.width > colider.position.x &&
            this.position.y + velocity_y < colider.position.y;
        let col2Condition = this.position.y + this.size.height + velocity_y > colider.position.y &&
            this.position.x < colider.position.x + colider.size.width &&
            this.position.x + this.size.width > colider.position.x &&
            this.position.y < colider.position.y &&
            this.position.y + this.size.height + velocity_y > colider.position.y;

        return colCondition || col2Condition;
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