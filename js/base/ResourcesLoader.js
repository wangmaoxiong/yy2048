/**
 * 资源文件加载器，确保 Cavas 在图片资源加载完成后再进行渲染
 * Created by Administrator on 2018/11/13 0013.
 */

import {Resources} from "./Resources.js";
export class ResourcesLoader {

    constructor() {
        /**this.map 的同时会创建 map 对象
         * Resources 是一个常量数组对象，直接转为 Map 对象*/
        this.map = new Map(Resources);
        console.log("ResourcesLoader 构造器执行...");

        /**创建 Image 对象并设置图片地址，然后放入到 Map 中*/
        for (let [key, value] of this.map) {
            /**微信小游戏创建 Image 方式: var image = wx.createImage()
             * 微信小游戏中也可以使用 new Image 创建
             * */
            const image = wx.createImage();
            image.src = value;
            this.map.set(key, image);
        }
    }

    /**
     * 新建普通的方法-用于加载所有图片资源，必须保证所有资源加载完成才进行 js 渲染
     * @param callback ：回调函数
     */
    onLoaded(callback) {
        let loadedCount = 0;
        for (let value of this.map.values()) {
            /**value 现在就是 Image 对象
             * Image 对象的属性 onload 声明了一个事件句柄函数，当图像装载完毕的时候就会调用这个句柄。
             * 这里使用 ES6 的箭头函数，让里面的 this 指向 ResourcesLoader 对象
             * */
            value.onload = () => {
                loadedCount++;
                if (loadedCount >= this.map.size) {
                    callback(this.map);
                }
            }
        }
    }

    /**使用静态工程模式，static 类似 java,可以使用 类直接 . 访问*/
    static create() {
        return new ResourcesLoader();
    }
}