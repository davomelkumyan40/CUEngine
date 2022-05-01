export default class Random {
    static next(min, max) {
        if (min && max || min === 0 && max)
            return Math.floor(Math.random() * (max - min + 1)) + min;
        return Math.floor(Math.random() * 9) + 1;
    }
}