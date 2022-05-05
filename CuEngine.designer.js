import GameObject from './Components/GameObject.js';
import { engine } from '../Engine.js';
import Behaviour from './Behaviour.js';
import Camera from './Camera.js';
import Canvas from './Components/Canvas.js';
import Vector3 from './Primitives/Vector3.js';
import Size from './Primitives/Size.js';


//User Side Imports;
import { Dynamic } from './Scripts/Dynamic.js';
import { Kinematic } from './Scripts/Kinematic.js';
import { Static } from './Scripts/Static.js';
import BodyType from './Primitives/BodyType.js';

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


        obj = new GameObject(new Vector3(300, 600, 2), "Dynamic", "Dynamic")
            .setSprite({
                position: new Vector3(300, 600),
                size: new Size(100, 100),
                fill: {
                    color: "red"
                }
            })
            .setRigidBody({
                bodyType: BodyType.dynamic
            })
            .setBoxCollider({
                offset: new Vector3(0, 0),
                size: new Size(100, 100)
            })
            .build();
        const dynamic = new Dynamic(obj);


        obj = new GameObject(new Vector3(400, 600, 3), "Kinematic", "Kinematic")
            .setSprite({
                position: new Vector3(400, 600),
                size: new Size(100, 100),
                fill: {
                    color: "yellow"
                }
            })
            .setRigidBody({
                bodyType: BodyType.kinematic
            })
            .setBoxCollider({
                size: new Size(100, 100),
            })
            .build();
        const kinematic = new Kinematic(obj);




        obj = new GameObject(new Vector3(800, 600, 3), "Static", "Static")
            .setSprite({
                position: new Vector3(800, 600),
                size: new Size(100, 100),
                fill: {
                    color: "blue"
                }
            })
            .setRigidBody({
                bodyType: BodyType.static
            })
            .setBoxCollider({
                size: new Size(100, 100),
            })
            .build();
        const static_ = new Static(obj);




        obj = new GameObject(new Vector3(0, engine.graphics.height - 40, 4))
            .setSprite({
                position: new Vector3(0, engine.graphics.height - 40),
                size: new Size(engine.graphics.width, 40),
                fill: {
                    color: "green"
                }
            })
            .setBoxCollider({
                size: new Size(engine.graphics.width, 40)
            })
            .build();
        const ground = new Behaviour(obj);

        this.addGameObject(camera);
        this.addGameObject(background);
        this.addGameObject(dynamic);
        this.addGameObject(kinematic);
        this.addGameObject(static_);
        this.addGameObject(ground);
        return this;
    }
}

