import GameObject from './Components/GameObject.js';
import { engine } from '../Engine.js';
import Behaviour from './Behaviour.js';
import Camera from './Camera.js';
import Canvas from './Components/Canvas.js';
import Vector3 from './Primitives/Vector3.js';
import Size from './Primitives/Size.js';


//User Side Imports;
import Player from './Scripts/Player.js';
import Enemy from './Scripts/Enemy.js';

export default class Designer {
    constructor() {
        this.layouts = new Array();
    }

    addGameObject(layout) {
        this.layouts.push(layout);
    }

    InitializeDesigner() {
        let obj = new GameObject(new Vector3(0, 0, 0))
            .setSprite({
                position: new Vector3(0, 0),
                size: new Size(engine.graphics.width, engine.graphics.height),
                fill: {
                    color: "#1E1E1E"
                }
            })
            .build();
        const camera = new Camera(obj);

        obj = new GameObject(new Vector3(0, 0, 1))
            .setSprite({
                position: new Vector3(0, 0),
                size: new Size(engine.graphics.width, engine.graphics.height),
                fill: {
                    color: "black"
                }
            }).build();
        const background = new Canvas(obj);


        obj = new GameObject(new Vector3(300, 200, 2), "Player", "Player")
            .setSprite({
                position: new Vector3(300, 200),
                size: new Size(50, 150),
                fill: {
                    color: "red"
                }
            })
            .setRigidBody({
                velocity: new Vector3(0, 0),
                position: new Vector3(300, 200),
            })
            .setBoxColider({
                position: new Vector3(300, 200),
                size: new Size(50, 150)
            })
            .build();

        const player = new Player(obj);

        obj = new GameObject(new Vector3(400, 300, 3), "Enemy", "Enemy")
            .setSprite({
                position: new Vector3(400, 300),
                size: new Size(100, 200),
                fill: {
                    color: "yellow"
                }
            })
            .setRigidBody({
                velocity: new Vector3(0, 0),
                position: new Vector3(400, 300)
            })
            .setBoxColider({
                position: new Vector3(400, 300),
                size: new Size(100, 200),
            })
            .build();
        const enemy = new Enemy(obj);

        obj = new GameObject(new Vector3(0, engine.graphics.height - 40, 4))
            .setSprite({
                position: new Vector3(0, engine.graphics.height - 40),
                size: new Size(engine.graphics.width, 40),
                fill: {
                    color: "green"
                }
            })
            .setBoxColider({
                position: new Vector3(0, engine.graphics.height - 40),
                size: new Size(engine.graphics.width, 40)
            })
            .build();
        const ground = new Behaviour(obj);

        this.addGameObject(camera);
        this.addGameObject(background);
        this.addGameObject(player);
        this.addGameObject(enemy);
        this.addGameObject(ground);
        return this;
    }
}

