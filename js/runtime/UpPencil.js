/**
 * 顶部铅笔类
 * Created by Administrator on 2018/11/13 0013.
 */
import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";

export class UpPencil extends Pencil {
    constructor(top) {
        const image = Sprite.getImage("pencilUp");
        super(image, top);
    }

    draw() {
        this.y = this.top - this.height;
        super.draw();
    }

}