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
    <chess-online-race-panel :wait-time="waitTime" @start-game="goGame" @hide="hideOnlineRacePanel"
      :is-show="showOnlineRacePanel"></chess-online-race-panel>
    <chess-check-point-panel :level="selectedLevel" @hide="hideCheckPointPanel" :is-show="showCheckPointPanel">
    </chess-check-point-panel>
    <chess-check-point-level @hide="hideCheckPointLevelPanel" @open-check-point-panel="openCheckPointPanel"
      :is-show="showCheckPointLevelPanel"></chess-check-point-level>

    <div class="back-btn-wrapper">
      <img v-if="waitTime < 15" :disabled="waitTime != 0" @click="gohome" src="../assets/images/back.png" class="back-icon pointer">
    </div>

    <!-- 提示框 -->
    <lose-alert :is-show="showLostAlert" :avter="avter" :BtnImg="BtnImg" :BtnImg1="BtnImg1" :ImgShow="ImgShow"
      @go-close="goClose" @go-rquest="goRequest" @hide="hideLostAlert"></lose-alert>
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
        //是否匹配成功
        isMatchSuccess:false,
        showOnlineRacePanel: true,
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
      gohome() {
        this.$router.push("/home")
      },
      goClose() {
        this.showLostAlert = false;
      },
      hideLostAlert() {
        this.showLostAlert = false;
      },
      goRequest() {},
      countTimes: countTimes,
      countTimes2: countTimes2,
      saveGameResult: saveGameResult,
      gameOver: gameOver,
      openOnlineRacePanel() {
        this.showOnlineRacePanel = true;
      },
      hideOnlineRacePanel() {
        this.showOnlineRacePanel = false;
        clearInterval(this.interval);
        this.waitTime = 0;
      },
      openCheckPointPanel(level, stage) {
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
          if (this.waitTime >= 15) {
            // 重新匹配进入人机
            clearInterval(this.interval);
            this.waitTime = 0;
            this.isOnline = false;
            this.goGame();
          } else {
            this.waitTime += 1;
          }
        }, 1000);
      },
      goGame() {
        const uuid = `user${this.getUuuid(8, 16)}`;
        if (this.isOnline) {
          //在线对战
          if (this.waitTime != 0) {
            return;
          }
          sessionStorage.setItem("uuid", uuid);
          this.goOnlineRace();
          if (this.socket == null) {
            this.socket = new WebSocket("ws://47.99.241.87:1234");
          }
          // this.socket = new WebSocket('ws://127.0.0.1:8001');
          this.socket.onopen = () => {
            //状态为1证明握手成功
            if (this.socket.readyState == 1) {
              //发送uuid
              this.socket.send(uuid);
            }
          };
          //握手失败或者其他原因连接this.socket失败，则清除so对象并做相应提示操作
          this.socket.onclose = () => {
            this.socket = null;
          };
          this.socket.onmessage = msg => {
            if (msg.data.indexOf("login success") != -1) {
              //自己登录成功
              sessionStorage.setItem(
                "code",
                msg.data.substring(msg.data.indexOf("user"))
              );
            } else if (msg.data.indexOf("user") == 0) {
              //b方登录
              /**
               * 其他用户登录成功
               * 判断是否已经匹配了用户，
               * 未匹配则匹配用户开始对战
               * */
              if (!sessionStorage.getItem("user_type2")) {
                sessionStorage.setItem("user_type2", msg.data);
                //我匹配对方，我是红方
                sessionStorage.setItem("nowWho", 0);
                sessionStorage.setItem("isRed", true);
                sessionStorage.setItem("user_type", "a");
                sessionStorage.setItem("user_type2", "b");
                //发送匹配请求
                this.socket.send(
                  `${sessionStorage.getItem("uuid")}-${sessionStorage.getItem(
                  "user_type"
                )}-${JSON.stringify({
                  type: "user",
                  content: "yes",
                  user_type: sessionStorage.getItem("user_type")
                })}`
                );
                //开始游戏
                this.startGame();
                this.waitTime = 0;
                clearInterval(this.interval);
                //我方先手，开始计时
                this.countTimes();
              }
            } else if (msg.data == "offline" && !this.isGameEnd.value) {
              //对方刷新或关闭浏览器
              alert("对方已离线，你赢了");
              this.saveGameResult(sessionStorage.getItem("user_type"), uuid);
              this.gameOver();
            } else {
              //用户之间发送消息
              var data = JSON.parse(msg.data);
              switch (data.type) {
                case "user":
                  //用户发送消息给我
                  if (
                    data.content === "yes" &&
                    !sessionStorage.getItem("user_type2")
                  ) {
                    clearInterval(this.interval);
                    this.waitTime = 0;
                    //对方匹配我，我是黑方
                    sessionStorage.setItem("isRed", false);
                    sessionStorage.setItem("user_type", "b");
                    sessionStorage.setItem("nowWho", 1);
                    sessionStorage.setItem("user_type2", data.user_type);
                    //开始游戏
                    this.startGame();
                    this.countTimes2();
                  } else if (data.content == "out" && !isGameEnd.value) {
                    //对方1分钟未操作
                    alert("由于对方长时间未操作，您赢得了本局比赛");
                    this.isTimeUp = true;
                    this.saveGameResult(
                      sessionStorage.getItem("user_type"),
                      uuid
                    );
                    this.gameOver();
                  } else if (data.content == "nowinner") {
                    //对方要求和棋
                    var result = "";
                    if (confirm("您同意和棋吗？")) {
                      result = "agree-nowinner";
                    } else {
                      result = "refuse-nowinner";
                    }
                    this.socket.send(
                      `${sessionStorage.getItem("uuid")}-${sessionStorage.getItem(
                      "user_type"
                    )}-${JSON.stringify({
                      type: "user",
                      content: result,
                      user_type: sessionStorage.getItem("user_type")
                    })}`
                    );
                    //保存比赛结果
                    this.saveGameResult(
                      sessionStorage.getItem("user_type"),
                      uuid
                    );
                    this.gameOver();
                  } else if (data.content == "agree-nowinner") {
                    //同意和棋
                    alert("对方已同意和棋，对战结束");
                    this.gameOver();
                  } else if (data.content == "refuse-nowinner") {
                    //拒绝和棋
                    alert("对方拒绝和棋!");
                  } else if (data.content == "back") {
                    var result = "";
                    //对方要求悔棋
                    console.log(111);
                    if (confirm("您同意对方悔棋吗？")) {
                      result = "agree";
                      moveOnline(
                        this.preOperation.y,
                        this.preOperation.x,
                        this.preOperation.j,
                        this.preOperation.i,
                        this.preOperation.eat,
                        true,
                        true
                      );
                    } else {
                      result = "refuse";
                    }
                    this.socket.send(
                      `${sessionStorage.getItem("uuid")}-${sessionStorage.getItem(
                      "user_type"
                    )}-${JSON.stringify({
                      type: "user",
                      content: result,
                      user_type: sessionStorage.getItem("user_type")
                    })}`
                    );
                  } else if (data.content == "agree") {
                    //同意悔棋
                    moveOnline(
                      this.preOperation.y,
                      this.preOperation.x,
                      this.preOperation.j,
                      this.preOperation.i,
                      this.preOperation.eat,
                      true,
                      true
                    );
                  } else if (data.content == "refuse") {
                    //拒绝悔棋
                    alert("对方拒绝您悔棋!");
                  } else if (data.content == "quit") {
                    //对方认输
                    alert("对方已认输，您赢得了本局比赛");
                    this.saveGameResult(
                      sessionStorage.getItem("user_type"),
                      uuid
                    );
                    this.gameOver();
                  } else if (
                    data.user_type == sessionStorage.getItem("user_type2")
                  ) {
                    /**
                     * 对方走棋或者点击棋子
                     */
                    var content = JSON.parse(data.content);
                    if (content.chose) {
                      //选中棋子
                      onChoseOnline(9 - content.j, 8 - content.i, false, true);
                    } else {
                      //对方走棋,同步棋子位置
                      moveOnline(
                        9 - content.y,
                        8 - content.x,
                        9 - content.j,
                        8 - content.i,
                        content.eat,
                        false,
                        false
                      );
                      //对方走棋，我方重新计时
                      this.countTimes();
                      this.countTimes2("over");
                    }
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
          //发送请求确定该对战为人机
          this.$axios({
            url:`${process.env.VUE_APP_URL}index.php?r=api/add-socket-key`,
            method:'post',
            data:this.qs.stringify({
              a_user_socket_key:uuid,
              a_user_id:JSON.parse(localStorage.getItem('userInfo')).id
            })
          })
          //人机
          sessionStorage.setItem("user_type","a");
          sessionStorage.setItem("uuid",uuid);
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
          params: {
            isOnline: this.isOnline
          }
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
      goEndGame() {
        this.$router.push({
          path: "/endgame-challenge"
        });
      }
    },
    components: {
      [BackButton.name]: BackButton,
      [OnlineRacePanel.name]: OnlineRacePanel,
      [CheckPointPanel.name]: CheckPointPanel,
      [CheckPointLevel.name]: CheckPointLevel,
      LoseAlert
    }
  };
</script>
<style scoped>
  .chess-arena-wrapper {
    width: 100%;
    height: 100%;
    background: url(../assets/images/home-bg.png) no-repeat;
    background-size: 100% 100%;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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