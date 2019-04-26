<template>
  <div class="chess-growth-panel">
    <div class="chess-dialog-body chess-growth-panel-body" :class="{'hide':!isShow}">
      <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
      <div class="content-wrapper-container">
        <div class="content left">
          <div class="race-labe">战绩标签</div>
          <div
            class="race-result"
          >{{growthLog.win_num}}胜{{growthLog.lose_num}}负{{growthLog.flat_num}}平</div>
          <div class="break-line"></div>
          <div class="result-all-wrapper">
            <div class="result-item">
              <label class="title">经验值：</label>
              <p class="show-number">{{growthLog.experience?growthLog.experience:0}}</p>
            </div>
            <div class="result-item">
              <label class="title">对弈局数：</label>
              <p class="show-number">{{growthLog.win_num+growthLog.lose_num+growthLog.flat_num}}</p>
            </div>
            <div class="result-item">
              <label class="title">等级：</label>
              <p class="show-number">{{growthLog.grade_name}}</p>
            </div>
            <div class="result-item">
              <label class="title">胜局数：</label>
              <p class="show-number">{{growthLog.win_num}}</p>
            </div>
          </div>
        </div>
        <div class="content right">
          <h3 class="title">战绩日历</h3>
          <div class="head-category-wrapper">
            <div class="head-item">
              <img src="../assets/images/时间.png" class="head-item-icon">
            </div>
            <div class="head-item">
              <img src="../assets/images/黑方名称.png" class="head-item-icon">
            </div>
            <div class="head-item">
              <img src="../assets/images/战况.png" class="head-item-icon">
            </div>
          </div>
          <ul class="race-list-wrapper">
            <li v-for="(item,index) in growthLog.list" :key="index" class="race-item">
              <p class="race-time">{{item.create_at | filterTime}}</p>
              <p class="black-name">{{item.user_name}}</p>
              <p class="race-result">
                <img
                  :src="item.game==1? require('../assets/images/胜.png'):require('../assets/images/败.png')"
                  class="race-result-icon"
                >
                <span class="race-title">{{item.game==1?"赢":'item.game==2'?"平":"输"}}</span>
                <img src="../assets/images/右键头.png" class="race-result-detail-icon">
              </p>
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
  name: "chess-growth-panel",
  data() {
    return {};
  },
  methods: {
    closeMyself() {
      this.$emit("hide");
    }
  },
  props: ["is-show", "growthLog"],
  components: {
    [ChessMask.name]: ChessMask
  },
  filters: {
    filterTime: function filterTime(time) {
      var date = new Date(time * 1000);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    }
  }
};
</script>
<style scoped>
div.chess-growth-panel-body {
  background: url(../assets/images/growth-bg.png) no-repeat;
  background-size: 100% 100%;
}
div.content-wrapper-container {
  width: 82%;
  height: 72%;
  background-size: 100% 100%;
  margin-top: 14%;
  margin-left: 6%;
}
div.content-wrapper {
  /* background: url(../assets/images/yellow-2.png) no-repeat; */
  background-size: 100% 100%;
  width: 98%;
  height: 98%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.content {
  display: inline-block;
  width: 48%;
  height: 98%;
  vertical-align: top;
  text-align: center;
}
.content.right {
  margin-left: 4%;
}
.race-labe {
  background: #a46849;
  box-shadow: 0 1px 1px 0 #daa990, inset 0 1px 1px 0 #7e4a30;
  width: 50%;
  height: 37.4%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #faf2dc;
  font-size: 1.5rem;
  margin: 0 auto;
}
div.race-result {
  background: url(../assets/images/战况底.png) no-repeat;
  background-size: 100% 100%;
  width: 50%;
  height: 8%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #faf2dc;
  margin: 5%;
}
div.break-line {
  background: url(../assets/images/分割线.png) no-repeat;
  background-size: 100% 100%;
  height: 0.2rem;
  width: 90%;
}
.result-item {
  width: 40%;
  color: #faf2dc;
  text-align: left;
  height: 45%;
}
.result-all-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 50%;
  padding-top: 2%;
}
p.show-number {
  background: #a46849;
  box-shadow: 0 1px 1px 0 #daa990, inset 0 1px 1px 0 #7e4a30;
  height: 40%;
  border-radius: 10rem;
  margin-top: 10%;
  padding: 0.5rem;
}
h3.title {
  text-align: left;
  font-size: 1.5rem;
}
img.img.head-item-icon {
  width: 100%;
}
.head-category-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
}
.head-item {
  width: 25%;
}
img.head-item-icon {
  width: 100%;
}
li.race-item {
  background: url(../assets/images/战绩底.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
  padding-left: 0.4rem;
  color: #bd926d;
}
img.race-result-icon {
  width: 1.2rem;
}
img.race-result-detail-icon {
  width: 1.9rem;
}
p.race-result {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
ul.race-list-wrapper {
  height: 80%;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
ul.race-list-wrapper::-webkit-scrollbar {
  width: 0;
}
span.race-title {
  margin: 0.2rem;
  font-size: 1.2rem;
}
</style>
