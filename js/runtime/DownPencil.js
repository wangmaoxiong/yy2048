/**
 * 底部铅笔
 * Created by Administrator on 2018/11/13 0013.
 */
import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class DownPencil extends Pencil {
    constructor(top) {
        const image = Sprite.getImage("pencilDown");
        super(image, top);
    }

    draw() {
        /**
         * gap 两支铅笔之间的距离，值越小，距离越近
         * @type {number}
         */
        let gap = DataStore.getInstance().canvas.height / 5;
        this.y = this.top + gap;
        super.draw();
    }
}