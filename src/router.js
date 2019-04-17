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
      meta:{
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
      meta:{
        flag:'stu'
      }
    },
    {
      path:'/home-teacher',
      name:'home-teacher',
      component:HomeTeacher,
      meta:{
        flag:'tea'
      }
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/private-school',
      name:'private-school-teacher',
      component:PrivateSchool,
      meta:{
        flag:'tea'
      }
    },
    {
      path:'/chief-mansion',
      name:'chief-mansion',
      component:ChiefMansion,
      meta:{
        flag:'tea'
      }
    },
    {
      path:'/login-teacher',
      name:'login-teacher',
      component:LoginTeacher
    },
    {
      path:'/star-room',
      name:'star-room',
      component:StarRoom,
      meta:{
        flag:'stu'
      }
    },
    {
      path:'/arena',
      name:'arena',
      component:Arena,
      meta:{
        flag:'stu'
      }
    },
    {
      path:'/check-homework',
      name:'check-homework',
      component:CheckHomework,
      meta:{
        flag:'tea'
      }
    },
    {
      path:'/endgame-challenge',
      name:'endgame-challenge',
      component:EndgameChallenge,
      meta:{
        flag:'stu'
      }
    },
    {
      path:'/online-race',
      name:'online-race',
      component:OnlineRace,
      meta:{
        flag:'stu'
      }
    },
    {
      path:'/create-chess-table',
      name:'create-chess-table',
      component:CreateChessTable,
      meta:{
        flag:'tea'
      }
    },
    {
      path:'/self-study-room/:id/',
      name:'self-study-room',
      component:SelfStudyRoom,
      meta:{
        flag:'stu'
      }
    },
    {
      path:'/my-homework',
      name:'my-homework',
      component:MyHomework,
      meta:{
        flag:'stu'
      }
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
