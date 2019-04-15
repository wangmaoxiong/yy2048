/**
 * 计分器类
 * Created by Administrator on 2018/11/13 0013.
 */

import {DataStore} from "../base/DataStore.js";

export class Score {

    constructor() {
        /**
         * ctx ：画布上下文环境
         * scoreNumber：分数，默认为0
         * isScore：因为 Canvas 刷新频率 60帧每秒，当小鸟越过一支铅笔到下一支铅笔之间时，
         * 默认会连续加分，这是不对的，所以使用 isScore 来作为能否加分的标志
         */
        this.ctx = DataStore.getInstance().ctx;
        this.scoreNumber = 0;
        this.isScore = true;
    }

    /**
     * 绘制得分
     * 这些绘制文本都是前端 Canvas 的方法和属性
     */
    draw() {
        this.ctx.font = "25px Arial";
        this.ctx.fillStyle = "#f00";
        this.ctx.fillText("媛媛："+this.scoreNumber,
            DataStore.getInstance().canvas.width / 4,
            DataStore.getInstance().canvas.height / 18,
            DataStore.getInstance().canvas.width / 2);
    }
}
