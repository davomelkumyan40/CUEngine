import Random from "./Random.js"

export default class Guid {
    static #lts = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    static create() {
        let guid = "";
        for (let i = 0; i < 4; i++) {
            guid += Guid.guidChunk(5);
        }
        return guid.slice(0, guid.length - 1);
    }

    static guidChunk(count) {
        let chunk = "";
        for (let i = 0; i < count; i++) {
            let rl = Guid.#lts[Random.next(0, Guid.#lts.length)];
            chunk += `${rl}`;
        }
        return chunk + "-";
    }
}