<template>
  <div class="chess-self-study-wrapper">
    <div class="left-part-wrapper">
      <div class="content-wrapper">
        <p class="title">{{title}}</p>
        <p class="sub-title"></p>
        <div class="dashed-line"></div>
        <p class="content"></p>
      </div>
      <div class="content-wrapper answer">
        <p class="title">答案</p>
        <p class="sub-title"></p>
        <div class="dashed-line"></div>
        <ul v-if="isShowAnswer" class="record-list-wrapper">
          <li v-for="(item,index) in answerList" :key="index" class="record-item">
            <p class="record-item number">{{index+1}}</p>
            <p class="record-item detail">
              <span class="record-item detail red">
                {{item.red}}
              </span>
              <span class="split-line"></span>
              <span class="record-item detail black" :class="{active:item.black == ''}">
                {{item.black}}
              </span>
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
      <div class="black-wrapper">
        <div class="user-wrapper">
          <div class="user-logo-wrapper">
            <img src="../assets/images/user-logo.png" class="user-logo">
          </div>
          <span class="user-category">黑方</span>
        </div>
      </div>
      <div class="race-operation-wrapper">
        <p class="title operation">操作台</p>
        <div class="operation-group-btn">
          <img @click="reDo" src="../assets/images/重做.png" class="operation-item-btn pointer">
          <img @click="showAnswer" src="../assets/images/答案.png" class="operation-item-btn pointer">
          <img @click="preQues" src="../assets/images/上一题.png" class="operation-item-btn pointer">
          <img @click="nextQues" src="../assets/images/下一题.png" class="operation-item-btn pointer">
        </div>
      </div>
      <div class="red-wrapper">
        <div class="user-wrapper">
          <div class="user-logo-wrapper red">
            <img src="../assets/images/user-logo.png" class="user-logo">
          </div>
          <span class="user-category">红方</span>
        </div>
      </div>
    </div>
    <chess-back-button></chess-back-button>
    <!-- 成功提示框 -->
    <water-box :is-show="showWaterBox" :waterImg="waterImg" @hide="hideWaterBox" :againImg="againImg" :nextImg="nextImg"
      @do-again="goBack" @next-level="reDo"></water-box>
  </div>
</template>
<script>
  import BackButton from "../components/BackButton";
  import "../assets/js/jquery.min";
  import WaterBox from "../components/WaterBox";
  import {
    initChess,
    onChose,
    map,
    recordList,
    advise,
    isFinsh,
    saveSelfStudy
  } from "../assets/js/self-study/CChess";
  import "../assets/css/Chess.css";
  export default {
    components: {
      [BackButton.name]: BackButton,
      WaterBox
    },
    data() {
      return {
        map: map,
        recordList: recordList,
        title: "",
        answerList: [],
        advise: advise,
        isFinsh: isFinsh,
        showWaterBox: true,
        waterImg: "",
        againImg: "",
        nextImg: "",
        saveSelfStudy: saveSelfStudy,
        nextQuesId: '',
        preQuesId: '',
        nowQuesId: '',
        isShowAnswer:false
      };
    },
    methods: {
      //获得棋谱详情
      getChessDetail(id) {
        this.$axios({
            url: `${process.env.VUE_APP_URL}index.php?r=api/game-end-info`,
            method: "post",
            data: this.qs.stringify({
              id: id
            })
          })
          .then(res => {
            if (res.data.status == 1) {
              this.nowQuesId = id;
              if (res.data.info.next_info != null) {
                this.nextQuesId = res.data.info.next_info.id;
              } else {
                this.nextQuesId = '';
              }
              if (res.data.info.up_info != null) {
                this.preQuesId = res.data.info.up_info.id;
              } else {
                this.preQuesId = '';
              }
              advise.value = false;
              isFinsh.value = false;
              this.showWaterBox = false;
              this.title = res.data.data.title;
              this.map.splice(0);
              this.recordList.splice(0);
              JSON.parse(res.data.data.data_code).forEach(array => {
                let temp = [];
                array.forEach(item => {
                  temp.push(item);
                });
                this.map.push(temp);
              });
              initChess();
              JSON.parse(res.data.data.data_text).forEach(item => {
                this.recordList.push(item);
              });
              this.answerList = res.data.data.play_log;
              console.log(this.answerList);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      nextQues() {
        if (this.nextQuesId == '') {
          alert('没有下一题了!');
          return;
        }
        this.getChessDetail(this.nextQuesId);
      },
      preQues() {
        if (this.preQuesId == '') {
          alert('没有上一题了!');
          return;
        }
        this.getChessDetail(this.preQuesId);
      },
      reDo() {
        this.showWaterBox = false;
        this.getChessDetail(this.nowQuesId);
      },
      showAnswer() {
        this.isShowAnswer = true;
      },
      hideWaterBox() {
        advise.value = false;
        isFinsh.value = false;
        this.showWaterBox = false;
      },
      // 退出
      goBack() {
        this.$router.push("/home");
      },
      define() {
        advise.value = false;
        isFinsh.value = false;
        this.showWaterBox = false;
      }
    },
    watch: {
      "advise.value": {
        handler: function (c, b) {
          if (c == true) {
            this.waterImg = require("../assets/images/走错咯，再来一次呗.png");
            this.againImg = require("../assets/images/弹框-退出.png");
            this.nextImg = require("../assets/images/弹框-再玩一次.png");
            this.showWaterBox = true;
          }
        },
        deep: true
      },
      "isFinsh.value": {
        handler: function (c, b) {
          if (c == true) {
            this.waterImg = require("../assets/images/恭喜你，获得胜利.png");
            this.againImg = require("../assets/images/弹框-退出.png");
            this.nextImg = require("../assets/images/弹框-再玩一次.png");
            this.showWaterBox = true;
          }
        },
        deep: true
      }
    },
    mounted() {
      this.nowQuesId = this.$route.params.id;
      this.getChessDetail(this.nowQuesId);
      window.onChoseSelf = onChose;
      this.saveSelfStudy.save = () => {
        this.$axios({
          url: `${process.env.VUE_APP_URL}index.php?r=api-student/create-student-do-question-log`,
          method: 'post',
          data: this.qs.stringify({
            question_id: this.nowQuesId
          })
        }).then(res => {
          if (res.data.status != 1) {
            alert(res.data.msg);
          }
        }).catch(err => {
          alert('保存练习记录失败!');
        });
      }
    }
  };
</script>
<style scoped>
  div.chess-self-study-wrapper {
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
    height: 40%;
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

  p.sub-title {
    color: #ffddaa;
    text-align: center;
    padding-top: 0.5rem;
  }

  ul.record-list-wrapper {
    height: 93%;
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 0 1rem;
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
    height: 100%;
    flex-direction: column;
    justify-content: center;
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
    margin-top: 1.5rem;
  }

  .right-part-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  p.title.operation {
    margin-top: 2rem;
  }

  p.content {
    color: #ffddaa;
    padding: 0 2rem;
  }

  img.operation-item-btn {
    width: 34%;
    margin: 5%;
  }

  .operation-group-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 30%;
    height: 60%;
  }

  div.race-operation-wrapper {
    background: url(../assets/images/操作台底.png) no-repeat;
    background-size: 100% 100%;
    height: 45%;
  }

  .content-wrapper.answer {
    margin-top: 10%;
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