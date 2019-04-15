/**
 * 变量缓存器，方便在各个类中访问和修改变量
 * Created by Administrator on 2018/11/13 0013.
 */
export class DataStore {

    /**
     * 一个应用只有一个 DataStore，使用单例模式
     * @returns {*}
     */
    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    /**
     * 对于将来需要实时创建和销毁的变量才放在 Map 中来
     * 如 陆地，铅笔，小鸟等
     */
    constructor() {
        console.log("DataStore 构造器执行...");
        this.map = new Map();
    }

    put(key, value) {
        /**
         * JS 中类也是 function 类型
         */
        if (typeof value === "function") {
            value = new value();
        }
        this.map.set(key, value);
        return this;
    }

    /**key 不存在时，返回 undefined */
    get(key) {
        return this.map.get(key);
    }

    /**
     * 销毁所有的精灵变量，释放内存
     */
    destory() {
        for (let vlaue of this.map.values()) {
            vlaue = null;
        }
    }
}
