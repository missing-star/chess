import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'reset-css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.mixin({
  methods: {
    goBack() {
      this.$router.back(-1);
    }
  }
});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
