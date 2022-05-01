import CuEngine from './Engine/CuEngine.js';
import Designer from './CuEngine.designer.js';
import { Input } from './Input.js';

export const engine = new CuEngine({ height: 1080, width: 1920 });
export const designer = new Designer().InitializeDesigner();
Input.listen(engine.graphics.brush);
engine.start();

