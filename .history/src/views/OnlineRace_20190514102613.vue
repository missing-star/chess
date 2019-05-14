<template>
  <div class="chess-online-race-wrapper">
    <div class="left-part-wrapper">
      <div class="content-wrapper">
        <p class="title">对战路线步骤</p>
        <div class="dashed-line"></div>
        <ul ref="recordWrapper" class="record-list-wrapper">
          <template v-if="isRed">
            <li v-for="(item,index) in showRecordList" :key="index" class="record-item">
              <p class="record-item number" :class="{active:index == showRecordList.length - 1}">{{index+1}}</p>
              <p class="record-item detail" :class="{active:index == showRecordList.length - 1}">
                <span class="record-item detail red"
                  :class="{active:index == showRecordList.length - 1}">{{item.red}}</span>
                <span class="split-line"></span>
                <span class="record-item detail black"
                  :class="{active:item.black == ''}">{{item.black == '' ? '等待中' : item.black}}</span>
              </p>
            </li>
          </template>
          <template v-else>
            <li v-for="(item,index) in showRecordList" :key="index" class="record-item">
              <p class="record-item number" :class="{active:index == showRecordList.length - 1}">{{index+1}}</p>
              <p class="record-item detail" :class="{active:index == showRecordList.length - 1}">
                <span class="record-item detail red"
                  :class="{active:index == showRecordList.length - 1}">{{item.black}}</span>
                <span class="split-line"></span>
                <span class="record-item detail black"
                  :class="{active:item.red == ''}">{{item.red == '' ? '等待中' : item.red}}</span>
              </p>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="middle-part-wrapper">
      <ul class="number-wrapper black">
        <template v-if="isRed">
          <li class="number-item" v-for="n in 9" :key="n">{{n}}</li>
        </template>
        <template v-else>
          <li class="number-item">一</li>
          <li class="number-item">二</li>
          <li class="number-item">三</li>
          <li class="number-item">四</li>
          <li class="number-item">五</li>
          <li class="number-item">六</li>
          <li class="number-item">七</li>
          <li class="number-item">八</li>
          <li class="number-item">九</li>
        </template>
      </ul>
      <div class="chess-panel" id="space">

      </div>
      <ul class="number-wrapper red">
        <template v-if="!isRed">
          <li class="number-item" v-for="n in 9" :key="n">{{10-n}}</li>
        </template>
        <template v-else>
          <li class="number-item">九</li>
          <li class="number-item">八</li>
          <li class="number-item">七</li>
          <li class="number-item">六</li>
          <li class="number-item">五</li>
          <li class="number-item">四</li>
          <li class="number-item">三</li>
          <li class="number-item">二</li>
          <li class="number-item">一</li>
        </template>
      </ul>
    </div>
    <div class="right-part-wrapper">
      <template v-if="!isRed">
        <div class="red-wrapper">
          <div class="user-wrapper">
            <div class="user-logo-wrapper red">
              <img :src="userLogo" class="user-logo">
            </div>
            <span class="user-category">{{userName}}</span>
          </div>
          <div class="current-percent-wrapper">
            <div class="progressbar-wrapper">
              <div class="progressbar" :style="{width:((1200 - totalTimesBlack.value) / 1200)*100+'%'}"></div>
            </div>
            <p class="percent">{{parseFloat((1200 - totalTimesBlack.value) / 1200).toFixed(2)*100}}%</p>
          </div>
          <div class="current-time-info-wrapper">局时：{{surplusTimeBlack}} 步时：{{blackTime}}</div>
        </div>
      </template>
      <template v-else>
        <div class="black-wrapper">
          <div class="user-wrapper">
            <div class="user-logo-wrapper">
              <img :src="fightLogo" class="user-logo">
            </div>
            <span class="user-category">{{fightNickName}}</span>
          </div>
          <div class="current-percent-wrapper">
            <div class="progressbar-wrapper">
              <div class="progressbar" :style="{width:((1200 - totalTimesBlack.value) / 1200)*100+'%'}"></div>
            </div>
            <p class="percent">{{parseFloat((1200 - totalTimesBlack.value) / 1200).toFixed(2)* 100}}%</p>
          </div>
          <div class="current-time-info-wrapper">局时：{{surplusTimeBlack}} 步时：{{blackTime}}</div>
        </div>
      </template>
      <div class="race-operation-wrapper">
        <p class="title operation">操作台</p>
        <div class="operation-group-btn">
          <img @click="backOperation" src="../assets/images/悔棋.png" alt="悔棋" class="operation-item pointer">
          <img @click="noWinner" src="../assets/images/和棋.png" alt="和棋" class="operation-item pointer">
          <img @click="quitGame" src="../assets/images/认输.png" alt="认输" class="operation-item pointer">
        </div>
      </div>
      <template v-if="isRed">
        <div class="red-wrapper">
          <div class="user-wrapper">
            <div class="user-logo-wrapper red">
              <img :src="userLogo" class="user-logo">
            </div>
            <span class="user-category">{{userName}}</span>
          </div>
          <div class="current-percent-wrapper">
            <div class="progressbar-wrapper">
              <div class="progressbar" :style="{width:((1200 - totalTimesRed.value) / 1200)*100+'%'}"></div>
            </div>
            <p class="percent">{{parseFloat((1200 - totalTimesRed.value) / 1200).toFixed(2)*100}}%</p>
          </div>
          <div class="current-time-info-wrapper">局时：{{surplusTimeRed}} 步时：{{redTime}}</div>
        </div>
      </template>
      <template v-else>
        <div class="black-wrapper">
          <div class="user-wrapper">
            <div class="user-logo-wrapper">
              <img :src="userLogo" class="user-logo">
            </div>
            <span class="user-category">{{userName}}</span>
          </div>
          <div class="current-percent-wrapper">
            <div class="progressbar-wrapper">
              <div class="progressbar" :style="{width:((1200 - totalTimesRed.value) / 1200)*100+'%'}"></div>
            </div>
            <p class="percent">{{parseFloat((1200 - totalTimesRed.value) / 1200).toFixed(2)* 100}}%</p>
          </div>
          <div class="current-time-info-wrapper">局时：{{surplusTimeRed}} 步时：{{redTime}}</div>
        </div>
      </template>
    </div>
    <chess-back-button></chess-back-button>
    <!-- 失败提示框 -->
    <lose-alert :is-show="showLostAlert" :avter="avter" :BtnImg="BtnImg" :BtnImg1="BtnImg1" :ImgShow="ImgShow"
      @go-close="goClose" @go-rquest="goRequest" @hide="hideLostAlert"></lose-alert>
    <!--  -->
    <create-sucess :is-show="showCreateSucess" :avter="avter" :btnImg="btnImg" :show1="show1" :show="show">
    </create-sucess>
  </div>
</template>
<script>
  import BackButton from "../components/BackButton";
  import "../assets/js/jquery.min";
  import {
    initChess,
    onChose,
    isOnline,
    searchEngine,
    backOperation,
    quitGame,
    move,
    waitTimes,
    fightTimes,
    api,
    recordList,
    showRecordList,
    Back,
    noWinner,
    countTimes,
    countTimes2,
    totalTimesBlack,
    totalTimesRed,
    isMove,
    gameOver
  } from "../assets/js/online/CChess";
  import "../assets/css/Chess.css";
  import LoseAlert from "../components/LoseAlert"; //失败提示
  import {
    constants
  } from "crypto";
  import CreateSucess from "../components/CreateSucess";
  export default {
    data() {
      return {
        showLostAlert: false,
        ImgShow: false,
        showCreateSucess: false,
        isOnline: isOnline,
        searchEngine: searchEngine,
        nowTimes: new Date().getTime(),
        waitTimes: waitTimes,
        fightTimes: fightTimes,
        totalTimesRed: totalTimesRed,
        totalTimesBlack: totalTimesBlack,
        api: api,
        recordList: recordList,
        showRecordList: showRecordList,
        isRed: sessionStorage.getItem("isRed") == "true",
        Back: Back,
        surplusTimeRed: "20:00",
        surplusTimeBlack: "20:00",
        isMove: isMove,
        avter: "",
        BtnImg: "",
        BtnImg1: "",
        show: true,
        show1: false,
        btnImg: "",
        //对方昵称，头像
        fightLogo: sessionStorage.getItem('fightLogo'),
        fightNickName: sessionStorage.getItem('fightName'),
        fightLevel: sessionStorage.getItem('fightLevel')
      };
    },
    components: {
      [BackButton.name]: BackButton,
      LoseAlert,
      CreateSucess
    },
    computed: {
      // 我方时间
      redTime() {
        if (this.waitTimes.value == 60) {
          return "00:00";
        } else {
          return (
            "00:" +
            (this.waitTimes.value < 10 ?
              "0" + this.waitTimes.value :
              this.waitTimes.value)
          );
        }
      },
      // 对方时间
      blackTime() {
        if (this.fightTimes.value == 60) {
          return "00:00";
        } else {
          return (
            "00:" +
            (this.fightTimes.value < 10 ?
              "0" + this.fightTimes.value :
              this.fightTimes.value)
          );
        }
      }

    },
    mounted() {
      if (!window.gameSocket && this.isOnline) {
        alert("对战不存在或已结束!");
        this.$router.push("arena");
        return;
      }
      // if (this.isRed) {
      //   this.countTimes();
      // } else {
      //   this.countTimes2();
      // }
      window.onChoseOnline = onChose;
      window.moveOnline = move;
      if (this.isOnline.value != this.$route.params.isOnline) {
        this.isOnline.value = this.$route.params.isOnline;
      }
      this.api.url = process.env.VUE_APP_URL;
      this.searchEngine.engine = window.searchEngine;
      this.initChess();
      this.Back.back = () => {
        this.$router.push("/arena");
      };
    },
    methods: {
      backOperation: backOperation,
      quitGame: quitGame,
      initChess: initChess,
      noWinner: noWinner,
      countTimes: countTimes,
      countTimes2: countTimes2,
      goRequest: gameOver,
      calculateTimes(number) {
        var minute = parseInt((1200 - number) / 60);
        var seconds = parseInt((1200 - number) % 60);
        return (
          (minute < 10 ? "0" + minute : minute) +
          ":" +
          (seconds < 10 ? "0" + seconds : seconds)
        );
      },
      goClose() {
        this.showLostAlert = false;
      },
      hideLostAlert() {
        this.showLostAlert = false;
      }
    },
    watch: {
      showRecordList: function () {
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
        handler: function (a, b) {
          // 悔棋(人机/人人)
          if (a == 2 || a == 4) {
            this.ImgShow = false;
            this.avter = require("../assets/images/等待对方同意你悔棋.png");
            this.showLostAlert = true;
            if (a == 2) {
              setTimeout(() => {
                this.showLostAlert = false;
              }, 2500);
              isMove.value = 1;
            }
          }
          // 和棋(人机)
          if (a == 3) {
            setTimeout(() => {
              this.showCreateSucess = true;
            }, 1000);
            this.ImgShow = false;
            this.avter = require("../assets/images/同意和棋.png");
            setTimeout(() => {
              this.showCreateSucess = false;
            }, 2000);
            isMove.value = 1;
          }
          // 认输
          if (a == 4) {
            this.ImgShow = false;
            this.avter = require("../assets/images/你确定要认输吗.png");
            this.BtnImg = require("../assets/images/确定.png");
            this.BtnImg1 = require("../assets/images/取消.png");
            this.showLostAlert = true;
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
    overflow: hidden;
  }

  div.left-part-wrapper,
  div.right-part-wrapper {
    background: url(../assets/images/信息显示底.png) no-repeat;
    background-size: 100% 100%;
    height: 100%;
    width: 15%;
    flex: 1;
    padding: 2rem;
  }

  div.middle-part-wrapper {
    background: url(../assets/images/棋盘底.png) no-repeat;
    background-size: 100% 100%;
    width: 100vh;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  ul.number-wrapper.black {
    position: absolute;
    top: 3%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 75%;
    color: #f0e5c4;
    font-size: 1.2rem;
  }

  ul.number-wrapper.red {
    position: absolute;
    bottom: 3%;
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
    background-size: 90% 92%;
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
    bottom: 3%;
    left: 2rem;
  }

  .black-wrapper,
  .red-wrapper {
    width: 100%;
    background: url(../assets/images/棋手信息底.png) no-repeat;
    background-size: 100% 100%;
    height: 25%;
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
    padding: 6%;
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
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1%;
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
    height: 20%;
    border-radius: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    margin-top: 2%;
    font-size: 0.8rem;
  }

  div.race-operation-wrapper {
    background: url(../assets/images/操作台底.png) no-repeat;
    background-size: 100% 100%;
    height: 45%;
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