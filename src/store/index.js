import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//从指定目录中读取所有的模块 
const modules = require.context("./modules", true, /\.(js|ts)$/);
//获取所有的文件名称，并且将名称作为key和module进行匹配
const moduleList = modules.keys().reduce((target, filePath)=>{
    //题目文件的名称
    const fileName = filePath.replace(/\.\/(\w+)\.(js|ts)/, "$1");
    //将文件名称和对应导出的模块进行绑定
    target[fileName] = modules(filePath).default; 
    return target;
}, {});

export default new Vuex.Store({
  modules: {
    ...moduleList
  }
})
