<template>
  <div class="chess-mail-box">
    <div class="chess-dialog-body chess-mail-box-body" :class="{'hide':!isShow}">
      <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
      <div class="content-wrapper-container">
        <img
          src="../assets/images/newest.png"
          class="tab-item-icon newest"
          :class="{active:currentTab == 0}"
          @click="switchTab(0)"
        >
        <img
          src="../assets/images/history.png"
          class="tab-item-icon history"
          :class="{active:currentTab == 1}"
          @click="switchTab(1)"
        >
        <div class="content-wrapper">
          <p class="unread-number" :class="{hide:currentTab == 1}">{{num}}</p>
          <ul class="msg-list-wrapper">
            <li
              v-for="(item,index) in mail"
              :key="index"
              class="msg-item"
              :class="{invisible:item.is_read != currentTab}"
            >
              <img
                src="../assets/images/unread.png"
                class="unread-icon"
                v-if="item.is_read==1?hide:!hide"
              >
              <p class="msg-content">{{item.content}}</p>
              <a @click="openTipsPanel(item.id)" href="javascript:;" class="detail">详情</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <chess-mask :is-show="isShow"></chess-mask>
  </div>
</template>
<script>
import ChessMask from "./Mask";
export default {
  name: "chess-mail-box",
  data() {
    return {
      currentTab: 0,
      mail: [],
      hide: false,
      num: ""
    };
  },
  methods: {
    closeMyself() {
      this.$emit("hide");
    },
    switchTab(index) {
      this.currentTab = index;
      this.$axios({
        method: "post",
        url: `${process.env.VUE_APP_URL}/index.php?r=api-message/my-message`,
        data: this.qs.stringify({
          page: 1
        })
      })
        .then(res => {
          this.mail = res.data.data;
          var inform = this.mail.filter(item => {
            return item.is_read == 0;
          });
          this.num = inform.length;
          this.$emit("num-length",this.num)
        })
        .catch(error => {
          console.log(error);
        });
    },
    openTipsPanel(index) {
      this.closeMyself();
      this.$emit("open-tips-detail", index);
    }
  },
  props: ["is-show"],
  components: {
    [ChessMask.name]: ChessMask
  },
  mounted() {
    this.showMailPanel = true;
    this.switchTab(0);
  },
};
</script>
<style scoped>
div.chess-mail-box-body {
  background: url(../assets/images/dialog-mailbox-bg.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8%;
}
div.content-wrapper-container {
  background: url(../assets/images/yellow-1.png) no-repeat;
  width: 82%;
  height: 90%;
  background-size: 100% 100%;
  padding: 1%;
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
img.tab-item-icon {
  height: 15%;
  position: absolute;
  left: 5%;
  top: 35%;
  z-index: 1;
  cursor: pointer;
}
img.tab-item-icon.active {
  z-index: 2;
}
img.tab-item-icon.history {
  top: 55%;
}
ul.msg-list-wrapper {
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

li.invisible {
  display: none;
}

img.unread-icon {
  position: absolute;
  width: 1.5rem;
  left: -0.5rem;
  top: -0.5rem;
}
p.unread-number {
  position: absolute;
  width: 3rem;
  height: 1.8rem;
  right: 1.5rem;
  top: 1.5rem;
  background: url(../assets/images/unread-all.png) no-repeat;
  background-size: 100% 100%;
  line-height: 1.8rem;
  text-align: center;
  color: #ffffff;
}
p.hide {
  display: none;
}
p.msg-content {
  display: inline-block;
}
a.detail {
  color: #ff8607;
  text-decoration: none;
  float: right;
}
</style>
