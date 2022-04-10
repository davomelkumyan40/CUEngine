import Behaviour from "./Behaviour.js";
import { _2d } from "./CuEngine.js";
import Vector from "./Primitives/Vector.js";
import GameObject from "./Components/GameObject.js";
import Player from "./Scripts/Player.js";
import { Input, Keys } from "./Input.js";

export default class Camera extends Behaviour {

    constructor(object) {
        super(object);
        this.object = object ?? new GameObject()
            .setSprite({
                position: {
                    x: 0,
                    y: 0
                },
                size: {
                    width: _2d.graphics.width,
                    height: _2d.graphics.height
                },
                fill: {
                    color: "#1E1E1E"
                }
            });
    }

    update() {
        super.update();
        //camera binding to player
        const player = this.getComponent(Player);
        if (Input.getKeyDown(Keys.space) && !player.isJumping)
            this.transform.y = player.object.rigidBody.velocity.y;
        else this.transform.y = -player.object.rigidBody.velocity.y;
        if (Input.getKeyDown(Keys.a))
            this.transform.x = 6;
        else if (Input.getKeyDown(Keys.d))
            this.transform.x = -6;
        else this.transform.x = 0;
    }


    fixedUpdate() {
        //super.fixedUpdate(); //do not move camera layer layout
        _2d.objects.forEach(o => {
            if (o !== this.object) {
                if (o.sprite) {
                    o.sprite.position.x += this.transform.x;
                    o.sprite.position.y += this.transform.y;
                }
                if (o.boxColider) {
                    o.boxColider.position.x += this.transform.x;
                    o.boxColider.position.y += this.transform.y;
                }
            }
        });
    }
}