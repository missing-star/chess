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
        <!-- <div class="pre-wrapper swiper-button-prev swiper-button-prev-1" id="prev-1">
          <img
            disabled
            v-if="isFirstPage1"
            src="../assets/images/arrow-left-disabled.png"
            class="page-icon"
          >
          <img v-else src="../assets/images/arrow-left-big.png" class="page-icon">
        </div>
        <div class="next-wrapper swiper-button-next swiper-button-next-1" id="next-1">
          <img
            disabled
            v-if="isLastPage1"
            src="../assets/images/arrow-right-disabled.png"
            class="page-icon"
          >
          <img v-else src="../assets/images/arrow-right-big.png" class="page-icon">
        </div> -->
        <div class="swiper-container swiper-1 swiper-no-swiping">
          <div class="swiper-wrapper wrapper-1">
            <ul class="task-list-wrapper swiper-slide" v-for="n in Math.ceil(1/ 3)" :key="n">
              <li
                v-for="(item,index) in gameList1.list.child"
                :key="index"
                class="task-item"
                @click="showSelfStudyStagePanel(gameList1.id,item.id)"
              >{{item.name}}</li>
            </ul>
          </div>
          <!-- <div class="swiper-pagination swiper-pagination-1"></div> -->
        </div>
      </div>
      <!-- 中级 -->
      <div class="content-wrapper-container" :class="{active:currentIndex == 1}">
        <!-- <div class="pre-wrapper swiper-button-prev swiper-button-prev-2" id="prev-2">
          <img
            disabled
            v-if="isFirstPage2"
            src="../assets/images/arrow-left-disabled.png"
            class="page-icon"
          >
          <img v-else src="../assets/images/arrow-left-big.png" class="page-icon">
        </div>
        <div class="next-wrapper swiper-button-next swiper-button-next-2" id="next-2">
          <img
            disabled
            v-if="isLastPage2"
            src="../assets/images/arrow-right-disabled.png"
            class="page-icon"
          >
          <img v-else src="../assets/images/arrow-right-big.png" class="page-icon">
        </div> -->
        <div class="swiper-container swiper-2 swiper-no-swiping">
          <div class="swiper-wrapper wrapper-2">
            <ul class="task-list-wrapper swiper-slide" v-for="n in Math.ceil(1/ 3)" :key="n">
              <li
                v-for="item in gameList2.list.child"
                :key="item.id"
                class="task-item"
                @click="showSelfStudyStagePanel(gameList2.id,item.id)"
              >{{item.name}}</li>
            </ul>
          </div>
          <!-- <div class="swiper-pagination swiper-pagination-2"></div> -->
        </div>
      </div>
      <!-- 高级 -->
      <div class="content-wrapper-container" :class="{active:currentIndex == 2}">
        <!-- <div class="pre-wrapper swiper-button-prev swiper-button-prev-3" id="prev-3">
          <img
            disabled
            v-if="isFirstPage2"
            src="../assets/images/arrow-left-disabled.png"
            class="page-icon"
          >
          <img v-else src="../assets/images/arrow-left-big.png" class="page-icon">
        </div>
        <div class="next-wrapper swiper-button-next swiper-button-next-3" id="next-3">
          <img
            disabled
            v-if="isLastPage2"
            src="../assets/images/arrow-right-disabled.png"
            class="page-icon"
          >
          <img v-else src="../assets/images/arrow-right-big.png" class="page-icon">
        </div> -->
        <div class="swiper-container swiper-3 swiper-no-swiping">
          <div class="swiper-wrapper wrapper-3">
            <ul class="task-list-wrapper swiper-slide" v-for="n in Math.ceil(1 / 3)" :key="n">
              <li
                v-for="item in gameList3.list.child"
                :key="item.id"
                class="task-item"
                @click="showSelfStudyStagePanel(gameList3.id,item.id)"
              >{{item.name}}</li>
            </ul>
          </div>
          <!-- <div class="swiper-pagination swiper-pagination-3"></div> -->
        </div>
      </div>
      <!-- <div class="content-wrapper-container" :class="{active:currentIndex == 1}">
                <div class="pre-wrapper">
                    <img src="../assets/images/arrow-left-big.png" class="page-icon">
                </div>
                <div class="next-wrapper">
                    <img src="../assets/images/arrow-right-big.png" class="page-icon">
                </div>
                <h3 class="title">
                    tab2
                </h3>
                <ul class="task-list-wrapper">
                    <li v-for="item in taskList" :key="item.id" class="task-item">
                        <p class="finish-bonus" v-if="item.status != 2">
                            完成奖励
                        </p>
                        <div class="task-title-wrapper">
                            <p class="task-title">{{item.title}}</p>
                            <div class="task-progress-wrapper">
                                <p class="end-time">截止时间：{{item.endTime}}</p>
                            </div>
                        </div>
                        <template  v-if="item.status != 2">
                            <div class="finish-bonus-content">
                                <p class="content-title"><img src="../assets/images/temp-icon.png" class="bonus-icon">30</p>
                            </div>
                            <div class="finish-status-wrapper" v-if="item.status == 0">
                                已提交
                            </div>
                            <div class="finish-status-wrapper not-finished" v-if="item.status == 1">
                                <img class="go-finish-icon" src="../assets/images/arrow-right-task.png">
                                去完成
                            </div>
                        </template>
                        <template v-else>
                            <img src="../assets/images/homework-icon.png" class="homework-icon">
                            <p class="show-score">{{item.score}}</p>
                        </template>
                    </li>
                </ul>
      </div>-->
    </div>
    <chess-mask :is-show="isShow"></chess-mask>
  </div>
</template>
<script>
import ChessMask from "./Mask";
import Swiper from "swiper";
import { constants } from "crypto";
export default {
  name: "chess-self-study-panel",
  props: ["is-show", "gameList1", "gameList2", "gameList3"],
  components: {
    [ChessMask.name]: ChessMask
  },
  data() {
    return {
      currentIndex: 0,
      isFirstPage1: true,
      isLastPage1: false,
      isFirstPage2: true,
      isLastPage2: false,
      isFirstPage3: true,
      isLastPage3: false,
      taskList1: [{}],
      taskList2: [{}],
      taskList3: [{}],
      isSwiper2: false,
      isSwiper3: false,
      firstId:'',
      secondId:''
    };
  },
  updated() {
    console.log(this.gameList1,this.gameList2,this.gameList3.list);
  },
  methods: {
    closeMyself() {
      this.$emit("hide");
    },
    showSelfStudyStagePanel(id, index) {
      //二级页面
      this.closeMyself();
      this.$emit("open-study-stage-panel", id, index);
    },
    switchTab(index) {
      if (this.currentIndex != index) {
        this.currentIndex = index;
        switch(index) {
          case 0:
            
          break;
          case 1:
          break;
          case 2:
          break;
        }
        // if (this.currentIndex == 1 && !this.isSwiper2) {
        //   this.$nextTick(() => {
        //     const vm = this;
        //     this.isSwiper2 = true;
        //     new Swiper(".swiper-2", {
        //       watchSlidesProgress: true,
        //       pagination: {
        //         el: ".swiper-pagination-2"
        //       },
        //       observer: true,
        //       navigation: {
        //         nextEl: "#next-2",
        //         prevEl: "#prev-2"
        //       },
        //       on: {
        //         progress: function(progress) {
        //           console.log("s2=" + this.progress);
        //           if (this.progress == 0) {
        //             //无法点击上一页
        //             vm.isFirstPage2 = true;
        //             if (vm.computedLength2()) {
        //               vm.isLastPage2 = false;
        //             }
        //           }
        //           if (this.progress == 1) {
        //             //无法点击最后一页
        //             vm.isLastPage2 = true;
        //             vm.isFirstPage2 = false;
        //           }
        //         }
        //       }
        //     });
        //   });
        // } else if (this.currentIndex == 2 && !this.isSwiper3) {
        //   this.$nextTick(() => {
        //     const vm = this;
        //     this.isSwiper3 = true;
        //     new Swiper(".swiper-3", {
        //       watchSlidesProgress: true,
        //       pagination: {
        //         el: ".swiper-pagination-3"
        //       },
        //       observer: true,
        //       navigation: {
        //         nextEl: "#next-3",
        //         prevEl: "#prev-3"
        //       },
        //       on: {
        //         progress: function(progress) {
        //           if (this.progress == 0) {
        //             //无法点击上一页
        //             vm.isFirstPage3 = true;
        //             if (vm.computedLength3()) {
        //               vm.isLastPage3 = false;
        //             }
        //           }
        //           if (this.progress == 1) {
        //             //无法点击最后一页
        //             vm.isLastPage3 = true;
        //             vm.isFirstPage3 = false;
        //           }
        //         }
        //       }
        //     });
        //   });
        // }
      }
    },
    computedLength1() {
      return Math.ceil(this.taskList1.length / 3) > 1;
    },
    computedLength2() {
      return Math.ceil(this.taskList1.length / 3) > 1;
    },
    computedLength3() {
      return Math.ceil(this.taskList1.length / 3) > 1;
    }
  },
  mounted() {
    this.isLastPage1 = Math.ceil(this.taskList1.length / 3) > 1 ? false : true;
    this.isLastPage2 = Math.ceil(this.taskList1.length / 3) > 1 ? false : true;
    this.isLastPage3 = Math.ceil(this.taskList1.length / 3) > 1 ? false : true;
    // this.$nextTick(() => {
      // const vm = this;
      // new Swiper(".swiper-1", {
      //   watchSlidesProgress: true,
      //   pagination: {
      //     el: ".swiper-pagination-1"
      //   },
      //   navigation: {
      //     nextEl: "#next-1",
      //     prevEl: "#prev-1"
      //   },
      //   observer: true,
      //   on: {
      //     progress: function(progress) {
      //       if (this.progress == 0) {
      //         //无法点击上一页
      //         vm.isFirstPage1 = true;
      //         if (vm.computedLength1()) {
      //           vm.isLastPage1 = false;
      //         }
      //       }
      //       if (this.progress == 1) {
      //         //无法点击最后一页
      //         vm.isLastPage1 = true;
      //         vm.isFirstPage1 = false;
      //       }
      //     }
      //   }
      // });
    // });
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
  left: calc(25% + 165px);
  z-index: 2;
  width: 12rem;
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
.tabbar-wrapper.other {
  position: absolute;
  top: 15%;
  left: calc(40% + 365px);
  z-index: 2;
  width: 12rem;
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
  left: calc(40% + 152px);
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
  background-image: linear-gradient(
    -180deg,
    #fae7b4 0%,
    #fcefcb 65%,
    #fbeecc 100%
  );
  box-shadow: 0 6px 8px 0 #6a3a21;
  border-radius: 0.8rem;
  position: relative;
  padding: 0.5rem;
  background: url(../assets/images/stage-bg.png) no-repeat;
  background-size: 100% 100%;
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
