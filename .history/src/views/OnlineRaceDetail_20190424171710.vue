<template>
  <div class="chess-online-race-wrapper">
    <div class="left-part-wrapper">
      <div class="content-wrapper">
        <p class="title">对战路线步骤</p>
        <div class="dashed-line"></div>
        <ul ref="recordWrapper" class="record-list-wrapper">
          <template v-if="isRed">
            <li v-for="(item,index) in showRecordList" :key="index" class="record-item">
              <p
                class="record-item number"
                :class="{active:index == showRecordList.length - 1}"
              >{{index+1}}</p>
              <p class="record-item detail" :class="{active:index == showRecordList.length - 1}">
                <span
                  class="record-item detail red"
                  :class="{active:index == showRecordList.length - 1}"
                >{{item.red}}</span>
                <span class="split-line"></span>
                <span
                  class="record-item detail black"
                  :class="{active:item.black == ''}"
                >{{item.black == '' ? '等待中' : item.black}}</span>
              </p>
            </li>
          </template>
          <template v-else>
            <li v-for="(item,index) in showRecordList" :key="index" class="record-item">
              <p
                class="record-item number"
                :class="{active:index == showRecordList.length - 1}"
              >{{index+1}}</p>
              <p class="record-item detail" :class="{active:index == showRecordList.length - 1}">
                <span
                  class="record-item detail red"
                  :class="{active:index == showRecordList.length - 1}"
                >{{item.black}}</span>
                <span class="split-line"></span>
                <span
                  class="record-item detail black"
                  :class="{active:item.red == ''}"
                >{{item.red == '' ? '等待中' : item.red}}</span>
              </p>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="middle-part-wrapper">
      <ul class="number-wrapper black">
          <li class="number-item" v-for="n in 9" :key="n">{{n}}</li>
      </ul>
      <div class="chess-panel" id="space">

      </div>
      <ul class="number-wrapper red">
          <li class="number-item">九</li>
          <li class="number-item">八</li>
          <li class="number-item">七</li>
          <li class="number-item">六</li>
          <li class="number-item">五</li>
          <li class="number-item">四</li>
          <li class="number-item">三</li>
          <li class="number-item">二</li>
          <li class="number-item">一</li>
      </ul>
    </div>
    <div class="right-part-wrapper">
      <div class="black-wrapper">
        <div class="user-wrapper">
          <div class="user-logo-wrapper">
            <img src="../assets/images/user-logo.png" class="user-logo">
          </div>
          <span class="user-category">黑方</span>
        </div>
        <div class="current-percent-wrapper">
          <div class="progressbar-wrapper">
            <div
              class="progressbar"
              :style="{width:'100%'}"
            ></div>
          </div>
          <p class="percent">100%</p>
        </div>
        <div class="current-time-info-wrapper">局时：00:00 步时：00:00</div>
      </div>
      <div class="race-operation-wrapper">
        <p class="title operation">操作台</p>
        <div class="operation-group-btn">
          <img
            @click="forward"
            src="../assets/images/后退.png"
            alt="后退"
            class="operation-item pointer"
          >
          <img
            @click="backOff"
            src="../assets/images/前进.png"
            alt="前进"
            class="operation-item pointer"
          >
        </div>
      </div>
      <div class="red-wrapper">
        <div class="user-wrapper">
          <div class="user-logo-wrapper red">
            <img src="../assets/images/user-logo.png" class="user-logo">
          </div>
          <span class="user-category">红方</span>
        </div>
        <div class="current-percent-wrapper">
          <div class="progressbar-wrapper">
            <div class="progressbar" :style="{width:'100%'}"></div>
          </div>
          <p class="percent">100%</p>
        </div>
        <div class="current-time-info-wrapper">局时：00:00 步时：00:00</div>
      </div>
    </div>
    <chess-back-button></chess-back-button>
    <!-- 失败提示框 -->
    <lose-alert
      :is-show="showLostAlert"
      :avter="avter"
      :BtnImg="BtnImg"
      :BtnImg1="BtnImg1"
      :ImgShow="ImgShow"
    ></lose-alert>
  </div>
</template>
<script>
import BackButton from "../components/BackButton";
import "../assets/js/jquery.min";
import {initChess,resetPanel,backRecord,nextRecord,recordList,showrecordList,currentIndex,map, numberList, selectedQi, isPutOver,initAll} from '../assets/js/chess-detail/CChess'
import "../assets/css/Chess.css";
import LoseAlert from "../components/LoseAlert"; //失败提示
import { constants } from "crypto";
export default {
  data() {
    return {
      showRecordList:showrecordList,
      recordList:recordList,
      currentIndex:currentIndex,
      map:map,
      list:map,
      comments:'',
      selectedQi: selectedQi,
      numberList:numberList,
      isPutOver:isPutOver,
      saveMap:[]
    };
  },
  components: {
    [BackButton.name]: BackButton,
    LoseAlert
  },
  computed: {
    
  },
  mounted() {
    var obj = {
            create_at: "1555494727",
            data_code: "[[-3,-4,-5,-6,-7,-6,-5,-4,-3],[0,0,0,0,0,0,0,0,0],[0,-2,0,0,0,0,0,-2,0],[-1,0,-1,0,-1,0,-1,0,-1],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1],[0,2,0,0,0,0,0,2,0],[0,0,0,0,0,0,0,0,0],[3,4,5,6,7,6,5,4,3]]",
            data_text: '[{"y":7,"x":4,"j":7,"i":7,"sourceElem":"PR","targetElem":{"cla":"","value":0},"flag":true,"eat":null},{"y":4,"x":4,"j":3,"i":4,"sourceElem":"BB","targetElem":{"cla":"","value":0},"flag":true,"eat":null},{"y":5,"x":4,"j":6,"i":4,"sourceElem":"BR","targetElem":{"cla":"","value":0},"flag":true,"eat":null},{"y":4,"x":6,"j":3,"i":6,"sourceElem":"BB","targetElem":{"cla":"","value":0},"flag":true,"eat":null},{"y":5,"x":6,"j":6,"i":6,"sourceElem":"BR","targetElem":{"cla":"","value":0},"flag":true,"eat":null},{"y":9,"x":1,"j":2,"i":1,"sourceElem":"PB","targetElem":{"cla":"MR","value":4},"flag":true,"eat":null},{"y":9,"x":1,"j":9,"i":0,"sourceElem":"JR","targetElem":{"cla":"PB","value":-2},"flag":true,"eat":null}]',
            desc: "",
            id: "7",
            play_log: '[{"red":"炮二平五","black":"卒五进一"},{"red":"兵五进一","black":"卒七进一"},{"red":"兵三进一","black":"炮二进七"},{"red":"车九平八","black":""}]',
            teach_id: "1",
            title: "作业1",
            type: "2"
        };
        JSON.parse(obj.data_code).forEach(array => {        
            console.log(array);   
            this.map.push(array);
        });
        JSON.parse(obj.data_text).forEach(item => {
            this.recordList.push(item);
        });
        JSON.parse(obj.play_log).forEach(item => {
            this.showRecordList.push(item);
        });
        sessionStorage.clear();
        initChess('default');
  },
  methods: {
    // 前进
    forward() {
        nextRecord();
    },
    //后退
    backOff() {
        backRecord();
    }
  },
  watch: {
    showRecordList: function() {
      this.$nextTick(() => {
        this.$refs.recordWrapper.scrollTop = this.$refs.recordWrapper.scrollHeight;
      });
    },
    totalTimesRed: {
      handler() {
        this.surplusTimeRed = this.calculateTimes(this.totalTimesRed.value);
      },
      deep: true
    },
    totalTimesBlack: {
      handler() {
        this.surplusTimeBlack = this.calculateTimes(this.totalTimesBlack.value);
      },
      deep: true
    },
    "isMove.value": {
      handler: function(a, b) {
        console.log(a);
        if (a == 2) {
          this.ImgShow = false;
          this.avter = require("../assets/images/等待对方同意.png");
          this.showLostAlert = true;
          setTimeout(() => {
            this.showLostAlert = false;
          }, 2500);
          isMove.value = 1;
        }
      },
      deep: true
    }
  }
};
</script>
<style scoped>
div.chess-online-race-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  min-height: 900px;
}
div.left-part-wrapper,
div.right-part-wrapper {
  background: url(../assets/images/信息显示底.png) no-repeat;
  background-size: 100% 100%;
  height: 100%;
  width: 15%;
  flex: 1;
  padding: 2rem;
  min-width: 400px;
}
div.middle-part-wrapper{
        background: url(../assets/images/棋盘底.png) no-repeat;
        background-size: 100% 100%;
        width: 100vh;
        height: 100vh;
        min-height: 900px;
        min-width: 900px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    ul.number-wrapper.black {
        position: absolute;
        top: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 75%;
        color: #f0e5c4;
        font-size: 1.2rem;
    }
    ul.number-wrapper.red {
        position: absolute;
        bottom: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 75%;
        color: #f0e5c4;
        font-size: 1.2rem;
    }
div.chess-panel {
  width: 81%;
  height: 90%;
  background: url(../assets/images/棋盘.png) no-repeat;
  background-size: 92% 92%;
  background-position: center center;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
div.dashed-line {
  background: url(../assets/images/dot.png);
  height: 0.5rem;
  width: 83%;
  background-size: contain;
  margin: 1rem auto;
}
div.content-wrapper {
  background: #955c3e;
  box-shadow: 0 1px 1px 0 #d9ab93, inset 0 1px 1px 0 #552e19;
  height: 85%;
  width: 100%;
  border-radius: 1rem;
  padding: 1rem 0;
}
p.title {
  font-family: PingFangSC-Semibold;
  font-size: 1.5rem;
  color: #ffddaa;
  text-shadow: 0 1px 1px #5b2e16;
  text-align: center;
}
ul.record-list-wrapper {
  height: 93%;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0 1rem;
}
ul.record-list-wrapper::-webkit-scrollbar {
  width: 0;
}
li.record-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.8rem 0;
}
p.record-item.number {
  background: #834c30;
  box-shadow: 0 1px 1px 0 #d5a58d, inset 0 1px 1px 0 #5d311b;
  border-radius: 1rem;
  width: 20%;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffddaa;
  font-size: 1.2rem;
}
p.record-item.detail {
  background: #834c30;
  box-shadow: 0 1px 1px 0 #d09f86, inset 0 1px 1px 0 #5d311b;
  border-radius: 1rem;
  width: 75%;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  color: #ffddaa;
}
span.split-line {
  background: #a76d4e;
  box-shadow: 0 1px 1px 0 #4c2512;
  height: 1rem;
  width: 1px;
}
div.back-btn-wrapper {
  bottom: 2rem;
  left: 2rem;
}
.black-wrapper,
.red-wrapper {
  width: 100%;
  background: url(../assets/images/棋手信息底.png) no-repeat;
  background-size: 100% 100%;
  height: 15rem;
}
div.user-logo-wrapper {
  background: url(../assets/images/黑方头像底.png) no-repeat;
  background-size: 100% 100%;
  width: 7vh;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
div.user-logo-wrapper.red {
  background: url(../assets/images/红方头像.png) no-repeat;
  background-size: 100% 100%;
  width: 7vh;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-wrapper {
  display: flex;
  align-items: center;
  padding: 3rem 2rem;
  padding-bottom: 1rem;
}
img.user-logo {
  width: 80%;
  height: 80%;
  background: skyblue;
  border-radius: 50%;
}
span.user-category {
  color: #f0ddb4;
  font-size: 1.5rem;
  margin-left: 1.5rem;
}
.current-percent-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}
.progressbar-wrapper {
  width: 60%;
  background: #955c3e;
  height: 0.6rem;
  border-radius: 1rem;
  margin: 0 1rem;
}
.progressbar {
  height: 100%;
  background: #ffb91d;
  border-radius: 1rem;
  width: 20%;
}
p.percent {
  color: #ffb91d;
}
.current-time-info-wrapper {
  background: #a97052;
  box-shadow: 0 1px 1px 0 #d8ad96, inset 0 1px 1px 0 #59301b;
  width: 80%;
  margin: 0 auto;
  height: 2rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
div.race-operation-wrapper {
  background: url(../assets/images/操作台底.png) no-repeat;
  background-size: 100% 100%;
  height: 22rem;
}
.right-part-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
p.title.operation {
  margin-top: 2rem;
}
.operation-group-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 0;
  height: 100%;
  justify-content: space-around;
}
img.operation-item {
  width: 40%;
}
span.record-item.detail {
  width: 48%;
  text-align: center;
}
p.record-item.number.active,
p.record-item.detail.active {
  background: #f1e0b8;
  color: #834c30;
  box-shadow: 0 1px 1px 0 #50250f, inset 0 1px 1px 0 #ffffff;
}
span.record-item.detail.black.active {
  color: #ff520f;
}
</style>
