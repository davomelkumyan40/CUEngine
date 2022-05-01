import Graphics2D from './Graphics2D.js';
import Physics2D from './Physics2D.js';

export default class CuEngine {
    constructor({ height, width }) {
        this.gameObjects = [];
        this.physics = new Physics2D(this.gameObjects);
        this.graphics = new Graphics2D(height, width, this.gameObjects);
    }

    start() {
        this.physics.startCalculating();
        this.graphics.startRendering();
    }
}