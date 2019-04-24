<template>
  <div class="chess-arena-wrapper">
    <h2>竞技场</h2>
    <div class="category-wrapper">
      <div class="category-item">
        <button class="start-game pointer" @click="openOnlineRacePanel">在线对战</button>
      </div>
      <div class="category-item">
        <button class="start-game pointer" @click="openCheckPointLevelPanel">象棋闯关</button>
      </div>
    </div>
    <chess-online-race-panel
      :wait-time="waitTime"
      @start-game="goGame"
      @hide="hideOnlineRacePanel"
      :is-show="showOnlineRacePanel"
    ></chess-online-race-panel>
    <chess-check-point-panel
      :level="selectedLevel"
      @hide="hideCheckPointPanel"
      :is-show="showCheckPointPanel"
    ></chess-check-point-panel>
    <chess-check-point-level
      @hide="hideCheckPointLevelPanel"
      @open-check-point-panel="openCheckPointPanel"
      :is-show="showCheckPointLevelPanel"
    ></chess-check-point-level>

    <div class="back-btn-wrapper">
      <img @click="gohome" src="../assets/images/back.png" class="back-icon pointer">
    </div>

    <!-- 提示框 -->
    <lose-alert
      :is-show="showLostAlert"
      :avter="avter"
      :BtnImg="BtnImg"
      :BtnImg1="BtnImg1"
      :ImgShow="ImgShow"
      @go-close="goClose"
      @go-rquest="goRequest"
      @hide="hideLostAlert"
    ></lose-alert>
  </div>
</template>
<script>
import BackButton from "../components/BackButton";
import OnlineRacePanel from "../components/OnlineRacePanel";
import CheckPointPanel from "../components/CheckPointPanel";
import CheckPointLevel from "../components/ChessCheckPointLevel";
import LoseAlert from "../components/LoseAlert"; //失败提示
import {
  SearchEngine,
  countTimes,
  countTimes2,
  saveGameResult,
  preOperation,
  gameOver,
  isGameEnd
} from "../assets/js/online/CChess";
export default {
  data() {
    return {
      showOnlineRacePanel: false,
      showCheckPointPanel: false,
      showCheckPointLevelPanel: false,
      showLostAlert: false,
      waitTime: 0,
      interval: "",
      //在线对战或人机
      isOnline: true,
      socket: null,
      SearchEngine: SearchEngine,
      searchEngine: "",
      selectedLevel: "",
      isTimeUp: false,
      preOperation: preOperation,
      isGameEnd: isGameEnd,
      avter: "",
      BtnImg: "",
      BtnImg1: "",
      ImgShow: true,
    };
  },
  methods: {
    goClose() {
      this.showLostAlert = false;
    },
    hideLostAlert() {
      this.showLostAlert = false;
    },
    goRequest() {},
    gohome(){
            this.$router.push("/home")
        },
        countTimes:countTimes,
        countTimes2:countTimes2,
        saveGameResult:saveGameResult,
        gameOver:gameOver,
        openOnlineRacePanel() {
            this.showOnlineRacePanel = true;
        },
        hideOnlineRacePanel() {
            this.showOnlineRacePanel = false;
            clearInterval(this.interval);
            this.waitTime = 0;
        },
        openCheckPointPanel(level,stage) {
            this.selectedLevel = level;
            this.showCheckPointPanel = true;
        },
        hideCheckPointPanel() {
            this.showCheckPointPanel = false;
            this.showCheckPointLevelPanel = true;
        },
        openCheckPointLevelPanel() {
            this.showCheckPointLevelPanel = true;
        },
        hideCheckPointLevelPanel() {
            this.showCheckPointLevelPanel = false;
        },
        closeCheckPointLevelPanel() {
            this.showCheckPointLevelPanel = false;
        },
        goOnlineRace() {
            //清空对局信息，防止计时器重复计时
            this.gameOver(true);
            this.interval = setInterval(() => {
                if (this.waitTime >= 1) {
                    // 重新匹配进入人机
                    clearInterval(this.interval);
                    this.waitTime = 0;
                    this.isOnline = false;
                    this.goGame();
                }
                else {
                    this.waitTime += 1;
                }
            }, 1000);
        },
        goGame() {
            if (this.isOnline) {
                //在线对战
                if (this.waitTime != 0) {
                    return;
                }
                const uuid = `user${this.getUuuid(8, 16)}`;
                sessionStorage.setItem('uuid', uuid);
                this.goOnlineRace();
                if(this.socket == null) {
                    this.socket = new WebSocket('ws://47.99.241.87:1234');
                }
                // this.socket = new WebSocket('ws://127.0.0.1:8001');
                this.socket.onopen = ()=> {
                    //状态为1证明握手成功
                    if (this.socket.readyState == 1) {
                        //发送uuid
                        this.socket.send(uuid);
                    }
                };
                //握手失败或者其他原因连接this.socket失败，则清除so对象并做相应提示操作
                this.socket.onclose = () => {
                    this.socket = null;
                }
                break;
              case "logout":
                if (this.isTimeUp || isFailed) {
                  //对方未操作结束比赛或者自己输掉比赛
                  return;
                }
                alert("对方已离线，你赢了");
                this.saveGameResult(sessionStorage.getItem("user_type"), uuid);
                this.gameOver();
            }
          }
        };
      } else {
        clearInterval(this.interval);
        this.waitTime = 0;
        gameSocket.close();
        //人机
        this.isOnline = false;
        sessionStorage.setItem("isRed", true);
        sessionStorage.setItem("nowWho", 0);
        this.searchEngine = new this.SearchEngine(1);
        this.startGame();
      }
      window.gameSocket = this.socket;
      window.searchEngine = this.searchEngine;
    },
    startGame() {
      //开始游戏，进入对战界面
      this.$router.push({
        name: "online-race",
        params: { isOnline: this.isOnline }
      });
    },
    getUuuid(len, radix) {
      var time = new Date().getTime();
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
        ""
      );
      var uuid = [],
        i;
      radix = radix || chars.length;

      if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
      } else {
        var r;

        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";

        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | (Math.random() * 16);
            uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
          }
        }
      }
      return uuid.join("") + time;
    },
<<<<<<< HEAD
    components: {
        [BackButton.name]: BackButton,
        [OnlineRacePanel.name]: OnlineRacePanel,
        [CheckPointPanel.name]: CheckPointPanel,
        [CheckPointLevel.name]: CheckPointLevel
    }
=======
    goEndGame() {
      this.$router.push({ path: "/endgame-challenge" });
    }
  },
  components: {
    [BackButton.name]: BackButton,
    [OnlineRacePanel.name]: OnlineRacePanel,
    [CheckPointPanel.name]: CheckPointPanel,
    [CheckPointLevel.name]: CheckPointLevel,
    LoseAlert
  }
>>>>>>> 9f16730ce9910fbc86318e08717b4733293010ec
};
</script>
<style scoped>
.chess-arena-wrapper {
  width: 100%;
  height: 100%;
  background: url(../assets/images/home-bg.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 10%;
}
h2 {
  text-align: center;
  font-size: 2rem;
}
.category-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem;
}
.category-item {
  width: 20rem;
  height: 25rem;
  background: #f6f6f6;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-right: 1rem;
}
button.start-game {
  border: none;
  width: 55%;
  padding: 1rem;
  border-radius: 0.5rem;
  color: #fff;
  margin-bottom: 3rem;
  outline: 0;
}
div.back-btn-wrapper {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  width: 5rem;
}
img.back-icon {
  width: 100%;
}
</style>
