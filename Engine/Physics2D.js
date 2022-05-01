import { designer } from "../Engine.js";

export default class Physics2D {
    constructor(gameObjects) {
        this.calculationInterval = 0.02; // by default in unity also
        this.gameObjects = gameObjects;
    }

    startCalculating() {
        setInterval(() => {
            //first running user side code
            designer.layouts.forEach((l) => {
                l.fixedUpdate();
            });
            //then running engine calculation
            this.gameObjects.forEach(o => {
                o.fixedUpdate();
            });
        }, this.calculationInterval * 1000);
    }
}