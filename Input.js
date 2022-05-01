import { engine } from "./Engine.js";
import Vector3 from "./Primitives/Vector3.js";

export class Input {
    static keys;
    static target;
    static mousePosition = new Vector3();

    static listen(target) {
        Input.target = target;
        Input.keys = {};
        const keyEvent = (e) => {
            e = e || event; // for IE
            Input.keys[e.keyCode] = e.type == 'keydown';
        }
        window.addEventListener("keydown", keyEvent);
        window.addEventListener("keyup", keyEvent);
        target.addEventListener("mousemove", (e) => {
            Input.mousePosition.x = e.clientX;
            Input.mousePosition.y = e.clientY;
        });
    }


    static getKeyDown(keyCode) {
        return Input.keys[keyCode];
    }

    static getKey(keyCode) { //TODO check
        return Input.keys[keyCode];
    }

    static getAxis(axisName) {
        switch (axisName) {
            case "Horizontal":
                return this.getKeyDown(Keys.a) && Vector3.left || this.getKeyDown(Keys.d) && Vector3.right || new Vector3();
            case "Vertical":
                return this.getKeyDown(Keys.w) && Vector3.up || this.getKeyDown(Keys.s) && Vector3.down || new Vector3();
        }
    }
};

export class Keys {
    constructor() {
        throw new Error("You can not create this class instance due it is static");
    }
    static backspace = 8;
    static tab = 9;
    static enter = 13;
    static shift = 16;
    static ctrl = 17;
    static alt = 18;
    static pauseBreak = 19;
    static capsLock = 20;
    static escape = 27;
    static pageUp = 33;
    static space = 32;
    static pageDown = 34;
    static end = 35;
    static home = 36;
    static arrowLeft = 37;
    static arrowUp = 38;
    static arrowRight = 39;
    static arrowDown = 40;
    static printScreen = 44;
    static insert = 45;
    static delete = 46;
    static zero = 48;
    static one = 49;
    static two = 50;
    static tree = 51;
    static four = 52;
    static five = 53;
    static six = 54;
    static seven = 55;
    static eight = 56;
    static nine = 57;
    static a = 65;
    static b = 66;
    static c = 67;
    static d = 68;
    static e = 69;
    static f = 70;
    static g = 71;
    static h = 72;
    static i = 73;
    static j = 74;
    static k = 75;
    static l = 76;
    static m = 77;
    static n = 78;
    static o = 79;
    static p = 80;
    static q = 81;
    static r = 82;
    static s = 83;
    static t = 84;
    static u = 85;
    static v = 86;
    static w = 87;
    static x = 88;
    static y = 89;
    static z = 90;
    static leftWindow = 91;
    static rightWindow = 92;
    static selectKey = 93;
    static numpad_0 = 96;
    static numpad_1 = 97;
    static numpad_2 = 98;
    static numpad_3 = 99;
    static numpad_4 = 100;
    static numpad_5 = 101;
    static numpad_6 = 102;
    static numpad_7 = 103;
    static numpad_8 = 104;
    static numpad_9 = 105;
    static multiply = 106;
    static add = 107;
    static subtract = 109;
    static decimalPoint = 110;
    static divide = 111;
    static f1 = 112;
    static f2 = 113;
    static f3 = 114;
    static f4 = 115;
    static f5 = 116;
    static f6 = 117;
    static f7 = 118;
    static f8 = 119;
    static f9 = 120;
    static f10 = 121;
    static f11 = 122;
    static f12 = 123;
    static numLock = 144;
    static scrollLock = 145;
    static semiColon = 186;
    static equalSign = 187;
    static comma = 188;
    static dash = 189;
    static period = 190;
    static forwardSlash = 191;
    static openBracket = 219;
    static backSlash = 220;
    static closeBraket = 221;
    static singleQuote = 222;
};