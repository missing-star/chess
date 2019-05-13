<template>
  <div class="chess-homework-panel chess-dialog-wrapper" :class="{'hide':!isShow}">
    <template v-if="currentIndex != 0">
      <!-- 学校公告遮罩点击层 -->
      <div class="tabbar-wrapper click-mask" @click="switchTab(0)" :class="{'hide':!isShow}"></div>
    </template>
    <template v-if="currentIndex != 1">
      <!-- 平台公告遮罩点击层 -->
      <div
        class="tabbar-wrapper click-mask platform"
        @click="switchTab(1)"
        :class="{'hide':!isShow}"
      ></div>
    </template>
    <template v-if="currentIndex != 2">
      <!-- 平台公告遮罩点击层 -->
      <div class="tabbar-wrapper click-mask other" @click="switchTab(2)" :class="{'hide':!isShow}"></div>
    </template>
    <div
      class="chess-dialog-body chess-homework-panel-body"
      :class="{'hide':!isShow,platform:currentIndex == 1,other:currentIndex == 2}"
    >
      <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
      <!-- 初级 -->
      <div class="content-wrapper-container" :class="{active:currentIndex == 0}">
        <div class="swiper-container swiper-1 swiper-no-swiping">
          <div class="swiper-wrapper wrapper-1">
            <ul class="low task-list-wrapper swiper-slide" v-for="n in Math.ceil(1/ 3)" :key="n">
              <li class="task-item" @click="selectLevel(1,0,'初级一')"></li>
              <li class="task-item" @click="selectLevel(1,1,'初级二')"></li>
              <li class="task-item" @click="selectLevel(1,2,'初级三')"></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 中级 -->
      <div class="content-wrapper-container" :class="{active:currentIndex == 1}">
        <div class="swiper-container swiper-2 swiper-no-swiping">
          <div class="swiper-wrapper wrapper-2">
            <ul class="normal task-list-wrapper swiper-slide" v-for="n in Math.ceil(1/ 3)" :key="n">
              <li class="task-item" @click="selectLevel(2,0,'中级一')"></li>
              <li class="task-item" @click="selectLevel(2,1,'中级二')"></li>
              <li class="task-item" @click="selectLevel(2,2,'中级三')"></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 高级 -->
      <div class="content-wrapper-container" :class="{active:currentIndex == 2}">
        <div class="swiper-container swiper-3 swiper-no-swiping">
          <div class="swiper-wrapper wrapper-3">
            <ul class="high task-list-wrapper swiper-slide" v-for="n in Math.ceil(1 / 3)" :key="n">
              <li class="task-item" @click="selectLevel(3,0,'高级一')"></li>
              <li class="task-item" @click="selectLevel(3,1,'高级二')"></li>
              <li class="task-item" @click="selectLevel(3,2,'高级三')"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <chess-mask :is-show="isShow"></chess-mask>
  </div>
</template>
<script>
import ChessMask from "./Mask";
import Swiper from "swiper";
import { constants } from "crypto";
export default {
  name: "chess-check-point-level",
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
      if (this.currentIndex != index) {
        this.currentIndex = index;
      }
    },
    selectLevel(level,stage,title) {
        //二级页面
      this.closeMyself();
      this.$emit("open-check-point-panel", level, stage,title);
    }
  },
  mounted() {
    
  }
};
</script>
<style scoped>
div.chess-homework-panel {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 1;
  transition: all 0.3s ease-out;
}
div.chess-homework-panel.hide {
  top: -100%;
  opacity: 0;
}
div.chess-homework-panel-body {
  background: url(../assets/images/dialog-level1.png) no-repeat,
    url(../assets/images/notice-bg-color.png) no-repeat;
  background-size: 100% 100%, 95% 85%;
  background-position: center, center 80%;
}
div.chess-homework-panel-body.platform {
  background: url(../assets/images/dialog-level2.png) no-repeat,
    url(../assets/images/notice-bg-color.png) no-repeat;
  background-size: 100% 100%, 95% 85%;
  background-position: center, center 80%;
}
div.chess-homework-panel-body.other {
  background: url(../assets/images/dialog-level3.png) no-repeat,
    url(../assets/images/notice-bg-color.png) no-repeat;
  background-size: 100% 100%, 95% 85%;
  background-position: center, center 80%;
}
div.content-wrapper-container {
  display: none;
  width: 81%;
  height: 67%;
  margin-top: 14%;
  margin-left: 8%;
}
div.content-wrapper-container.active {
  display: block;
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
img.mail-box-close {
  top: 2rem;
  right: -3.5rem;
}
.tabbar-wrapper {
  position: absolute;
  top: 15%;
  left: 34%;
  z-index: 2;
  width: 10%;
  height:11%;
  display: inline-block;
  cursor: pointer;
  color: #753f22;
  text-align: center;
  line-height: 4rem;
  font-size: 1.8rem;
  font-weight: bold;
  position: relative;
}
.tabbar-wrapper.other {
  position: absolute;
  top: 15%;
  left: 55%;
  z-index: 2;
  width: 10%;
  height: 11%;
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
  z-index: 4;
  cursor: pointer;
  height: 11%;
}
.tabbar-wrapper.hide {
  top: -100%;
}
.tabbar-wrapper.platform {
  left: 45%;
  top: 15.2%;
}
.tabbar-wrapper.click-mask.platform {
  background-image: none;
}
h3.title {
  background: url(../assets/images/title-bg.png) no-repeat;
  background-size: 100% 100%;
  width: 18%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  color: #eedab2;
  font-size: 1.2rem;
}
ul.task-list-wrapper {
  overflow-x: hidden;
  overflow-y: scroll;
  /* firfox非标准属性 */
  scrollbar-width: none;
  /* ie/edge */
  -ms-overflow-style: none;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
ul.task-list-wrapper::-webkit-scrollbar {
  width: 0;
  height: 0;
}
li.task-item {
  cursor: pointer;
  width: 30%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  height: 80%;
  margin: 2%;
  /* background-image: linear-gradient(
    -180deg,
    #fae7b4 0%,
    #fcefcb 65%,
    #fbeecc 100%
  ); */
  border-radius: 0.8rem;
  position: relative;
}
ul.low li:nth-child(1) {
  background: url(../assets/images/stage-bg.png) no-repeat,url(../assets/images/low-1.png) no-repeat;
  background-size: 100% 100%,95% 95%;
  background-position: center,center;
}
ul.low li:nth-child(2) {
  background: url(../assets/images/stage-bg.png) no-repeat,url(../assets/images/low-2.png) no-repeat;
  background-size: 100% 100%,95% 95%;
  background-position: center,center;
}
ul.low li:nth-child(3) {
  background: url(../assets/images/stage-bg.png) no-repeat,url(../assets/images/low-3.png) no-repeat;
  background-size: 100% 100%,95% 95%;
  background-position: center,center;
}
ul.normal li:nth-child(1) {
  background: url(../assets/images/stage-bg.png) no-repeat,url(../assets/images/normal-1.png) no-repeat;
  background-size: 100% 100%,95% 95%;
  background-position: center,center;
}ul.normal li:nth-child(2) {
  background: url(../assets/images/stage-bg.png) no-repeat,url(../assets/images/normal-2.png) no-repeat;
  background-size: 100% 100%,95% 95%;
  background-position: center,center;
}ul.normal li:nth-child(3) {
  background: url(../assets/images/stage-bg.png) no-repeat,url(../assets/images/normal-3.png) no-repeat;
  background-size: 100% 100%,95% 95%;
  background-position: center,center;
}ul.high li:nth-child(1) {
  background: url(../assets/images/stage-bg.png) no-repeat,url(../assets/images/high-1.png) no-repeat;
  background-size: 100% 100%,95% 95%;
  background-position: center,center;
}ul.high li:nth-child(2) {
  background: url(../assets/images/stage-bg.png) no-repeat,url(../assets/images/high-2.png) no-repeat;
  background-size: 100% 100%,95% 95%;
  background-position: center,center;
}ul.high li:nth-child(3) {
  background: url(../assets/images/stage-bg.png) no-repeat,url(../assets/images/high-3.png) no-repeat;
  background-size: 100% 100%,95% 95%;
  background-position: center,center;
}
.task-title-wrapper {
  border: 1px dashed #e9ce84;
  height: 100%;
  border-radius: 0.5rem;
  width: 60%;
  padding: 0.2rem;
  display: inline-block;
}
p.task-title {
  color: #753f22;
  font-size: 1.5rem;
}
.progress-bar-wrapper {
  width: 75%;
  height: 0.6rem;
  background: #ecd186;
  box-shadow: 0 1px 1px 0 #fffbf0, inset 0 1px 1px 0 #b59a4d;
  border-radius: 0.6rem;
  display: inline-block;
  vertical-align: top;
}
.progress-bar {
  background: #ff6d21;
  box-shadow: 0 1px 1px 0 #ffffff, inset 0 1px 1px 0 #d16b1e;
  height: 100%;
  width: 20%;
  border-radius: 0.6rem;
}
span.task-num {
  display: inline-block;
  vertical-align: text-top;
  line-height: 0.5rem;
  color: #ff6f00;
  padding-left: 0.4rem;
}
.task-progress-wrapper {
  padding-top: 0.8rem;
}
p.finish-bonus {
  background: #f2db9a;
  box-shadow: 0 1px 1px 0 rgba(255, 255, 255, 0.5);
  top: 0;
  right: 18%;
  font-size: 0.5rem;
  padding: 0.3rem;
  border-bottom-right-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
  color: #d2875f;
  position: absolute;
}
.finish-status-wrapper {
  position: absolute;
  right: 0;
  height: 100%;
  top: 0;
  border-top-right-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
  background-image: linear-gradient(
    -180deg,
    #ff8b32 0%,
    #ffaf5e 65%,
    #ffa34a 100%
  );
  box-shadow: -1px 0 1px 0 #fff7e0;
  writing-mode: vertical-lr;
  text-align: center;
  width: 2.5rem;
  color: #fff;
  padding-left: 0.85rem;
  font-size: 0.7rem;
  letter-spacing: 2px;
  cursor: pointer;
}
img.go-finish-icon {
  width: 1rem;
}
.finish-status-wrapper.not-finished {
  background-image: linear-gradient(
    -180deg,
    #309be6 0%,
    #66b5ed 65%,
    #5daee7 100%
  );
  color: #fcecc1;
  box-shadow: -1px 0 1px 0 #66b5ed;
}
.finish-bonus-content {
  display: inline-block;
  position: relative;
  bottom: 0.5rem;
  left: 0.5rem;
}
img.bonus-icon {
  position: absolute;
  left: -1px;
  width: 2rem;
  top: -0.15rem;
  padding: 0;
  margin: 0;
}
p.content-title {
  background: #c19863;
  box-shadow: 0 1px 1px 0 #ffffff, inset 0 1px 1px 0 #9a703a;
  width: 5rem;
  border-radius: 1.2rem;
  color: #ffffff;
  padding: 0.2rem;
  line-height: 1.2rem;
  position: relative;
  text-align: right;
  padding-right: 1rem;
}
p.end-time {
  color: #d29f1d;
}
img.homework-icon {
  width: 2.5rem;
  display: inline-block;
  margin-left: 1rem;
  position: relative;
  top: -0.2rem;
}
p.show-score {
  display: inline-block;
  height: 2rem;
  vertical-align: text-bottom;
  line-height: 2rem;
  text-align: center;
  width: 4rem;
  background: #f8e1a3;
  box-shadow: 0 1px 1px 0 #ffffff, inset 0 1px 1px 0 #cfb369;
  border-radius: 0.2rem;
  position: relative;
  top: -0.7rem;
  left: 0.5rem;
  color: #ee0606;
  font-size: 1rem;
}
img.page-icon {
  width: 100%;
}
.pre-wrapper,
.next-wrapper {
  position: absolute;
  width: 5rem;
  top: 50%;
  cursor: pointer;
}
.pre-wrapper {
  left: -2rem;
}
.next-wrapper {
  right: -1.5rem;
}
.swiper-slide {
  text-align: left;
  background: transparent;
  display: block;
}
</style>
