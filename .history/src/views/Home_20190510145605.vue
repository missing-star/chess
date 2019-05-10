<template>
  <div class="chess-home">
    <!-- 白云container -->
    <div class="cloud-wrapper">
      <img v-for="(img,index) in cloudList" :src="img" :key="index" :style="getStyle(index)" class="cloud-icon">
    </div>
    <div class="cloud-wrapper reverse">
      <img v-for="(img,index) in cloudList" :src="img" :key="index" :style="getStyle(index,true)"
        class="cloud-icon reverse">
    </div>
    <div class="bird-wrapper">
      <div class="bird-item" v-for="n in 5" :key="n"></div>
    </div>
    <!-- 背景音乐 -->
    <audio ref="audio" id="audio-music" loop>
      <source src="../assets/audio/bg.mp3">
    </audio>
    <!-- 用户信息 -->
    <div class="user-info-wrapper">
      <img :src="userLogo" class="user-logo">
      <div class="user-info-wrapper-bg">

      </div>
      <p class="user-nickname">{{studentInfo.nickname}}</p>
    </div>
    <!-- 信件 -->
    <div class="mail-wrapper pointer" @click="openMailPanel">
    </div>
    <!-- 积分 -->
    <div class="integral-wrapper">
      <p class="my-integral">100</p>
    </div>
    <!-- 经验值 -->
    <div class="exp-wrapper">
      <p class="my-exp">100</p>
    </div>
    <!-- 每日任务 -->
    <div class="daily-task-wrapper">
      <div class="daily-task-bg">
        <div class="daily-task">

        </div>
      </div>
    </div>
    <!-- 日常任务 -->
    <!-- <div class="daily-task-wrapper">
      <div @click="triggerTask" class="pack-up-btn">
        <p class="title">{{taskTitle}}</p>
        <img src="../assets/images/arrow-right.png" class="arrow-right" :class="{rotate:!isShowTaskPanel}">
      </div>
      <ul class="daily-task-category-wrapper" :class="{hide:!isShowTaskPanel}">
        <li @click="openTaskPanel" class="daily-task-category-item main-category">日常任务( 0 / 2 )</li>
        <li class="daily-task-category-item">闯关 ( {{day_job}} / 3)</li>
        <li class="daily-task-category-item">在线对战 ( {{pass_log}} / 4)</li>
      </ul>
    </div> -->
    <chess-task-panel :is-show="showTaskPanel" @hide="hideTaskPanel"></chess-task-panel>
    <!-- 自习室、将星阁等 -->
    <div class="room-container">
      <div @click="openLink(item.url)" class="room-item" :class="item.id" :key="index" v-for="(item,index) in roomList">
        <img class="room-item-icon" :src="item.icon" :alt="item.name">
        <template v-if="item.logo">
          <img :src="item.logo" style="width:15%;position:absolute;bottom:-10%;right:40%;">
        </template>
      </div>
    </div>

    <!-- 我的信件 -->
    <chess-mail-box @hide="hideMailPanel" :isShow="showMailPanel" @open-tips-detail="openTipsPanel"
      @num-length="numLength"></chess-mail-box>
    <!-- 公告栏 -->
    <div class="notice-container" @click="openNoticePanel">
      <img src="../assets/images/bulletin-board.png" alt="公告栏">
    </div>
    <chess-notice-panel @hide="hideNoticePanel" :isShow="showNoticePanel" @open-notice-detail="openNoticeDetailPanel">
    </chess-notice-panel>
    <!-- 设置弹框 -->
    <chess-set-panel @hide="hideSetPanel" @control-bgm="controlBgm" @login-out="loginOut" :isShow="showSetPanel"
      @change-volume="changeVolume" :studentInfo="studentInfo" @change-logo="changeLogo"></chess-set-panel>
    <!-- 设置按钮 -->
    <chess-set-btn @game-set="gameSet"></chess-set-btn>
    <!-- 小象 -->
    <img @click="openPetPanel" src="../assets/images/elephant.png" class="elephant">
    <!-- 我的宠物 -->
    <chess-pet-panel :is-show="showPetPanel" @hide="hidePetPanel" :petInfo="petInfo" @getOperation="getOperation">
    </chess-pet-panel>
    <!-- 棋社 -->
    <chess-com-panel @open-homework="openHomeworkPanel" @open-ach="openAchievePanel" @open-log="openGrowthLogPanel"
      @open-self="openSelfStudyPanel" @hide="hideChessComPanel" :is-show="showChessComPanel" :information="information">
    </chess-com-panel>
    <!-- 成长日志 -->
    <chess-growth-panel @hide="hideGrowthLogPanel" :is-show="showGrowthLogPanel" :growthLog="growthLog">
    </chess-growth-panel>
    <!-- 老师列表 -->
    <chess-teacher-list-panel @hide="hideTeacherListPanel" :is-show="showTeacherPanel"></chess-teacher-list-panel>
    <!-- 信件详情 -->
    <chess-tips-panel @hide="hideTipsPanel" :is-show="showTipsPanel" :maildetail="maildetail"></chess-tips-panel>
    <!-- 作业框 -->
    <chess-homework-panel @hide="hideHomeworkPanel" :is-show="showHomeworkPanel" :workList1="workList1"
      :workList2="workList2"></chess-homework-panel>
    <!-- 我的成就 -->
    <chess-achieve-panel :is-show="showAchievePanel" @hide="hideAchievePanel"></chess-achieve-panel>
    <!-- 自习室弹窗 -->
    <chess-self-study-panel :is-show="showSelfStudyPanel" @hide="hideSelfStudeyPanel" :game-list1="gameList1"
      :game-list2="gameList2" :game-list3="gameList3" @open-study-stage-panel="openStudyStagePanel">
    </chess-self-study-panel>
    <!-- 自习室阶段弹窗 -->
    <chess-self-study-stage-panel :is-show="showSelfStudyStagePanel" :main-cat-id="mainCatId" :sub-cat-id="subCatId"
      @hide="hideSelfStudyStagePanel"></chess-self-study-stage-panel>
    <!-- 公告详情 -->
    <chess-notice-detail-panel :is-show="showNoticeDetailPanel" @hide="hideNoticeDetailPanel"
      :noticeDetail="noticeDetail"></chess-notice-detail-panel>
    <!-- 登录注册弹窗 -->
    <chess-login-panel @hide="hideLoginPanel" :is-show="showLoginPanel"></chess-login-panel>
    <!-- 成功提示框 -->
    <water-box :is-show="showWaterBox" @hide="hideWaterBox"></water-box>

    <!-- 失败提示框 -->
    <lose-alert :is-show="showLostAlert" :ImgShow="ImgShow"></lose-alert>
    <!-- 宠物提示 -->
    <create-sucess :is-show="showCreateSucess" :avter="avter" :btnImg="btnImg" :show1="show1" :show="show">
    </create-sucess>
  </div>
</template>
<script>
  import SetButton from "../components/SetButton";
  import SetPanel from "../components/SetPanel";
  import MailBoxPanel from "../components/MailBoxPanel";
  import NoticePanel from "../components/NoticePanel";
  import TaskPanel from "../components/TaskPanel";
  import TipsPanel from "../components/TipsPanel";
  import HomeworkPanel from "../components/HomeworkPanel";
  import AchievePanel from "../components/AchievementPanel";
  import PetPanel from "../components/PetPanel";
  import ChessComPanel from "../components/ChessComPanel";
  import GrowthLogPanel from "../components/GrowthLogPanel";
  import TeacherListPanel from "../components/TeacherListPanel";
  import NoticeDetailPanel from "../components/NoticeDetailPanel";
  import SelfStudyPanel from "../components/SelfStudyPanel";
  import SelfStudyStagePanel from "../components/SelfStudyStagePanel";
  import WaterBox from "../components/WaterBox";
  import CreateSucess from "../components/CreateSucess";
  import LoginPanel from '../components/LoginPanel'

  import LoseAlert from "../components/LoseAlert"; //失败提示
  import {
    constants
  } from 'crypto';
  export default {
    data() {
      return {
        showSetPanel: false,
        isShowDialog: false,
        showMailPanel: false,
        showNoticePanel: false,
        showTaskPanel: false,
        showTipsPanel: false,
        showHomeworkPanel: false,
        showAchievePanel: false,
        showPetPanel: false,
        showChessComPanel: false,
        showGrowthLogPanel: false,
        showTeacherPanel: false,
        showNoticeDetailPanel: false,
        cloudList: [
          require('../assets/images/cloud-1.png'),
          require('../assets/images/cloud-2.png'),
          require('../assets/images/cloud-3.png'),
          require('../assets/images/cloud-4.png'),
          require('../assets/images/cloud-5.png'),
          require('../assets/images/cloud-2.png'),
          require('../assets/images/cloud-3.png'),
          require('../assets/images/cloud-4.png'),
          require('../assets/images/cloud-5.png'),
          require('../assets/images/cloud-2.png'),
          require('../assets/images/cloud-3.png'),
          require('../assets/images/cloud-4.png'),
          require('../assets/images/cloud-5.png'),
          require('../assets/images/cloud-2.png'),
          require('../assets/images/cloud-3.png'),
          require('../assets/images/cloud-4.png'),
          require('../assets/images/cloud-5.png'),
          require('../assets/images/cloud-2.png'),
          require('../assets/images/cloud-3.png'),
          require('../assets/images/cloud-4.png'),
          require('../assets/images/cloud-5.png')
        ],
        //登录弹窗
        showLoginPanel: false,
        showSelfStudyPanel: false,
        showSelfStudyStagePanel: false,
        showWaterBox: false, //弹框
        showCreateSucess: false, //宠物互动提示
        showLostAlert: false, //失败提示
        ImgShow: true,
        show: false,
        show1: true,
        roomList: [{
            url: "openChessComPanel",
            name: "棋社",
            id: 'qishe',
            icon: require("../assets/images/chess-room.png")
          },
          {
            url: "/arena",
            name: "竞技场",
            id: 'jingjichang',
            icon: require("../assets/images/arena.png")
          },
          {
            url: "/star-room",
            name: "将星阁",
            id: 'jiangxingge',
            icon: require("../assets/images/jiangxingge.png"),
            logo: require("../assets/images/teacher.png")
          },
          {
            url: "openSelfStudyPanel",
            name: "自习室",
            id: 'zixishi',
            icon: require("../assets/images/study-room.png")
          }
        ],
        isShowTaskPanel: false,
        information: [], //棋社信息
        growthLog: [], //成长日志
        noticeDetail: [], //公告栏详情
        petInfo: [], //宠物
        maildetail: [], //信件详情
        workList1: [], //我的作业
        workList2: [], //我的作业
        achieve: [], //我的成就
        gameList1: {
          id: "",
          list: {
            child: {}
          }
        }, //自习室分类
        gameList2: {
          id: "",
          list: {
            child: {}
          }
        }, //自习室分类
        gameList3: {
          id: "",
          list: {
            child: {}
          }
        }, //自习室分类
        day_job: "",
        pass_log: "",
        number: "",
        //一级分类
        mainCatId: "",
        //二级分类
        subCatId: "",
        avter: "", //宠物提示图片
        btnImg: "",
        studentInfo: [], //学生信息
        nickname: '',
        isLoginFlag: false
      };
    },
    computed: {
      taskTitle() {
        return this.isShowTaskPanel ? "隐藏" : "显示";
      }
    },
    filters: {
      filterWidth(chartWidth) {
        if (chartWidth == "0%") {
          chartWidth = "0%";
        }
        return {
          width: `${chartWidth}`
        };
      }
    },
    methods: {
      getRandom(flag) {
        let index = Math.random() > 0.5 ? -1 : 1;
        if (flag) {
          return Math.random() * 200 * index;
        } else {
          return Math.random() * 5;
        }
      },
      getAnimation() {
        return {

        }
      },
      getStyle(index, flag) {
        if (flag) {
          return {
            right: this.getRandom(true) * index + 'px',
            top: this.getRandom() * index + 'px'
          }
        } else {
          return {
            left: this.getRandom(true) * index + 'px',
            top: this.getRandom() * index + 'px'
          }
        }
      },
      changeLogo(url) {
        this.userLogo = url;
      },
      isClose() {
        //提示框消失
        setTimeout(() => {
          this.showCreateSucess = false;
        }, 1500);
      },
      numLength(id) {
        this.number = id;
      },
      gameSet() {
        this.showSetPanel = true;
      },
      hideSetPanel() {
        this.showSetPanel = false;
      },
      openMailPanel() {
        // 信箱
        this.showMailPanel = true;
      },
      hideMailPanel() {
        this.showMailPanel = false;
      },
      openNoticePanel() {
        //公告栏
        this.showNoticePanel = true;
      },
      hideNoticePanel() {
        this.showNoticePanel = false;
      },
      openTaskPanel() {
        // this.showTaskPanel = true;
      },
      hideTaskPanel() {
        this.showTaskPanel = false;
      },
      openLoginPanel() {
        this.showLoginPanel = true;
      },
      hideLoginPanel() {
        this.showLoginPanel = false;
      },
      openTipsPanel(index) {
        //信箱详情页
        this.showTipsPanel = true;
        this.$axios({
            method: "post",
            url: `${process.env.VUE_APP_URL}/index.php?r=api-message/message-info`,
            data: this.qs.stringify({
              id: index
            })
          })
          .then(res => {
            this.maildetail = res.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      hideTipsPanel() {
        this.openMailPanel();
        this.showTipsPanel = false;
      },
      openHomeworkPanel() {
        //我的作业
        this.showHomeworkPanel = true;
        this.$axios({
            method: "post",
            url: `${
          process.env.VUE_APP_URL
        }/index.php?r=api-student/select-task-notice-log`,
            data: this.qs.stringify({})
          })
          .then(res => {
            this.workList1 = res.data.data.list1;
            this.workList2 = res.data.data.list2;
          })
          .catch(error => {
            console.log(error);
          });
      },
      hideHomeworkPanel() {
        this.showHomeworkPanel = false;
        this.openChessComPanel();
      },
      openAchievePanel() {
        //我的成就
        this.showAchievePanel = true;
        this.$axios({
            method: "post",
            url: `${process.env.VUE_APP_URL}/index.php?r=api-student/my-integral`,
            data: this.qs.stringify({})
          })
          .then(res => {
            this.achieve = res.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      hideAchievePanel() {
        this.showAchievePanel = false;
        this.openChessComPanel();
      },
      openPetPanel() {
        //宠物
        this.showPetPanel = true;
        this.$axios({
            method: "post",
            url: `${process.env.VUE_APP_URL}/index.php?r=api-student/my-pet`,
            data: this.qs.stringify({})
          })
          .then(res => {
            this.petInfo = res.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      // 宠物互动
      getOperation(index) {
        this.$axios({
            method: "post",
            url: `${process.env.VUE_APP_URL}/index.php?r=api-student/pet-play`,
            data: this.qs.stringify({
              type: index
            })
          })
          .then(res => {
            if (res.data.status == 1) {
              if (index == 0) {
                this.avter = require("../assets/images/喂食成功.png");
                this.btnImg = require("../assets/images/喂养icon.png");
              } else if (index == 1) {
                this.avter = require("../assets/images/对话成功.png");
                this.btnImg = require("../assets/images/对话icon.png");
              } else if (index == 2) {
                this.avter = require("../assets/images/调教成功.png");
                this.btnImg = require("../assets/images/调教icon.png");
              } else if (index == 3) {
                this.avter = require("../assets/images/嬉戏成功.png");
                this.btnImg = require("../assets/images/嬉戏icon.png");
              }
              this.showCreateSucess = true;
              this.isClose();
              this.openPetPanel();
            } else {
              if (index == 0) {
                this.avter = require("../assets/images/明天1.png");
                this.btnImg = require("../assets/images/喂养icon.png");
              } else if (index == 1) {
                this.avter = require("../assets/images/明天2.png");
                this.btnImg = require("../assets/images/对话icon.png");
              } else if (index == 2) {
                this.avter = require("../assets/images/明天3.png");
                this.btnImg = require("../assets/images/调教icon.png");
              } else if (index == 3) {
                this.avter = require("../assets/images/明天4.png");
                this.btnImg = require("../assets/images/嬉戏icon.png");
              }
              this.showCreateSucess = true;
              this.isClose();
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      hidePetPanel() {
        this.showPetPanel = false;
      },
      openChessComPanel() {
        this.showChessComPanel = true;
      },
      hideChessComPanel() {
        this.showChessComPanel = false;
      },
      openGrowthLogPanel() {
        //成长日志
        this.showGrowthLogPanel = true;
        $.ajax({
          type: "post",
          url: `${process.env.VUE_APP_URL}/index.php?r=api-student/growth-log`,
          async: true,
          data: {},
          dataType: "json",
          success: res => {
            this.growthLog = res.data;
          }
        });
      },
      hideGrowthLogPanel() {
        this.showGrowthLogPanel = false;
        // this.openChessComPanel();
      },
      openTeacherListPanel() {
        this.showTeacherPanel = true;
      },
      hideTeacherListPanel() {
        this.showTeacherPanel = false;
      },
      openNoticeDetailPanel(index) {
        //公告栏详情页
        this.showNoticeDetailPanel = true;
        this.$axios({
            method: "post",
            url: `${
          process.env.VUE_APP_URL
        }/index.php?r=api-message/message-list-info`,
            data: this.qs.stringify({
              id: index
            })
          })
          .then(res => {
            this.noticeDetail = res.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      hideNoticeDetailPanel() {
        this.openNoticePanel();
        this.showNoticeDetailPanel = false;
      },
      openSelfStudyPanel() {
        //自习室
        this.showSelfStudyPanel = true;
        this.$axios({
            method: "post",
            url: `${process.env.VUE_APP_URL}/index.php?r=api-end-game/get-cate`,
            data: this.qs.stringify({})
          })
          .then(res => {
            let ids = [];
            for (let key in res.data.data) {
              ids.push(key);
            }
            this.gameList1.list = res.data.data[ids[0]];
            this.gameList1.id = ids[0];
            this.gameList2.list = res.data.data[ids[1]];
            this.gameList2.id = ids[1];
            this.gameList3.list = res.data.data[ids[2]];
            this.gameList3.id = ids[2];
          })
          .catch(error => {
            console.log(error);
          });
      },
      hideSelfStudeyPanel() {
        this.showSelfStudyPanel = false;
        this.openChessComPanel();
      },
      openStudyStagePanel(id, index) {
        this.mainCatId = id;
        this.subCatId = index;
        //自习室二级页面
        this.showSelfStudyStagePanel = true;
      },
      hideSelfStudyStagePanel() {
        //关闭自习室二级页面
        this.openSelfStudyPanel();
        this.showChessComPanel = false;
        this.showSelfStudyStagePanel = false;
      },
      triggerTask() {
        //每日任务
        this.isShowTaskPanel = !this.isShowTaskPanel;
        if (this.isShowTaskPanel) {
          this.$axios({
              method: "post",
              url: `${process.env.VUE_APP_URL}/index.php?r=api-student/daily-quest`,
              data: this.qs.stringify({})
            })
            .then(res => {
              this.day_job = res.data.data.day_job_count;
              this.pass_log = res.data.data.pass_log_count;
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      changeVolume(volume) {
        this.$refs.audio.volume = volume;
      },
      controlBgm(isClose) {
        setTimeout(() => {
          if (isClose) {
            this.$refs.audio.pause();
          } else {
            this.$refs.audio.play();
          }
        }, 300);
      },
      openLink(url) {
        //棋社
        if (url.includes("/")) {
          this.$router.push({
            path: url
          });
        } else {
          this[url]();
        }
        if (url == "openChessComPanel") {
          $.ajax({
            type: "post",
            url: `${"http://xiangqi.pzhkj.cn"}/index.php?r=api-student/my-chess-club`,
            async: true,
            data: {},
            dataType: "json",
            success: res => {
              this.information = res.data;
            }
          });
        }
      },
      isLogin() {
        this.$axios({
          url: `${process.env.VUE_APP_URL}index.php?r=api/if-login`
        }).then((res) => {
          if (res.data.status == 1) {
            if (res.data.data == 'teacher') {
              router.push({
                name: 'home-teacher'
              });
              return;
            } else {
              if (res.data.data == 'student') {
                this.isLoginFlag = true;
                return;
              }
            }
            next();
          } else {
            this.isLoginFlag = false;
          }
          if (this.isLoginFlag) {
            this.showLoginPanel = false;
          } else {
            // this.showLoginPanel = true;
          }
        }).catch((err) => {

        });
      },
      loginOut() {
        //退出登录
        this.$axios({
            method: "post",
            url: `${process.env.VUE_APP_URL}index.php?r=api-student/login-out`,
            data: this.qs.stringify({})
          })
          .then(res => {
            this.showLoginPanel = true;
            localStorage.removeItem('userInfo');
            location.reload();
          })
          .catch(error => {
            console.log(error);
          });
      },
      hideWaterBox() {
        //提示框
        this.showWaterBox = false;
      }
    },
    //获得学生个人信息;
    mounted() {
      if (localStorage.getItem('userInfo')) {
        var info = localStorage.getItem("userInfo");
        this.studentInfo = JSON.parse(info);
      }
    },
    components: {
      [SetButton.name]: SetButton,
      [SetPanel.name]: SetPanel,
      [MailBoxPanel.name]: MailBoxPanel,
      [NoticePanel.name]: NoticePanel,
      [TaskPanel.name]: TaskPanel,
      [TipsPanel.name]: TipsPanel,
      [HomeworkPanel.name]: HomeworkPanel,
      [AchievePanel.name]: AchievePanel,
      [PetPanel.name]: PetPanel,
      [ChessComPanel.name]: ChessComPanel,
      [GrowthLogPanel.name]: GrowthLogPanel,
      [TeacherListPanel.name]: TeacherListPanel,
      [NoticeDetailPanel.name]: NoticeDetailPanel,
      [SelfStudyPanel.name]: SelfStudyPanel,
      [SelfStudyStagePanel.name]: SelfStudyStagePanel,
      [LoginPanel.name]: LoginPanel,
      WaterBox,
      CreateSucess,
      LoseAlert
    },
    created() {
      this.isLogin();
      $.ajax({
        type: "post",
        url: `${"http://xiangqi.pzhkj.cn"}/index.php?r=api-student/my-chess-club`,
        async: true,
        data: {},
        dataType: "json",
        success: res => {
          this.information = res.data;
        }
      });
    }
  };
</script>
<style scoped>
  div.chess-home {
    position: relative;
    height: 100%;
    background: url(../assets/images/home-bg.png) no-repeat, url(../assets/images/mountain-light.png) no-repeat;
    background-size: 100% 100%, 100%;
    background-position: center, center -10%;
    overflow: hidden;
  }

  img.elephant {
    width: 12%;
    position: absolute;
    left: 31%;
    bottom: 0;
    cursor: pointer;
  }

  .room-item.qishe {
    left: 17%;
    top: 14.5%;
  }

  /* 
  div.room-container {
    position: relative;
    top: 28%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-around;
  } */

  div.room-item {
    cursor: pointer;
    width: 19.5%;
    display: inline-block;
    position: absolute;
  }

  .room-item.zixishi {
    left: 0;
    bottom: 30%;
  }

  img.room-item-icon {
    width: 95%;
  }

  .room-item.jiangxingge {
    bottom: 37%;
    right: 4.5%;
  }

  .room-item.jingjichang {
    left: 38%;
    top: 37%;
    width: 32% !important;
  }

  div.notice-container {
    width: 20%;
    position: absolute;
    left: 0;
    bottom: 0;
    cursor: pointer;
  }

  div.notice-container>img {
    width: 100%;
  }

  div.user-info-wrapper {
    height: 8.5vw;
    width: 7vw;
    z-index: 2;
    position: absolute;
    top: 1vw;
    left: 1vw;
  }

  div.user-info-wrapper-bg {
    width: 100%;
    height: 100%;
    background: url(../assets/images/用户头像框.png) no-repeat;
    background-size: 100% 100%;
    z-index: 2;
    position: relative;
  }

  img.user-logo {
    width: 70%;
    position: absolute;
    z-index: 1;
    border-radius: 50%;
    left: 12%;
    top: 9%;
  }

  p.user-nickname {
    position: absolute;
    text-align: center;
    width: 100%;
    bottom: 13%;
    z-index: 2;
    font-size: 0.7rem;
    color: #fff;
  }

  span.title,
  div.progress-bar-wrapper,
  p.level-number {
    display: inline-block;
    color: #ffffff;
    font-size: 0.8rem;
  }

  .progress-bar-wrapper {
    width: 8rem;
    height: 0.4rem;
    background: #6e553f;
    border-radius: 1rem;
    margin: 0.05rem 0.4rem;
  }

  .progress-bar {
    height: 100%;
    border-radius: 1rem;
    width: 0;
    background: #ff9036;
  }

  /* .daily-task-wrapper {
    position: absolute;
    right: 0;
    top: 2rem;
    background: rgba(0, 0, 0, 0.5);
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    color: #ffffff;
    transition: all 0.3s ease-out;
  }

  .daily-task-category-wrapper {
    overflow: hidden;
    width: 15rem;
    transition: all 0.3s ease-out;
  }

  .daily-task-category-wrapper.hide {
    width: 0;
  } */

  li.daily-task-category-item {
    background: #f4e3b5;
    margin: 1rem 0.5rem;
    padding: 0.5rem 2rem;
    border-radius: 1rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
  }

  li.daily-task-category-item.main-category {
    background: #543c27;
  }

  .pack-up-btn {
    cursor: pointer;
    width: 4rem;
    background-image: linear-gradient(-180deg, #f6be70 0%, #e9893d 100%);
    position: absolute;
    left: -4rem;
    top: 1rem;
    height: 2rem;
    line-height: 2rem;
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
    font-size: 0.8rem;
    padding-left: 0.5rem;
  }

  .pack-up-btn>p.title,
  img.arrow-right {
    display: inline-block;
  }

  img.arrow-right {
    width: 0.8rem;
    position: relative;
    top: 0.2rem;
    left: 0.5rem;
  }

  img.arrow-right.rotate {
    transform: rotate(180deg);
  }

  p.black-name {
    width: 22%;
    text-align: left;
  }

  span.user-socre {
    color: #ffffff;
    font-size: 1.2rem;
    display: inline-block;
    float: right;
    margin-right: 30%;
  }

  .cloud-wrapper {
    height: 30%;
    overflow: hidden;
    position: relative;
  }

  .cloud-wrapper.reverse {
    position: absolute;
    width: 100%;
    top: 0;
  }

  img.cloud-icon {
    width: 6%;
    position: absolute;
    animation: move 120s linear infinite;
  }

  img.cloud-icon.reverse {
    width: 6%;
    position: absolute;
    animation: moveReverse 120s linear infinite;
  }

  @keyframes move {
    from {
      margin-left: 0;
    }

    to {
      margin-left: 100vw;
    }
  }

  @keyframes moveReverse {
    from {
      margin-right: 0;
    }

    to {
      margin-right: 100vw;
    }
  }

  div.bird-wrapper {
    position: absolute;
    width: 100%;
    top: 0;
  }

  div.bird-item {
    height: 4rem;
    width: 5.5rem;
    background: url(../assets/images/bird.gif) no-repeat;
    background-size: 100% 100%;
    position: absolute;
  }

  div.bird-item:nth-child(1) {
    animation: fly 4.24s 100ms linear infinite;
    top: 0;
  }

  div.bird-item:nth-child(2) {
    animation: fly 4.24s 200ms linear infinite;
    top: 1rem;
  }

  div.bird-item:nth-child(3) {
    animation: fly 4.24s linear infinite;
    top: 2rem;
  }

  div.bird-item:nth-child(4) {
    animation: fly 4.24s 100ms linear infinite;
    top: 3rem;
  }

  div.bird-item:nth-child(5) {
    animation: fly 4.24s 200ms linear infinite;
    top: 4rem;
  }

  @keyframes fly {
    0% {
      left: -20%;
    }

    47% {
      left: 120%;
    }

    100% {
      left: 0;
    }
  }

  div.mail-wrapper {
    background: url(../assets/images/mail-tips-bg.png) no-repeat;
    background-size: 100% 100%;
    width: 8vw;
    height: 3vw;
    position: absolute;
    top: 2vw;
    left: 10vw;
    z-index: 2;
  }

  div.integral-wrapper {
    background: url(../assets/images/my-integral.png) no-repeat;
    background-size: 100% 100%;
    width: 13vw;
    height: 3vw;
    position: absolute;
    top: 2vw;
    left: 32vw;
    z-index: 2;
  }

  div.exp-wrapper {
    background: url(../assets/images/my-exp.png) no-repeat;
    background-size: 100% 100%;
    width: 13vw;
    height: 3.8vw;
    position: absolute;
    top: 2vw;
    left: 49vw;
    z-index: 2;
  }

  p.my-integral {
    color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 2rem;
    font-size: 1.2rem;
  }

  p.my-exp {
    color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 2rem;
    font-size: 1.2rem;
  }

  div.daily-task-wrapper {
    background: url(../assets/images/daily-task-bg.png) no-repeat;
    background-size: 100% 100%;
    width: 13vw;
    height: 3.8vw;
    position: absolute;
    top: 2vw;
    left: 65vw;
    z-index: 2;
  }
</style>