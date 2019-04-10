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
  }
});
router.beforeEach((to,from,next) => {
  next();
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
