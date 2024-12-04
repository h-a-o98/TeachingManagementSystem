import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import getData from "./network/index";
import "../elements.js";
import "./assets/fonts/iconfont.css";
import {Message} from 'element-ui'

import _ from "lodash";
//data:数据源，type:分组的依据，value:分组后的key值，datas:分组后的value值，是一个数组
function setData(data, type, value, datas) {
    let arr = [];
    value = value || "value";
    //分组后的key值不传默认为value，分组后的value值不传默认为children
    datas = datas || "children";
    for (let key in _.groupBy(data, type)) {
        arr.push({
            [value]: key,
            [datas]: _.groupBy(data, type)[key],
        });
    }
    return arr;
}
Vue.prototype.$setData = setData;

Vue.config.productionTip = false
//全局挂载
Vue.prototype.$axios = getData;
// 全局注册message
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
