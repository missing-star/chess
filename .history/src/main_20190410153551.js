import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'reset-css'
import 'swiper/dist/css/swiper.min.css'

import axios from "axios"//引入axios插件
import qs from 'qs'


// 将axios插件赋值到vue原型上
Vue.prototype.$axios=axios;
Vue.prototype.qs = qs   

Vue.config.productionTip = false
Vue.mixin({
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    testIE() {
      if(navigator.userAgent.includes('Trident')) {
        return true;
      }
      return false;
    }
  },
  filters:{
    filterTime(timeStamp) {
      const date = new Date(timeStamp*1000)
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + date.getMonth() + 1;
      const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
      const minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
      const second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
      return `${date.getFullYear()}/${month}/${day}  ${hour}:${minute}:${second}`;
    }
  }
});
router.beforeEach((to,from,next) => {
  next();
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')