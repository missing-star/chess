import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import HomeTeacher from './views/HomeTeacher'
import Loading from './views/Loading'
import Login from './views/Login'
import LoginTeacher from './views/LoginTeacher'
import StarRoom from './views/StarRoom'
import Arena from './views/Arena'
import Forbbiden from './views/Forbbiden'
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
      path:'/home-teacher',
      name:'/home-teacher',
      component:HomeTeacher
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/login-teacher',
      name:'login-teacher',
      component:LoginTeacher
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
      path:'/forbbiden',
      name:'forbbiden',
      component:Forbbiden
    },
    {
      path:'*',
      name:'',
      component:Login
    }
  ]
})
