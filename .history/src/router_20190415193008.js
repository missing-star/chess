import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import HomeTeacher from './views/HomeTeacher'
import Loading from './views/Loading'
import Login from './views/Login'
import LoginTeacher from './views/LoginTeacher'
import StarRoom from './views/StarRoom'
import Arena from './views/Arena'
import OnlineRace from './views/OnlineRace'
import MyHomework from './views/MyHomeWork'
import SelfStudyRoom from './views/SelfStudyRoom'
import EndgameChallenge from './views/EndgameChallenge'
import CreateChessTable from './views/CreateChessTable'
import CheckHomework from './views/CheckHomework'
import PrivateSchool from './views/PrivateSchool'
import ChiefMansion from './views/ChiefMansion'
import Forbbiden from './views/Forbbiden'
import Test from './views/test'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/test',
      name:'test',
      component:Test,
      params:{
        flag:'stu'
      }
    },
    {
      path: '/',
      name: 'loading',
      component: Loading
    },
    {
      path:'/home',
      name:'home',
      component:Home,
      flag:'stu'
    },
    {
      path:'/home-teacher',
      name:'home-teacher',
      component:HomeTeacher
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/private-school',
      name:'private-school',
      component:PrivateSchool
    },
    {
      path:'/chief-mansion',
      name:'chief-mansion',
      component:ChiefMansion
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
      path:'/check-homework',
      name:'check-homework',
      component:CheckHomework
    },
    {
      path:'/endgame-challenge',
      name:'endgame-challenge',
      component:EndgameChallenge
    },
    {
      path:'/online-race',
      name:'online-race',
      component:OnlineRace
    },
    {
      path:'/create-chess-table',
      name:'create-chess-table',
      component:CreateChessTable
    },
    {
      path:'/self-study-room/:id/',
      name:'self-study-room',
      component:SelfStudyRoom
    },
    {
      path:'/my-homework',
      name:'my-homework',
      component:MyHomework
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
