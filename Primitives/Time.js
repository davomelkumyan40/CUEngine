export default class Time {
    constructor() {
        this.t = new Date();
    }
    get deltaTime() {
        return (new Date() - this.t) / 1000;
    }

    static d = (new Date() - this.t) / 1000;

    get milliseconds() {
        return this.t.getTime();
    }

    get seconds() {
        return this.t.getSeconds();
    }

    get minutes() {
        return this.t.getSeconds();
    }

    get hours() {
        return this.t.getHours();
    }

    reset() {
        this.t = new Date();
    }
}