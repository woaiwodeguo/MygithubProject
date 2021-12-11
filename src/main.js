import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import global from './components/globalComponent.vue';
import dayjs from 'dayjs'

// 挂载dayjs时间解析
Vue.prototype.dayjs=dayjs;

Vue.config.productionTip = false
Vue.use(ElementUI)

// 中央事件总线
Vue.prototype.$bus=new Vue();

// 注册全局过滤器
Vue.filter('currency', (value,key) =>{
  return key + value;
})
Vue.filter('nowTime',value=>{
  return dayjs(value).format('YYYY年MM月DD HH:mm:ss')
})
// 注册全局组件
// Vue.component('global',global);
Vue.component(global.name,global);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
