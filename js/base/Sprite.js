/**
 * 精灵的基础类，负责初始化精灵加载的资源和大小以及位置
 * Created by Administrator on 2018/11/13 0013.
 */
import {DataStore} from "./DataStore.js"

export class Sprite {
    /**
     * 为构造器参数设置默认值
     * img：加载好的图片资源 Image
     * srcX、srcY：图片截切的起始位置
     * srcW、srcH：图片剪切的宽与高
     * x、y：画布上防止图片的起始位置
     * width、height：画布上图片放置的长与高
     * @param ctx
     */
    constructor(img = null,
                srcX = 0,
                srcY = 0,
                srcW = 0,
                srcH = 0,
                x = 0, y = 0,
                width = 0, height = 0) {

        /** 将参数赋值到类的成员变量上*/
        this.dataStore = DataStore.getInstance();
        this.ctx = this.dataStore.ctx;
        this.img = img;
        this.srcX = srcX;
        this.srcY = srcY;
        this.srcW = srcW;
        this.srcH = srcH;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    static getImage(key) {
        return DataStore.getInstance().res.get(key);
    }

    /**
     * 这样做的好处是子类可以自己传入自己的值，当子类没有传入时，则使用这些初始值
     * img 传入Image对象
     * srcX 要剪裁的起始X坐标
     * srcY 要剪裁的起始Y坐标
     * srcW 剪裁的宽度
     * srcH 剪裁的高度
     * x 放置的x坐标
     * y 放置的y坐标
     * width 要使用的宽度
     * height 要使用的高度
     */
    draw(img = this.img,
         srcX = this.srcX,
         srcY = this.srcY,
         srcW = this.srcW,
         srcH = this.srcH,
         x = this.x,
         y = this.y,
         width = this.width,
         height = this.height) {

        this.ctx.drawImage(
            img,
            srcX,
            srcY,
            srcW,
            srcH,
            x,
            y,
            width,
            height
        );
    }
}