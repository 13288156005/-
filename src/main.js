import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入清除默认样式
import '@/assets/base.css'
// 引入头部和脚部样式
import '@/assets/header&footer.css'
//引入swiper轮播图样式
import 'swiper/css/swiper.css'

//引入
import moment from 'moment';
//挂载到原型
Vue.prototype.$moment = moment;
//汉化，否则显示日期格式是国外的日期格式
moment.locale("zh-CN")



//引入elm组件
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element, { size: 'small', zIndex: 3000 });





Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')