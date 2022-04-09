export default class Input {
    constructor() {
        this.currentKey = '';
        this.currentKeyPressed = '';
        this.keyDown = false;
        this.keyup = true;
        this.keypress = false;
    }

    static listen() {
        window.addEventListener("keydown", (event) => {
            this.currentKey = event.key === " " ? "space" : event.key;
            this.keyDown = true;
            this.keyup = false;
        });
        window.addEventListener("keyup", (event) => {
            const k = event.key === " " ? "space" : event.key;
            if (this.currentKey === k) {
                this.currentKey = "";
                this.keyup = true;
                this.keyDown = false;
            }
        });
        //TODO Fix
        window.addEventListener("keypress", (event) => {
            console.log(event.key);
            this.currentKeyPressed = event.key === " " ? "space" : event.key;
            this.keypress = true;
        });
    }

    static getKeyDown(key) {
        if (key === this.currentKey && this.keyDown)
            return true;
        return false;
    }

    static getKey(key) {
        if (key === this.currentKeyPressed && this.keypress) {
            this.currentKeyPressed = '';
            this.keypress = false;
            return true;
        }
        return false;
    }
}