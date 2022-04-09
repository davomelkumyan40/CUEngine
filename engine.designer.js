import Object from './Components/Object.js';
import { _2d } from '../engine.js';
import Behavior from './Behavior.js';

//User Side Imports;
import Player from './Scripts/Player.js';
import Enemy from './Scripts/Enemy.js';

export default class Designer {
    constructor() {
        this.layouts = new Array();
    }

    addLayout(layout) {
        this.layouts.push(layout);
    }

    InitializeDesigner() {
        const backgroundBehavior = new Behavior();
        backgroundBehavior.object = new Object()
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
                    color: "black"
                }
            });


        const playerBehavior = new Player();
        playerBehavior.object = new Object()
            .setSprite({
                position: {
                    x: 300,
                    y: 200
                },
                size: {
                    width: 50,
                    height: 150
                },
                fill: {
                    color: "red"
                }
            })
            .setRigidBody({
                velocity: {
                    x: 0,
                    y: 0
                },
                position: {
                    x: 300,
                    y: 200
                },
                size: {
                    width: 50,
                    height: 150
                }
            })
            .setBoxColider({
                position: {
                    x: 300,
                    y: 200
                },
                size: {
                    width: 50,
                    height: 150
                }
            });

        const enemyBehavior = new Enemy();
        enemyBehavior.object = new Object()
            .setSprite({
                position: {
                    x: 400,
                    y: 300
                },
                size: {
                    width: 50,
                    height: 150
                },
                fill: {
                    color: "yellow"
                }
            })
            .setRigidBody({
                velocity: {
                    x: 0,
                    y: 0
                },
                position: {
                    x: 400,
                    y: 300
                },
                size: {
                    width: 50,
                    height: 150
                }
            })
            .setBoxColider({
                position: {
                    x: 400,
                    y: 300
                },
                size: {
                    width: 50,
                    height: 150
                }
            });

        const groundBehavior = new Behavior();
        groundBehavior.object = new Object()
            .setSprite({
                position: {
                    x: 0,
                    y: _2d.graphics.height - 40
                },
                size: {
                    width: _2d.graphics.width,
                    height: 40
                },
                fill: {
                    color: "green"
                }
            })
            .setBoxColider({
                position: {
                    x: 0,
                    y: _2d.graphics.height - 40
                },
                size: {
                    width: _2d.graphics.width,
                    height: 40
                }
            });

        const ground2Behavior = new Behavior();
        ground2Behavior.object = new Object()
            .setSprite({
                position: {
                    x: 700,
                    y: _2d.graphics.height - 300
                },
                size: {
                    width: _2d.graphics.width - 700,
                    height: 20
                },
                fill: {
                    color: "green"
                }
            })
            .setBoxColider({
                position: {
                    x: 700,
                    y: _2d.graphics.height - 300
                },
                size: {
                    width: _2d.graphics.width - 700,
                    height: 20
                },
            });

        const ground3Behavior = new Behavior();
        ground3Behavior.object = new Object()
            .setSprite({
                position: {
                    x: 0,
                    y: _2d.graphics.height - 300
                },
                size: {
                    width: _2d.graphics.width - 700,
                    height: 20
                },
                fill: {
                    color: "green"
                }
            })
            .setBoxColider({
                position: {
                    x: 0,
                    y: _2d.graphics.height - 300
                },
                size: {
                    width: _2d.graphics.width - 700,
                    height: 20
                },
            });

        this.addLayout(backgroundBehavior);
        this.addLayout(playerBehavior);
        this.addLayout(enemyBehavior);
        this.addLayout(groundBehavior);
        this.addLayout(ground2Behavior);
        this.addLayout(ground3Behavior);
        return this;
    }
}

