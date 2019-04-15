/**
 * 陆地类
 * Created by Administrator on 2018/11/13 0013.
 */
import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";
import {DataStore} from "../base/DataStore.js";

export class Land extends Sprite {
    constructor() {
        const image = Sprite.getImage("land");
        super(image, 0, 0,
            image.width, image.height,
            0, DataStore.getInstance().canvas.height - image.height,
            image.width, image.height);

        /**陆地水平变化的坐标*/
        this.landX = 0;
        /**陆地移动的速度，单位 像素*/
        this.landSpeed = Director.getInstance().moveSpeed;
    }

    /**重写父类的 draw 方法*/
    draw() {
        this.landX = this.landX + this.landSpeed;

        /**
         * 当图片在左移的过程中，如果右侧即将移动完毕，则重新进行移动
         * 这里的关键是图片的长度必须必屏幕的宽度的要长，否则失败
         */
        if (this.landX > (this.img.width - DataStore.getInstance().canvas.width)) {
            this.landX = 0;
        }

        super.draw(this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            -this.landX,
            this.y,
            this.width, this.height);
    }
}
