import _2D from './Engine/_2D.js';
import Designer from './engine.designer.js';

function update() {
    designer.layouts.forEach((l) => {
        l.update();
    });
}

function fixedUpdate() {
    designer.layouts.forEach((l) => {
        l.fixedUpdate();
    });
}

export const _2d = new _2D({ height: 1024, width: 1024, update, fixedUpdate });
const designer = new Designer().InitializeDesigner();
_2d.generate();
