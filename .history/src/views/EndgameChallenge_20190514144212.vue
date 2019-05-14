<template>
  <div class="chess-my-homework-wrapper">
    <div class="left-part-wrapper">
      <div class="content-wrapper">
        <p class="title">{{endGameTitle}}</p>
        <div class="dashed-line"></div>
        <p class="content"></p>
        <!-- <img @click="getCheckPointDetail" src="../assets/images/重做.png" class="redo-icon pointer"> -->
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

    <!-- 失败提示框 -->
    <lose-game
      :is-show="showLostAlert"
      :ImgShow="ImgShow"
      :avter="avter"
      @do-again="getCheckPointDetail"
    ></lose-game>

    <!-- 成功提示框 -->
    <water-box
      :is-show="showWaterBox"
      :waterImg="waterImg"
      @hide="hideWaterBox"
      :againImg="againImg"
      :nextImg="nextImg"
      @do-again="getCheckPointDetail"
    ></water-box>
  </div>
</template>
<script>
import BackButton from "../components/BackButton";
import "../assets/js/jquery.min";
import {
  initChess,
  onChose,
  map,
  recordList,
  showValue,
  isFinshed,
  saveCheckPoint
} from "../assets/js/check-point/CChess";
import "../assets/css/Chess.css";
import LoseGame from "../components/LoseGame"; //失败提示
import WaterBox from "../components/WaterBox";
export default {
  components: {
    [BackButton.name]: BackButton,
    LoseGame,
    WaterBox
  },
  data() {
    return {
      showLostAlert: false,
      ImgShow: false,
      showWaterBox: false,
      map: map,
      recordList: recordList,
      endGameTitle: "",
      showValue: showValue,
      avter: "",
      isFinshed: isFinshed,
      waterImg: "",
      againImg: "",
      nextImg: ""
    };
  },
  methods: {
    saveCheckPoint:saveCheckPoint,
    getCheckPointDetail() {
      this.$axios({
        url: `${process.env.VUE_APP_URL}index.php?r=api/add-pass-question-info`,
        method: "post",
        data: this.qs.stringify({
          id: this.$route.query.id
        })
      })
        .then(res => {
          if (res.data.status == 1) {
            showValue.value = false;
            this.showLostAlert = false;
            isFinshed.value = false;
            this.showWaterBox = false;
            this.endGameTitle = res.data.data.title;
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
          }
        })
        .catch(err => {});
    },
    hideWaterBox() {
      //提示框
      this.showWaterBox = false;
    },
    // 下一关
    nextLevel() {}
  },
  created() {
    this.getCheckPointDetail();
  },
  watch: {
    "isFinshed.value": {
      handler: function(c, b) {
        console.log(c + "监视c");
        if (c == true) {
          this.waterImg = require("../assets/images/water-1.png");
          this.againImg = require("../assets/images/弹框-再玩一次.png");
          this.nextImg = require("../assets/images/弹框-下一关.png");
          this.showWaterBox = true;
        }
      },
      deep: true
    },
    "showValue.value": {
      handler: function(a, b) {
        if (a == true) {
          this.avter = require("../assets/images/很遗憾，闯关失败咯.png");
          this.showLostAlert = true;
        }
      },
      deep: true
    }
  },
  mounted() {
    window.onChoseEnd = onChose;
    this.saveCheckPoint.save = () => {
      this.$axios({
        url:`${process.env.VUE_APP_URL}index.php?r=api-pass/create-student-passLog`,
        data:this.qs.stringify({
          pass_id:this.$route.query.id
        })
      }).then(res => {
        if(res.data.data.status != 1) {
          alert(res.data.data.msg);
        }
      }).then(err => {
        alert('保存闯关记录失败!');
      });
    };
    
    console.log(this.saveCheckPoint)
  }
};
</script>
<style scoped>
div.chess-dialog-body {
  z-index: 2;
  background-size: 100% 100%;
  width: 50%;
  height: 70%;
  min-width: 850px;
  position: absolute;
  left: 25%;
  top: 2% !important;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  min-width: 960px;
  min-height: 768px !important;
  opacity: 1;
}
div.chess-my-homework-wrapper {
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
div.middle-part-wrapper{
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
  position: relative;
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
p.content {
  color: #ffddaa;
  padding: 0 2rem;
}
img.operation-item-btn {
  width: 40%;
}
.operation-group-btn {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  padding-top: 4rem;
  height: 16rem;
}
img.redo-icon {
  position: absolute;
  width: 7rem;
  right: 1rem;
  bottom: 1rem;
}
</style>
