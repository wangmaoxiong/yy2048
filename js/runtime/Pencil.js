/**
 * 上下铅笔的基类
 * Created by Administrator on 2018/11/17 0017.
 */
import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Pencil extends Sprite {
    /**
     * @param image ：资源图片
     * @param top ：上下两支铅笔顶部距离屏幕顶部的距离，上铅笔为负值，下铅笔为正值
     */
    constructor(image, top) {
        super(image,
            0, 0,
            image.width, image.height,
            /**图片默认在右侧看不见的位置,这两个值都会进行不断变化*/
            DataStore.getInstance().canvas.width, 0,
            image.width, image.height);
        /**
         * 成员变量，top 表示上铅笔的笔尖距离屏幕顶部的距离
         */
        this.top = top;

        /**铅笔移动的速度，单位像素*/
        this.moveSpeed = 2;
    }

    draw() {
        this.x = this.x - this.moveSpeed;
        super.draw(this.img,
            0, 0,
            this.srcW, this.srcH,
            this.x, this.y,
            this.width, this.height
        );
    }
}

