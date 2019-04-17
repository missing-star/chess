<template>
  <div class="chess-home">
    <!-- 背景音乐 -->
    <audio ref="audio" id="audio-music" loop>
      <source src="../assets/audio/bg.mp3">
    </audio>
    <!-- 用户信息 -->
    <div class="user-info-wrapper-container">
      <div class="user-info-wrapper">
        <div class="user-logo-wrapper">
          <img src="../assets/images/user-logo.png" class="user-logo">
        </div>
        <div class="user-name-level-wrapper">
          <div class="user-name-wrapper">
            <p class="username">张宇鑫</p>
            <span class="nick-level">大师</span>
          </div>
          <div class="progress-wrapper">
            <span class="title">经验:</span>
            <div class="progress-bar-wrapper">
              <div class="progress-bar"></div>
            </div>
            <p class="level-number">200/300</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 日常任务 -->
    <div class="daily-task-wrapper">
      <div @click="triggerTask" class="pack-up-btn">
        <p class="title">{{taskTitle}}</p>
        <img
          src="../assets/images/arrow-right.png"
          class="arrow-right"
          :class="{rotate:!isShowTaskPanel}"
        >
      </div>
      <ul class="daily-task-category-wrapper" :class="{hide:!isShowTaskPanel}">
        <li @click="openTaskPanel" class="daily-task-category-item main-category">日常任务( 0 / 4 )</li>
        <li class="daily-task-category-item">闯关 ( {{day_job}} / 3)</li>
        <li class="daily-task-category-item">在线对战 ( {{pass_log}} / 4)</li>
      </ul>
    </div>
    <chess-task-panel :is-show="showTaskPanel" @hide="hideTaskPanel"></chess-task-panel>
    <!-- 自习室、将星阁等 -->
    <div class="room-container">
      <div
        @click="openLink(item.url)"
        class="room-item"
        :key="index"
        v-for="(item,index) in roomList"
      >
        <img class="room-item-icon" :src="item.icon" :alt="item.name">
        <template v-if="item.logo">
          <img :src="item.logo" style="width:4rem;position:absolute;bottom:-1rem;right:7rem;">
        </template>
      </div>
    </div>

    <!-- 我的信件 -->
    <chess-mail-box
      @hide="hideMailPanel"
      :isShow="showMailPanel"
      @open-tips-detail="openTipsPanel"
      @num-length="numLength"
    ></chess-mail-box>
    <!-- 公告栏 -->
    <div class="notice-container" @click="openNoticePanel">
      <img src="../assets/images/bulletin-board.png" alt="公告栏">
    </div>
    <chess-notice-panel
      @hide="hideNoticePanel"
      :isShow="showNoticePanel"
      @open-notice-detail="openNoticeDetailPanel"
    ></chess-notice-panel>
    <!-- 设置弹框 -->
    <chess-set-panel
      @hide="hideSetPanel"
      @control-bgm="controlBgm"
      @login-out="loginOut"
      :isShow="showSetPanel"
      @change-volume="changeVolume"
    ></chess-set-panel>
    <!-- 设置按钮 -->
    <chess-set-btn @game-set="gameSet"></chess-set-btn>
    <!-- 小象 -->
    <img @click="openPetPanel" src="../assets/images/elephant.png" class="elephant">
    <!-- 我的宠物 -->
    <chess-pet-panel
      :is-show="showPetPanel"
      @hide="hidePetPanel"
      :petInfo="petInfo"
      @getOperation="getOperation"
    ></chess-pet-panel>
    <!-- 信箱 -->
    <div class="mailbox-wrapper">
      <img src="../assets/images/mailbox.png" @click="openMailPanel">
      <span class="mailbox-number">{{number}}</span>
    </div>
    <!-- 棋社 -->
    <chess-com-panel
      @open-homework="openHomeworkPanel"
      @open-ach="openAchievePanel"
      @open-log="openGrowthLogPanel"
      @open-self="openSelfStudyPanel"
      @hide="hideChessComPanel"
      :is-show="showChessComPanel"
      :information="information"
    ></chess-com-panel>
    <!-- 成长日志 -->
    <chess-growth-panel
      @hide="hideGrowthLogPanel"
      :is-show="showGrowthLogPanel"
      :growthLog="growthLog"
    ></chess-growth-panel>
    <!-- 老师列表 -->
    <chess-teacher-list-panel @hide="hideTeacherListPanel" :is-show="showTeacherPanel"></chess-teacher-list-panel>
    <!-- 信件详情 -->
    <chess-tips-panel @hide="hideTipsPanel" :is-show="showTipsPanel" :maildetail="maildetail"></chess-tips-panel>
    <!-- 作业框 -->
    <chess-homework-panel
      @hide="hideHomeworkPanel"
      :is-show="showHomeworkPanel"
      :workList1="workList1"
      :workList2="workList2"
    ></chess-homework-panel>
    <!-- 我的成就 -->
    <chess-achieve-panel :is-show="showAchievePanel" @hide="hideAchievePanel"></chess-achieve-panel>
    <!-- 自习室弹窗 -->
    <chess-self-study-panel
      :is-show="showSelfStudyPanel"
      @hide="hideSelfStudeyPanel"
      :game-list1="gameList1"
      :game-list2="gameList2"
      :game-list3="gameList3"
      @open-study-stage-panel="openStudyStagePanel"
    ></chess-self-study-panel>
    <!-- 自习室阶段弹窗 -->
    <chess-self-study-stage-panel
      :is-show="showSelfStudyStagePanel"
      :main-cat-id="mainCatId"
      :sub-cat-id="subCatId"
      @hide="hideSelfStudyStagePanel"
    ></chess-self-study-stage-panel>
    <!-- 公告详情 -->
    <chess-notice-detail-panel
      :is-show="showNoticeDetailPanel"
      @hide="hideNoticeDetailPanel"
      :noticeDetail="noticeDetail"
    ></chess-notice-detail-panel>
    <!-- 成功提示框 -->
    <water-box :is-show="showWaterBox" @hide="hideWaterBox"></water-box>
    <!-- 宠物提示 -->
    <create-sucess
      :is-show="showCreateSucess"
      :avter="avter"
      :btnImg="btnImg"
      :show1="show1"
      :show="show"
    ></create-sucess>
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
import { constants } from "crypto";
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
      showSelfStudyPanel: false,
      showSelfStudyStagePanel: false,
      showWaterBox: false, //弹框
      showCreateSucess: false,
      show: false,
      show1: false,
      roomList: [
        {
          url: "openChessComPanel",
          name: "棋社",
          icon: require("../assets/images/chess-room.png")
        },
        {
          url: "/arena",
          name: "竞技场",
          icon: require("../assets/images/arena.png")
        },
        {
          url: "/star-room",
          name: "将星阁",
          icon: require("../assets/images/jiangxingge.png"),
          logo: require("../assets/images/teacher.png")
        },
        {
          url: "openSelfStudyPanel",
          name: "自习室",
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
      btnImg: ""
    };
  },
  computed: {
    taskTitle() {
      return this.isShowTaskPanel ? "隐藏" : "显示";
    }
  },
  methods: {
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
          console.log(res.data.data);
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
          console.log(res.data);
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
          console.log(res.data);
          this.petInfo = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 宠物互动
    getOperation(index) {
      console.log(index);
      this.$axios({
        method: "post",
        url: `${process.env.VUE_APP_URL}/index.php?r=api-student/pet-play`,
        data: this.qs.stringify({
          type: index
        })
      })
        .then(res => {
          if (res.status == 1) {
            this.show1 = true;
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
          } else {
            this.show1 = true;
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
          this.openPetPanel();
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
      console.log(index);
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
          this.noticeDetail = res.data.data;
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
          console.log(this.gameList1, this.gameList2, this.gameList3);
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
            console.log(res.data);
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
        this.$router.push({ path: url });
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
    loginOut() {
      //退出登录
      this.$axios({
        method: "post",
        url: `${process.env.VUE_APP_URL}/index.php?r=api-student/my-integral`,
        data: this.qs.stringify({})
      })
        .then(res => {
          console.log(res.data);
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
    WaterBox,
    CreateSucess
  }
};
</script>
<style scoped>
div.chess-home {
  position: relative;
  height: 100%;
  background: url(../assets/images/home-bg.png) no-repeat;
  background-size: 100% 100%;
}
img.elephant {
  width: 10rem;
  position: absolute;
  left: 33%;
  bottom: 17%;
  cursor: pointer;
}
div.room-container {
  position: relative;
  top: 28%;
  text-align: center;
}
div.room-item {
  margin: 0 1%;
  cursor: pointer;
  width: 21%;
  display: inline-block;
  position: relative;
}
img.room-item-icon {
  width: 95%;
}
div.room-item:nth-child(3) > img {
  width: 110%;
}
div.room-item:nth-child(2),
div.room-item:nth-child(3) {
  position: relative;
  transform: translateX(10%) translateY(-40%);
}
div.notice-container {
  width: 18rem;
  position: absolute;
  left: 50%;
  bottom: 15%;
  cursor: pointer;
}
div.notice-container > img {
  width: 100%;
}
.user-info-wrapper {
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.5);
  border-radius: 4rem;
  margin: 0.2rem;
  padding: 0.2rem;
  height: 4.5rem;
}
img.user-logo {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: skyblue;
}
div.user-logo-wrapper,
div.user-name-level-wrapper {
  float: left;
}
.user-info-wrapper-container {
  position: absolute;
  left: 1rem;
  top: 1rem;
  background: #543c27;
  border-radius: 4rem;
  width: 23rem;
  padding: 0.2rem;
}
p.username {
  color: #ffffff;
  font-size: 1.2rem;
  display: inline-block;
}
.user-name-level-wrapper {
  height: 4rem;
  padding-left: 1rem;
  padding-top: 0.2rem;
}
span.nick-level {
  background: #ff9036;
  margin-left: 1rem;
  font-size: 0.8rem;
  color: #ffffff;
  padding: 0.1rem 0.5rem;
  border-radius: 0.8rem;
  border-bottom-left-radius: 0;
}
.progress-wrapper {
  margin-top: 1rem;
  width: 15rem;
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
  width: 50%;
  background: #ff9036;
}
div.mailbox-wrapper {
  position: absolute;
  width: 6rem;
  left: 76%;
  bottom: 20%;
  cursor: pointer;
}
div.mailbox-wrapper > img {
  width: 100%;
}
span.mailbox-number {
  position: absolute;
  right: 0.3rem;
  top: 0.65rem;
  color: #000000;
  font-size: 1rem;
  display: inline-block;
  width: 2.3rem;
  text-align: center;
}
.daily-task-wrapper {
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
}
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
.pack-up-btn > p.title,
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
</style>
