/**
 * 游戏主函数,初始化整个游戏的精灵
 * Created by Administrator on 2018/11/13 0013.
 * import 导入时的后缀名 .js 在微信小游戏中必须小写，而浏览器不区分大小写
 */
import {ResourcesLoader} from "./js/base/ResourcesLoader.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js"
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";
import {ApiExamples} from "./js/ApiExamples.js";

export class Main {
    constructor() {
        /**使用 this 让这些变量作为整个类的成员变量
         * 这样方便其它地方引用*/
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext("2d");
        this.dateStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourcesLoader.create();
        loader.onLoaded(map=>this.onResourceFirstLoaded(map));
    }

    /**
     * 资源第一次加载完成时调用
     * @param map
     */
    onResourceFirstLoaded(map) {
        /**
         * 资源加载完成后，存储一些永远不变的值,将它们设置为成员变量
         * 比如 ctx、所有的图片资源
         */
        this.dateStore.canvas = this.canvas;
        this.dateStore.ctx = this.ctx;
        this.dateStore.res = map;
        // 在资源加载完成时，播放背景音乐
        this.createBackgroundMusic();
        this.init();
    }

    /**
     * 初始化方法
     */
    init() {
        /**
         * 首先初始化游戏当前是没有结束的
         * 这相当于给 Director 创建了一个成员变量
         * @type {boolean}
         */
        this.director.isGameOver = false;

        /**
         * 放入资源
         */
        this.dateStore.put("background", BackGround);
        this.dateStore.put("land", Land);
        this.dateStore.put("pencils", []);
        this.dateStore.put("birds", Birds);
        this.dateStore.put("score", Score);
        this.dateStore.put("startButton", StartButton);

        this.registerEvent();

        /**在游戏运行之前创建铅笔*/
        this.director.createPencil();
        this.director.run();
    }

    /**
     * 注册事件，主要是用户手指的触摸事件
     * 注意：addEventListener("touchstart" 方式在浏览器中可以使用，
     * 在微信开发中工具中也可以使用，但是在真机上会报错,必须使用微信封装好的 API
     */
    registerEvent() {
        wx.onTouchStart(()=> {
            if (this.director.isGameOver) {
                console.log("游戏开始");
                this.init();
            } else {
                this.director.birdsEvent();
            }
        });

    }

  /**创建背景音乐,如下所示为 微信调用方式*/
  createBackgroundMusic() {
    /**
     * 通过 wx.createInnerAudioContext() 接口可以创建一个音频实例 innerAudioContext
     * 设置 autoplay 和 loop 属性可以自动播放和循环播放音频，一般适用于背景音乐
     * src 可以设置 http(s) 的路径，本地文件路径或者代码包文件路径
     * 特别注意：对于本地音频、视频、图片等资源文件，必须写绝对路径，而不能写"./"或者"../" 等相对路径
     * 如果是相对路径，那么在微信开发者工具中可以正常使用，但是到真机上就不会有任何效果，也不报错，很难排查。
     */
    var bgm = wx.createInnerAudioContext();
    bgm.autoplay = true;
    bgm.loop = true;
    bgm.src = "audios/bgm.mp3";
  }
}
