import BoxCollider from "./Components/BoxCollider.js";
import CuEntity from "./Components/CuEntity.js";
import { engine } from "./Engine.js";
import Guid from "./Primitives/Guid.js";

export default class Behaviour extends CuEntity {
    constructor(gameObject) {
        super({ name: "GameObject", transform: gameObject.transform });
        this.gameObject = gameObject;
        this.guid = Guid.create();
        this.b = this.getComponent(BoxCollider); // 
    }

    update() {
        //temporary draw collider
        if (this.b) {
            let c = engine.graphics.context;
            c.beginPath();
            c.strokeStyle = "green";
            c.lineWidth = 3;
            c.rect(this.b.bounds.min.x, this.b.bounds.min.y, this.b.size.width, this.b.size.height);
            c.stroke();
        }
    }

    fixedUpdate() {
    }

    getComponent(type) {
        return this.gameObject.getComponent(type);
    }

    print(data) {
        console.log(data);
    }
}