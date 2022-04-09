export default class _2DPhysics {
    constructor(objects) {
        this.calculationInterval = 0.02; // by default in unity also
        this.objects = objects;
        this.fixedUpdate = undefined;
    }

    calculate() {
        setInterval(() => {
            this.fixedUpdate();
            this.objects.forEach(o => {
                o.fixedUpdate();
            });
        }, this.calculationInterval * 1000);
    }
}