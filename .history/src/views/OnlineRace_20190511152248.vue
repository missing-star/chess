<template>
  <div class="chess-online-race-wrapper">
    <div class="left-part-wrapper">
      <div class="content-wrapper">
        <p class="title">对战路线步骤</p>
        <div class="dashed-line"></div>
        <ul ref="recordWrapper" class="record-list-wrapper">
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
        machineNams: ["盛鹏", "晨康", "锐弘", "禄贤", "炳翰", "强鑫", "权皓", "鹏喆", "鸿峰", "梓勇", "远谷", "锐升", "乘沛", "仕博", "礼强", "谷泽",
          "祥祯",
          "延喆", "德翰", "文烁材凯", "胤鑫", "韦鹤", "宇翰", "祜欣", "尧恒", "平升", "成柏", "暄中", "龙畅", "逸辞", "峰畅", "晨琛", "盛斌", "钊盛",
          "伟博", "浩晨",
          "阳坤", "祜平", "伟佳锋宇", "斌郁", "颜帆", "轩林", "喆奇", "凡胤", "欣潍", "帆远", "延瑞", "颜祥", "信盛", "涛邦", "良侠", "林暄", "康安",
          "强诚", "鹏良",
          "凡海", "强锦", "安琛谷禄", "禧康", "欣成", "凯楷", "允浩", "桓振", "杰弘", "凯运", "强哲", "鸿晓", "沛远", "帆帆", "中弘", "宇彬", "皓暄",
          "晨烁", "康浩",
          "梓日", "远权", "畅皓然腾", "骏栋", "骞然", "诚允", "锋中", "芃钊", "坤佑", "振权", "加斌", "潍浩", "允盛", "骞谛", "卓烁", "坤延", "锐星",
          "禄延", "彬康",
          "德博", "允枫", "龙弘升晖", "凡祯", "辞胤", "伟福", "仕祥", "鸿彬", "梓辞", "佑欣", "荣林", "驰祜", "延梁", "天中", "德晖", "年杰", "浩栋",
          "辞逸", "起运",
          "振禄", "锋海", "康涛宇康", "邦晓", "禧斌", "辞延", "彬翰", "恒鹏", "濡乘", "晨凯", "琛皓", "斌鑫", "家帆", "锋颜", "宇瑞", "博贤", "安礼",
          "梓泽", "然锟",
          "振吉", "盛伟", "驰皓仕欣", "坤鹏", "起贤", "鸿皓", "允强", "喆澄", "荣铭", "轩伟", "家濡", "瑞家", "晖畅", "良柔", "日翰", "斌翱", "瑞林",
          "谷龙", "阳荣",
          "延彬", "然谛", "喆涛楷辞", "颜平", "谛天", "起海", "谷杞", "加谛", "鸿德", "震翱", "驰涛", "禧鹏", "杰栋", "升杞", "梓阳", "浩振", "吉颜",
          "良子", "文邦",
          "斌信", "凡锐", "宇郁家晨", "升钊", "澄澄", "福恒", "盛运", "权琛", "骞瑞", "林喆", "郁梓", "尧胤", "天初", "卓畅", "翰延", "峰然", "杞祜",
          "烁俊", "卓俊",
          "楷晖", "谛子", "家瑞锟腾", "澄文", "俊平", "振泽", "晓尧", "韦祜", "彬欣", "家宇", "禄逸", "沛卓", "轩鹏", "权嘉", "海梓", "年欣", "诚龙",
          "槐暄", "晨日",
          "林鑫", "侠柏", "瑞安彬卓", "郁礼", "祥博", "槐潍", "诚凯", "沛嘉", "林斌", "天卓", "锦畅", "奇锦", "沛起", "中槐", "骏邦", "初博", "日博",
          "驰彬", "海谷",
          "鑫谛", "盛佳", "帝潍娅文", "梅文", "涵凡", "玉芳", "露家", "敏函", "克萱", "美彩", "娅鹤", "娅蕾", "函格", "菲彬", "栀莲", "琳茹", "妮玲",
          "蓓克", "橘璇",
          "弦娜", "敏华", "玲敏", "灵媛旭珠", "菲杉", "楠惠", "鑫依", "昭婧", "菡芳", "璐旭", "桐梦", "莉呈", "桂蕾", "洁香", "妮钰", "彩韵", "芸呈",
          "桂华", "梦芸",
          "蓓玥", "韵萱", "珍昕", "雯梦", "蔚彤鸿莉", "漫春", "柔采", "凌婷", "婷云", "欢丽", "美怡", "芸林", "梦月", "婧彦", "弦欢", "茹媛", "蓓华",
          "珠楠", "歆月",
          "媛昕", "可桃", "惠媛", "钰雅", "露玉", "杉凌妮柏", "璐寒", "梦霞", "彩薇", "颖梓", "月梦", "茜柔", "淑云", "栀柔", "桃敏", "林妮", "梓美",
          "涵曦", "灵珠",
          "瑶橘", "媛栀", "钰莉"
        ],
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
      },
      // 随机获得人机的名称
      getMachineName() {
        return this.machineNams[Math.floor((Math.random() * 306))];
      }
    },
    mounted() {
      if (!window.gameSocket && this.isOnline) {
        alert("对战不存在或已结束!");
        this.$router.push("arena");
        return;
      }
      if (this.isRed) {
        this.countTimes();
      } else {
        this.countTimes2();
      }
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
          console.log(a);
          // 悔棋
          if (a == 2) {
            this.ImgShow = false;
            this.avter = require("../assets/images/等待对方同意.png");
            this.showLostAlert = true;
            setTimeout(() => {
              this.showLostAlert = false;
            }, 2500);
            isMove.value = 1;
          }
          // 和棋
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