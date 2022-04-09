export default class _2DGraphics {
    constructor(height, width, update) {
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        this.context = canvas.getContext('2d');
        canvas.height = height;
        canvas.width = width;
        this.height = height;
        this.width = width;
        this.time = new Date();
        this.vsync = true;
        this.fps = 60;
        this.update = undefined;
        this.fpsInterval = 1000 / this.fps;
        this.update = undefined;
        this.objects = undefined;
    }

    render() {
        if (!this.update)
            throw new Error("It is necessary to call 'set update property'");
        window.requestAnimationFrame(this.render.bind(this));
        const now = new Date();
        const elapsed = now - this.time;
        if (this.vsync) {
            if (elapsed > this.fpsInterval) {
                this.time = now - (elapsed % this.fpsInterval);
                this.objects.forEach((o) => {
                    o.update();
                });
                this.update();
            }
        }
        else {
            this.update();
            this.objects.forEach((o) => {
                o.update();
            });
        }
    }
}