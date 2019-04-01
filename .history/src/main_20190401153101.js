import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'reset-css'
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper'

Vue.config.productionTip = false
Vue.use(Swiper)
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
