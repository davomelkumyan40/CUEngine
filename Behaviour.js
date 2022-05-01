import CuEntity from "./Components/CuEntity.js";
import Guid from "./Primitives/Guid.js";

export default class Behaviour extends CuEntity {
    constructor(gameObject) {
        super({ name: "GameObject", transform: gameObject.transform });
        this.gameObject = gameObject;
        this.guid = Guid.create();
    }

    update() {

    }

    fixedUpdate() {
        // if (this.object.sprite) {
        //     this.object.sprite.position.x = this.transform.x;
        //     this.object.sprite.position.y = this.transform.y;
        // }
        // if (this.object.boxColider) {
        //     this.object.boxColider.position.x = this.transform.x;
        //     this.object.boxColider.position.y = this.transform.y;
        // }
    }

    getComponent(type) {
        return this.gameObject.getComponent(type);
    }
}