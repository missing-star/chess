import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Loading from './views/Loading'
import Login from './views/Login'
import StarRoom from './views/StarRoom'
import Arena from './views/Arena'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'loading',
      component: Loading
    },
    {
      path:'/home',
      name:'home',
      component:Home
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/star-room',
      name:'star-room',
      component:StarRoom
    },
    {
      path:'/arena',
      name:'arena',
      component:Arena
    },
    {
      path:'*',
      name:'',
      component:Login
    }
  ]
})
