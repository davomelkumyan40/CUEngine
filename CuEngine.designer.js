import Object from './Components/Object.js';
import { _2d } from '../CuEngine.js';
import Behaviour from './Behaviour.js';

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
        const backgroundBehaviour = new Behaviour();
        backgroundBehaviour.object = new Object()
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


        const playerBehaviour = new Player();
        playerBehaviour.object = new Object()
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

        const enemyBehaviour = new Enemy();
        enemyBehaviour.object = new Object()
            .setSprite({
                position: {
                    x: 400,
                    y: 300
                },
                size: {
                    width: 100,
                    height: 200
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
                    width: 100,
                    height: 200
                }
            })
            .setBoxColider({
                position: {
                    x: 400,
                    y: 300
                },
                size: {
                    width: 100,
                    height: 200
                }
            });

        const groundBehaviour = new Behaviour();
        groundBehaviour.object = new Object()
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

        const ground2Behaviour = new Behaviour();
        ground2Behaviour.object = new Object()
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

        const ground3Behaviour = new Behaviour();
        ground3Behaviour.object = new Object()
            .setSprite({
                position: {
                    x: 0,
                    y: _2d.graphics.height - 500
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
                    y: _2d.graphics.height - 500
                },
                size: {
                    width: _2d.graphics.width - 700,
                    height: 20
                },
            });

        const ground4Behaviour = new Behaviour();
        ground4Behaviour.object = new Object()
            .setSprite({
                position: {
                    x: 200,
                    y: _2d.graphics.height - 200
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
                    x: 200,
                    y: _2d.graphics.height - 200
                },
                size: {
                    width: _2d.graphics.width - 700,
                    height: 20
                },
            });

        this.addLayout(backgroundBehaviour);
        this.addLayout(playerBehaviour);
        this.addLayout(enemyBehaviour);
        this.addLayout(groundBehaviour);
        this.addLayout(ground2Behaviour);
        this.addLayout(ground3Behaviour);
        this.addLayout(ground4Behaviour);
        return this;
    }
}

