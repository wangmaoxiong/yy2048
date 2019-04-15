/**
 * 小鸟类
 * 小鸟翅膀向上、翅膀向中间、翅膀向下的三种状态都在同一 张图片上
 * 所以会循环渲染这张图片的三个部分(截切需要的部分进行渲染概念呢？是因为我们的干啥他只会加载。)
 * Created by Administrator on 2018/11/13 0013.
 */
import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Birds extends Sprite {

    constructor() {
        const image = Sprite.getImage("birds");
        super(image, 0, 0, image.width, image.height,
            0, 0, image.width, image.height);

        /**小鸟的三种状态使用一个数组来存储
         * 三种状态截切的起始位置，以及每一个截切的宽与高、
         * 小鸟的宽为34，高为24，上下边距为10，小鸟的左右边距为9,小鸟之间的距离为18
         *
         * clippingX：三只小鸟剪切的左边距X坐标
         * clippingY：三只小鸟剪切的上边距Y坐标
         * clippingWidth：三只小鸟剪切的宽度，即小鸟的宽度
         * clippingHeight：三只小鸟剪切的高度，即小鸟的高度*/

        this.clippingX = [9, 9 + 34 + 18, 9 + 34 + 18 + 34 + 18];
        this.clippingY = [10, 10, 10];
        this.clippingWidth = [34, 34, 34];
        this.clippingHeight = [24, 24, 24];

        /**
         * birdX：小鸟的初始 X 坐标
         * birdY：小鸟的初始 Y 坐标
         * birdsX：三只小鸟的初始 x 坐标
         * birdsY：三只小鸟的初始 y 坐标
         * @type {number}
         */
        const birdX = DataStore.getInstance().canvas.width / 4;
        /**
         * 构造器中使用 this 声明的就相当于 Java 中 public 的成员变量
         * 构造器中使用 var，let,const 声明相当于 Java 中 private 的成员变量(私有，只有在本来中可以访问)
         * @type {number}
         */
        const birdY = DataStore.getInstance().canvas.height / 2;
        this.birdsX = [birdX, birdX, birdX];
        this.birdsY = [birdY, birdY, birdY];

        /**
         * birdWidth：小鸟的宽度
         * birdHeight：小鸟的高度
         * birdsWidth：三只小鸟的宽度
         * birdsHeight：三只小鸟的高度
         * @type {number}
         */
        const birdWidth = 34;
        const birdHeight = 24;
        this.birdsWidth = [birdWidth, birdWidth, birdWidth];
        this.birdsHeight = [birdHeight, birdHeight, birdHeight];

        /**
         * 小鸟的运动其实变化的只是它的 Y 坐标，所以整个活动只需要改变 Y 坐标即可
         * 还有就是切换三只小鸟的状态，以及小鸟碰到铅笔后自由落体运动，所以这里新增几个变量
         * count：用于计数，循环三只小鸟的状态
         * index：表示三只状态小鸟的索引
         * @type {Array}
         */
        this.y = [birdY, birdY, birdY];
        this.index = 0;
        this.count = 0;
        this.time = 0;
    }

    draw() {
        /**
         * 三只小鸟切换的速度
         * @type {number}
         */
        const speed = 0.1;
        this.count = this.count + speed;
        if (this.index >= 2) {
            this.count = 0;
        }

        /**
         * 将索引进行向下取整，相当于一个减速器的作用
         * @type {number}
         */
        this.index = Math.floor(this.count);

        /**
         * 自由落体位移公式：h = 1/2 * g * t * t
         * 重力加速度 g = 9.8 米/秒的平方，为了不让它掉落的太快，重力加速度特意减小
         * offsetUp：为了让小鸟刚开始掉落的时候更加的自然，给它加一个向上运动30像素
         * 而且用户的点击屏幕时，也需要依靠这个值来进行小鸟向上飞行
         */
        const g = 0.98 / 4;//值越大，小鸟下降的越快
        let offsetUp = 30;//值越大，小鸟在用户点击屏幕时上升的越快
        let offsetY = (g * this.time * (this.time - offsetUp)) / 2;
        /**三个状态的小鸟都需要下降
         * 小鸟默认就是自由落体的，随着用户点击屏幕，小鸟才会上升*/
        for (let i = 0; i <= 2; i++) {
            this.birdsY[i] = this.y[i] + offsetY;
        }
        this.time++;

        super.draw(this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]);
    }
}
























