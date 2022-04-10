import _2D from './Engine/_2D.js';
import Designer from './CuEngine.designer.js';
import { Input } from './Input.js';

export const _2d = new _2D({ height: 1080, width: 1920, update, fixedUpdate });
export const designer = new Designer().InitializeDesigner();
Input.listen();
_2d.generate();

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
