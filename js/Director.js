/**
 * 导演类，控制游戏的逻辑
 * Created by Administrator on 2018/11/13 0013.
 */
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    constructor() {
        console.log("Director 构造器执行...");
        this.dataStore = DataStore.getInstance();
        /**
         * moveSpeed：陆地和铅笔移动的速度，单位像素，值越大运动的越快
         * @type {number}
         */
        this.moveSpeed = 2;
    }

    /**
     * 如同 java 的静态工程模式创建单例一样，一个游戏应该只有一个导演的，所以这里也是如此
     * @returns {*}
     */
    static getInstance() {
        /**
         * 直接创建成员变量 instance
         * 第一次时 instance 为 undefined,而 !undefined 就会等于 true
         * 只要 instance 有值，if 都会作为 true 处理
         */
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    //创建铅笔，每次创建上下一组铅笔
    createPencil() {
        /**
         * 注意事项：微信小游戏开发中，window API 在浏览器可以使用，
         * 在微信开发中工具也能识别，但是到了真机上时会报错，说未定义
         * @type {number}
         */
        //const minTop = window.innerHeight / 8;
        const minTop = DataStore.getInstance().canvas.height / 8;
        //const maxTop = window.innerHeight / 2;
        const maxTop = DataStore.getInstance().canvas.height / 2;
        const top = minTop + Math.random() * (maxTop - minTop);

        this.dataStore.get("pencils").push(new UpPencil(top));
        this.dataStore.get("pencils").push(new DownPencil(top));
    }

  /**
   * 整个画布的所有内容在这里进行帧动画渲染绘制
   */
    run() {
        this.check();

        /**
         * 当游戏没有结束时，才进行渲染绘图，否则停止动画，并清空精灵
         */
        if (!this.isGameOver) {
            this.dataStore.get("background").draw();

            /**
             * 获取铅笔数组，注意屏幕内同时最多出现 4 只铅笔，分为上下的两组，铅笔数组中只保持4个铅笔
             * 第一只和第二只为一组，第三只和第四只为一组
             * @type {*|V}
             */
            const pencils = this.dataStore.get("pencils");

            /**
             * 当第一组铅笔的 x 坐标已经移动到屏幕宽度的减去铅笔宽度的一半事，如果此时屏幕只有一组铅笔
             * 则再创建一组铅笔从右侧开始运动过来
             */
            if (pencils[0].x < (DataStore.getInstance().canvas.width - pencils[0].width) / 2 && pencils.length === 2) {
                this.createPencil();
            }

            /**
             * 当第一组铅笔运动到屏幕左侧看不到的地方时，而且此时铅笔已经有两组了，则删除第一组,如此循环往复
             * 此时还需要做的一个操作是将 加分器的标识再次设置为 true，便于下次越过铅笔时进行加分
             */
            if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
                pencils.shift();
                pencils.shift();
                this.dataStore.get("score").isScore = true;
            }

            /**
             * 先绘制铅笔，再绘制陆地，这样陆地就会盖住铅笔的一部分
             * Canvas 以绘图的先后顺序进行图层叠加
             */
            this.dataStore.get("pencils").forEach(function (value) {
                value.draw();
            });

            this.dataStore.get("land").draw();
            this.dataStore.get("score").draw();
            this.dataStore.get("birds").draw();

            let timer = requestAnimationFrame(()=>this.run());
            this.dataStore.put("timer", timer);
        } else {
            console.log("游戏结束.");
            //微信小游戏中画布上的内容只能一次性绘制，无法再原来的基础上进行叠加绘制，否则会花屏
          // this.dataStore.get("startButton").draw();
            cancelAnimationFrame(this.dataStore.get("timer"));
            /**释放资源*/
            this.dataStore.destory();
          // 加快触发 JavaScriptCore 垃圾回收（Garbage Collection）
            wx.triggerGC();
        }
    }

    /**
     * 用户点击屏幕后，小鸟向上飞行的事件
     */
    birdsEvent() {
        for (let i = 0; i <= 2; i++) {
            this.dataStore.get("birds").y[i] = this.dataStore.get("birds").birdsY[i];
        }
        /**将时间置0，让其重新开始自由落体*/
        this.dataStore.get("birds").time = 0;
    }

    /**
     * 判断小鸟是否撞击了地面或者铅笔
     */
    check() {
        const birds = this.dataStore.get("birds");
        const land = this.dataStore.get("land");
        const pencils = this.dataStore.get("pencils");
        const score = this.dataStore.get("score");

      if(score.scoreNumber>20 && score.scoreNumber<=50){
        for(let i=0;i<pencils.length;i++)
          pencils[i].moveSpeed = 2.5;
      } else if (score.scoreNumber > 30 ) {
        for (let i = 0; i < pencils.length; i++)
          pencils[i].moveSpeed = 3;
      } 

        if (birds.birdsY[0] + birds.birdsHeight[0] > land.y) {
            console.log("小鸟撞击了地板.");
          /**微信长震动API为vibrateLong，短震动为vibrateShort，经过实测短震动在真机上基本无感，长震动才行*/
          wx.vibrateLong({
            success: function () {
              console.log("震动.");
            }
          });

            this.isGameOver = true;
            return;
        }

        /**小鸟的边框模型*/
        const birdsBorder = {
            "top": birds.birdsY[0],
            "bottom": birds.birdsY[0] + birds.birdsHeight[0],
            "left": birds.birdsX[0],
            "right": birds.birdsX[0] + birds.birdsWidth[0]
        };

        /**
         * 为所有的铅笔建模，循环判断是否撞击了其中任意一只铅笔
         */
        const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                "top": pencil.y,
                "bottom": pencil.y + pencil.height,
                "left": pencil.x + pencil.width / 2,
                "right": pencil.x + pencil.width / 2
            };

            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log("撞击了铅笔.");

              /**微信长震动API，短震动为vibrateShort，经过实测短震动在真机上基本无感*/
              wx.vibrateLong({
                success: function () {
                  console.log("震动.");
                }
              });

                this.isGameOver = true;
                return;
            }
        }


        /**加分逻辑*/
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width
            && score.isScore) {
            score.isScore = false;
            score.scoreNumber++;
        }
    }

    /**
     * 判断小鸟是否撞击了任何一支铅笔，判断的依据如下：
     * 1、如果小鸟的顶部大于铅笔(上下)的底部，则认为是安全的
     * 2、如果小鸟的底部小于铅笔(上下)的顶部，则认为是安全的
     * 3、如果小鸟的右侧小于铅笔(上下)的左侧，则认为是安全的
     * 4、如果小鸟的左测大于铅笔(上下)的右侧，则认为是安全的
     * 除了上述四种情况之外，则认为小鸟撞击了铅笔，游戏失败
     */
    static isStrike(bird, pencil) {
        let result = false;
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.right < pencil.left ||
            bird.left > pencil.right) {
            result = true;
        }
        return !result;
    }

}






















