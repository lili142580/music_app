import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入全局初始化样式
import './assets/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
    router,
    store,
  render: h => h(App),
}).$mount('#app')
