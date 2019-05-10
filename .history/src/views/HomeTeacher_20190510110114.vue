<template>
  <div class="chess-home">
    <!-- 背景音乐 -->
    <audio ref="audio" id="audio-music" loop>
      <source src="../assets/audio/bg.mp3">
    </audio>
    <!-- 用户信息 -->
    <div @click="openPersonalInfoPanel" class="user-info-wrapper-container pointer">
      <div class="user-info-wrapper">
        <div class="user-logo-wrapper">
          <img :src="teacherInfo.picture" class="user-logo">
        </div>
        <div class="user-name-level-wrapper">
          <p class="teacher-name">{{teacherInfo.admin_name}}</p>
        </div>
      </div>
    </div>
    <!-- 大帅府，私塾 -->
      <div
        @click="openLink(item.url)"
        class="room-item"
        :key="index"
        v-for="(item,index) in roomList"
      >
        <img class="room-item-icon" :src="item.icon" :alt="item.name">
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
    <chess-teacher-set-panel
      @hide="hideSetPanel"
      @control-bgm="controlBgm"
      :isShow="showSetPanel"
      @change-volume="changeVolume"
      :teacherInfo="teacherInfo"
    ></chess-teacher-set-panel>
    <!-- 老师个人信息 -->
    <chess-personal-info-panel
      :teacher-info="teacherInfo"
      @hide="hidePersonalInfoPanel"
      :isShow="showPersonalInfoPanel"
    ></chess-personal-info-panel>
    <!-- 管理收徒 -->
    <chess-manage-apprentice-panel
      @hide="hideManageApprenticePanel"
      :isShow="showManageApprenticePanel"
    ></chess-manage-apprentice-panel>
    <!-- 棋谱列表 -->
    <chess-table-panel @hide="hideChessTablePanel" :isShow="showChessTablePanel"></chess-table-panel>
    <!-- 公告详情 -->
    <chess-notice-detail-panel
      :notice-detail="noticeDetail"
      @hide="hideNoticeDetailPanel"
      :isShow="showNoticeDetailPanel"
    ></chess-notice-detail-panel>
    <!-- 信息提示框 -->
    <chess-tips-panel :maildetail="maildetail" @hide="hideTipsPanel" :is-show="showTipsPanel"></chess-tips-panel>
    <!-- 设置按钮 -->
    <chess-set-btn @game-set="gameSet"></chess-set-btn>
    <!-- 信箱 -->
    <div class="mailbox-wrapper">
      <img src="../assets/images/mailbox.png" @click="openMailPanel">
      <span class="mailbox-number">{{number}}</span>
    </div>
    <!-- 创建成功提示 -->
    <!-- <create-sucess :is-show="showCreateSucess" :avter="avter"></create-sucess> -->
  </div>
</template>
<script>
import SetButton from "../components/SetButton";
import SetPanel from "../components/TeacherSetPanel";
import MailBoxPanel from "../components/MailBoxPanel";
import NoticePanel from "../components/NoticePanel";
import PersonalInfoPanel from "../components/PersonalInfoPanel";
import ManageApprenticePanel from "../components/ManageApprenticePanel";
import ChessTablePanel from "../components/ChessTablePanel";
import TipsPanel from "../components/TipsPanel";
import NoticeDetailPanel from "../components/NoticeDetailPanel";
import CreateSucess from "../components/CreateSucess";
export default {
  data() {
    return {
      showSetPanel: false,
      isShowDialog: false,
      showMailPanel: false,
      showNoticePanel: false,
      showPersonalInfoPanel: false,
      showManageApprenticePanel: false,
      showChessTablePanel: false,
      showNoticeDetailPanel: false,
      showTipsPanel: false,
      showCreateSucess: false,
      avter: "",
      roomList: [
        {
          url: "/chief-mansion",
          name: "大帅府",
          icon: require("../assets/images/chief-mansion.png")
        },
        {
          url: "/private-school",
          name: "私塾",
          icon: require("../assets/images/private-school.png"),
          logo: require("../assets/images/teacher.png")
        }
      ],
      noticeDetail: "",
      maildetail: "",
      teacherInfo: {},
      number: ""
    };
  },
  methods: {
    numLength(id) {
      console.log(id);
      this.number = id;
    },
    gameSet() {
      this.showSetPanel = true;
    },
    hideSetPanel() {
      this.showSetPanel = false;
    },
    openMailPanel() {
      this.showMailPanel = true;
    },
    hideMailPanel() {
      this.showMailPanel = false;
    },
    openNoticePanel() {
      this.showNoticePanel = true;
    },
    hideNoticePanel() {
      this.showNoticePanel = false;
    },
    hideTeacherListPanel() {
      this.showTeacherPanel = false;
    },
    openPersonalInfoPanel() {
      this.showPersonalInfoPanel = true;
    },
    hidePersonalInfoPanel() {
      this.showPersonalInfoPanel = false;
    },
    openManageApprenticePanel() {
      this.showManageApprenticePanel = true;
    },
    hideManageApprenticePanel() {
      this.showManageApprenticePanel = false;
    },
    openChessTablePanel() {
      this.showChessTablePanel = true;
    },
    hideChessTablePanel() {
      this.showChessTablePanel = false;
    },
    openNoticeDetailPanel(index) {
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
    openTipsPanel(index) {
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
      if (url.includes("/")) {
        this.$router.push({ path: url });
      } else {
        this[url]();
      }
    }
  },
  components: {
    [SetButton.name]: SetButton,
    [SetPanel.name]: SetPanel,
    [MailBoxPanel.name]: MailBoxPanel,
    [NoticePanel.name]: NoticePanel,
    [PersonalInfoPanel.name]: PersonalInfoPanel,
    [ManageApprenticePanel.name]: ManageApprenticePanel,
    [ChessTablePanel.name]: ChessTablePanel,
    [NoticeDetailPanel.name]: NoticeDetailPanel,
    [TipsPanel.name]: TipsPanel,
    CreateSucess
  },
  // 获得老师个人信息
  mounted() {
    this.$axios({
      method: "post",
      url: `${process.env.VUE_APP_URL}index.php?r=api-teach/select-teach-detail`
    })
      .then(res => {
        console.log(res.data)
        if (res.data.status == 1) {
          this.teacherInfo = res.data.data;
        } else {
          alert("获取老师信息失败");
        }
      })
      .catch(err => {
        alert("服务器异常");
      });
  }
};
</script>
<style scoped>
div.chess-home {
  position: relative;
  height: 100%;
  background: url(../assets/images/home-teacher-bg.png) no-repeat;
  background-size: 100% 100%;
}
img.elephant {
  width: 10rem;
  position: absolute;
  left: 33%;
  bottom: 17%;
  cursor: pointer;
}
div.room-item {
  margin: 0 5%;
  cursor: pointer;
  width: 13%;
  display: inline-block;
  position: absolute;
  bottom: 66%;
  left: 15%;
}
img.room-item-icon{
  width:100%;
}
div.room-item:nth-child(2){
  top: 12%;
  left: 13%;
}
div.notice-container {
  width: 13%;
  position: absolute;
  left: 6%;
  bottom: 42%;
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
  width: 5%;
  left: 76%;
  bottom: 20%;
  cursor: pointer;
}
div.mailbox-wrapper > img {
  width: 100%;
}
span.mailbox-number {
  position: absolute;
  right: 10%;
  top: 4%;
  font-size: 0.6rem;
  color: #000;
  display: inline-block;
  width: 25%;
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
p.teacher-name {
  color: #fff;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}
</style>
