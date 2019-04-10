<template>
  <div class="chess-notice-panel chess-dialog-wrapper" :class="{'hide':!isShow}">
    <template v-if="currentIndex == 0">
      <!-- 学校公告 -->
      <div class="tabbar-wrapper" :class="{'hide':!isShow}"></div>
      <!-- 学校公告遮罩点击层 -->
      <div class="tabbar-wrapper click-mask" @click="switchTab(1)" :class="{'hide':!isShow}"></div>
    </template>
    <template v-if="currentIndex == 1">
      <!-- 平台公告 -->
      <div class="tabbar-wrapper platform" :class="{'hide':!isShow}"></div>
      <!-- 平台公告遮罩点击层 -->
      <div
        class="tabbar-wrapper click-mask platform"
        @click="switchTab(0)"
        :class="{'hide':!isShow}"
      ></div>
    </template>
    <div
      class="chess-dialog-body chess-notice-panel-body"
      :class="{'hide':!isShow,platform:currentIndex == 1}"
    >
      <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
      <div class="content-wrapper-container">
        <ul class="msg-list-wrapper">
          <li v-for="(n,index) in 40" :key="n" class="msg-item">
            <img src="../assets/images/unread.png" class="unread-icon">
            <p class="msg-content">你已收徒成功</p>
            <a @click="showNoticeDetail(index)" href="javascript:;" class="detail">详情</a>
          </li>
        </ul>
      </div>
    </div>
    <chess-mask :is-show="isShow"></chess-mask>
  </div>
</template>
<script>
import ChessMask from "./Mask";
export default {
  name: "chess-notice-panel",
  props: ["is-show"],
  components: {
    [ChessMask.name]: ChessMask
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    closeMyself() {
      this.$emit("hide");
    },
    switchTab(index) {
      this.currentIndex = index;
      console.log(index);
      this.$axios({
        method: "post",
        url: `${
          process.env.VUE_APP_URL
        }/index.php?r=api-student/message-list`,
        data: this.qs.stringify({
          id: index + 1
        })
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    showNoticeDetail(index) {
      this.closeMyself();
      this.$emit("open-notice-detail", index);
    }
  }
};
</script>
<style scoped>
div.chess-notice-panel {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 1;
  transition: all 0.3s ease-out;
}
div.chess-notice-panel.hide {
  top: -100%;
  opacity: 0;
}
div.chess-notice-panel-body {
  background: url(../assets/images/notice-bg-1.png) no-repeat,
    url(../assets/images/notice-bg-color.png) no-repeat;
  background-size: 100% 100%, 95% 85%;
  background-position: center, center 80%;
}
div.chess-notice-panel-body.platform {
  background: url(../assets/images/notice-bg-2.png) no-repeat,
    url(../assets/images/notice-bg-color.png) no-repeat;
  background-size: 100% 100%, 95% 85%;
  background-position: center, center 80%;
}
div.content-wrapper-container {
  background: url(../assets/images/yellow-2.png) no-repeat;
  width: 81%;
  height: 74%;
  margin-top: 14%;
  margin-left: 8%;
  background-size: 100% 100%;
}
div.content-wrapper {
  background: url(../assets/images/yellow-2.png) no-repeat;
  background-size: 100% 100%;
  width: 98%;
  height: 98%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
ul.msg-list-wrapper {
  margin: 5rem;
  height: 85%;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  top: 2rem;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  /* firfox非标准属性 */
  scrollbar-width: none;
  /* ie/edge */
  -ms-overflow-style: none;
}
ul.msg-list-wrapper::-webkit-scrollbar {
  height: 0;
  width: 0;
}
li.msg-item {
  position: relative;
  color: #a97052;
  margin-bottom: 0.8rem;
  background: url(../assets/images/msg-bg.png) no-repeat;
  background-size: 100% 100%;
  padding: 0.8rem 1rem;
}
img.unread-icon {
  position: absolute;
  width: 1.5rem;
  left: -0.5rem;
  top: -0.5rem;
}
p.msg-content {
  display: inline-block;
}
a.detail {
  color: #ff8607;
  text-decoration: none;
  float: right;
}
img.mail-box-close {
  top: 2rem;
  right: -3.5rem;
}
.tabbar-wrapper {
  position: absolute;
  top: 15%;
  left: calc(25% + 365px);
  z-index: 2;
  background: url(../assets/images/notice-tab-1.png) no-repeat;
  background-size: 100% 100%;
  width: 15.5rem;
  height: 7.5rem;
  display: inline-block;
  cursor: pointer;
  color: #753f22;
  text-align: center;
  line-height: 4rem;
  font-size: 1.8rem;
  font-weight: bold;
  position: relative;
}
.tabbar-wrapper.click-mask {
  background: transparent;
  position: absolute;
  z-index: 3;
  cursor: pointer;
  height: 5rem;
}
.tabbar-wrapper.hide {
  top: -100%;
}
.tabbar-wrapper.platform {
  background-image: url(../assets/images/notice-tab-2.png);
  left: calc(25% + 152px);
  top: 15.2%;
}
.tabbar-wrapper.click-mask.platform {
  background-image: none;
}
</style>
