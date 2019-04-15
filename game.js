/**使用 export 命令定义了模块的对外接口以后，其他 JS 文件就可以通过 import 命令加载这个模块
 * import 命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块对外接口的名称相同。
 * 可以参考：http://es6.ruanyifeng.com/#docs/module
 * from 后面表示引用的 js 模块文件，后缀名 .js 要写上
 * */
import {Main} from "./Main.js"

new Main();
