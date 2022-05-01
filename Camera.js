import Behaviour from "./Behaviour.js";
import { engine } from "./Engine.js";
import GameObject from "./Components/GameObject.js";
import Player from "./Scripts/Player.js";
import { Input, Keys } from "./Input.js";
import Vector3D from "./Primitives/Vector3.js";
import Size from "./Primitives/Size.js";

export default class Camera extends Behaviour {

    constructor(object) {
        super(object);
    }

    update() {
        //super.update();
    }


    fixedUpdate() {
    }
}