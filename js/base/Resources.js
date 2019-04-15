/**
 * 资源文件
 * ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";
 * 一个模块就是一个独立的文件。该文件内部的所有变量和方法，外部无法获取。如果希望外部能够读取模块内部的某个变量，就必须使用 export 关键字进行输出
 * 可以参考：http://es6.ruanyifeng.com/#docs/module
 * export 可以使用在 class 类上，也可以是 变量或者方法上
 * 
 * 特别注意：对于本地音频、视频、图片等资源文件，必须写绝对路径，而不能写"./"或者"../" 等相对路径
 * 如果是相对路径，那么在微信开发者工具中可以正常使用，但是到真机上就不会有任何效果，也不报错，很难排查。
 */
export const Resources = [
    ['background', 'res/background.png'],
    ['land', 'res/land.png'],
    ['pencilUp', 'res/pie_up.png'],
    ['pencilDown', 'res/pie_down.png'],
    ['birds', 'res/birds.png'],
    ['startButton', 'res/start_button.png']
];