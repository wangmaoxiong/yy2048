/**
 * 背景类 继承精灵类 Sprite
 * Created by Administrator on 2018/11/13 0013.
 */

import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class BackGround extends Sprite {
    /**
     * 背景以整个屏幕的尺寸
     * @param ctx
     * @param image
     */
    constructor() {
        /**
         * super 方法之前不能访问本来成员变量
         */
        const image = Sprite.getImage("background");
        super(image,
            0, 0,
            image.width, image.height,
            0, 0,
            DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height);
    }
}