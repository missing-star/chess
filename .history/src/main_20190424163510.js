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
      const month = parseInt(date.getMonth() + 1) > 9 ? parseInt(date.getMonth() + 1) : '0' + parseInt(date.getMonth() + 1);
      const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
      const minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
      const second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
      return `${date.getFullYear()}/${month}/${day}  ${hour}:${minute}:${second}`;
    },
    filterImg(src) {
      return `${process.env.VUE_APP_URL}${src}`;
    }
  }
});
router.beforeEach((to,from,next) => {
  if(from.path == '/online-race') {
    console.log('结束')
    //清空游戏状态
    destroyGame();
  }
  if(process.env.NODE_ENV == 'development') {
    next();
    return;
  }
  if(!to.meta.flag) {
    next();
  }
  else {
    axios({
      url:`${process.env.VUE_APP_URL}index.php?r=api/if-login`
    }).then((res) => {
      if(res.data.status == 1) {
        if(to.meta.flag == 'stu') {
          if(res.data.data == 'teacher') {
            router.push({name:'login'});
            return;
          }
        }
        else {
          if(res.data.data == 'student') {
            router.push({name:'login-teacher'});
            return;
          }
        }
        next();
      }
      else {
        router.push({name:'login'});
      }
    }).catch((err) => {
  
    });
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
