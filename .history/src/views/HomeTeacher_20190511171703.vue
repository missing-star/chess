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
    <!-- 背景音乐 -->
    <audio ref="audio" id="audio-music" loop>
      <source src="../assets/audio/bg.mp3">
    </audio>
    <!-- 用户信息 -->
    <div class="pointer user-info-wrapper" @click="openPersonalInfoPanel">
      <img :src="teacherInfo.picture" class="user-logo">
      <div class="user-info-wrapper-bg">

      </div>
      <p class="user-nickname">{{teacherInfo.admin_name}}</p>
    </div>
    <!-- 信件 -->
    <div class="mail-wrapper pointer" @click="openMailPanel">
    </div>
    <!-- 大帅府，私塾 -->
    <div class="room-item-container">
      <div @click="openLink(item.url)" class="room-item" :key="index" v-for="(item,index) in roomList">
        <img class="room-item-icon" :src="item.icon" :alt="item.name">
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
    <chess-teacher-set-panel @hide="hideSetPanel" @control-bgm="controlBgm" :isShow="showSetPanel"
      @change-volume="changeVolume" :teacherInfo="teacherInfo"></chess-teacher-set-panel>
    <!-- 老师个人信息 -->
    <chess-personal-info-panel :teacher-info="teacherInfo" @hide="hidePersonalInfoPanel"
      :isShow="showPersonalInfoPanel"></chess-personal-info-panel>
    <!-- 管理收徒 -->
    <chess-manage-apprentice-panel @hide="hideManageApprenticePanel" :isShow="showManageApprenticePanel">
    </chess-manage-apprentice-panel>
    <!-- 棋谱列表 -->
    <chess-table-panel @hide="hideChessTablePanel" :isShow="showChessTablePanel"></chess-table-panel>
    <!-- 公告详情 -->
    <chess-notice-detail-panel :notice-detail="noticeDetail" @hide="hideNoticeDetailPanel"
      :isShow="showNoticeDetailPanel"></chess-notice-detail-panel>
    <!-- 信息提示框 -->
    <chess-tips-panel :maildetail="maildetail" @hide="hideTipsPanel" :is-show="showTipsPanel"></chess-tips-panel>
    <!-- 设置按钮 -->
    <chess-set-btn @game-set="gameSet"></chess-set-btn>
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
        roomList: [{
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
          this.$router.push({
            path: url
          });
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
    background: url(../assets/images/home-teacher-bg.png) no-repeat, url(../assets/images/mountain-light.png) no-repeat;
    background-size: 100% 100%, 100%;
    background-position: center, center -50%;
    overflow: hidden;
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

  img.room-item-icon {
    width: 100%;
  }

  div.room-item:nth-child(2) {
    bottom: 50%;
    left: 73%;
  }

  div.notice-container {
    width: 13%;
    position: absolute;
    left: 6%;
    bottom: 42%;
    cursor: pointer;
  }

  div.notice-container>img {
    width: 100%;
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

  div.user-logo-wrapper,
  div.user-name-level-wrapper {
    float: left;
  }

  div.user-info-wrapper {
    height: 7.5vw;
    width: 6vw;
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

  div.mailbox-wrapper>img {
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

  p.teacher-name {
    color: #fff;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
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
</style>