<template>
  <div class="chess-arena-wrapper">
    <div class="category-wrapper">
      <div class="category-item pointer left" @click="openOnlineRacePanel">
        <button class="online-race pointer"></button>
      </div>
      <div class="category-item pointer right" @click="openCheckPointLevelPanel">
        <button class="check-point pointer"></button>
      </div>
    </div>
    <chess-online-race-panel
      :fightLevel="fightLevel"
      :fightLogo="fightLogo"
      :fightName="fightName"
      @start-fight="startGame"
      :is-match-success="isMatchSuccess"
      :wait-time="waitTime"
      @start-game="goGame"
      @hide="hideOnlineRacePanel"
      :is-show="showOnlineRacePanel"
    ></chess-online-race-panel>
    <chess-check-point-panel
      :level="selectedLevel"
      :begin="beginNum"
      :end="endNum"
      :show-title="selectedTitle"
      @hide="hideCheckPointPanel"
      :is-show="showCheckPointPanel"
    ></chess-check-point-panel>
    <chess-check-point-level
      @hide="hideCheckPointLevelPanel"
      @open-check-point-panel="openCheckPointPanel"
      :is-show="showCheckPointLevelPanel"
    ></chess-check-point-level>

    <div class="back-btn-wrapper">
      <img
        v-if="waitTime < 15"
        :disabled="waitTime != 0"
        @click="gohome"
        src="../assets/images/back.png"
        class="back-icon pointer"
      >
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

    <create-sucess
      :is-show="showCreateSucess"
      :avter="avter1"
      :btnImg="btnImg"
      :show1="show1"
      :show="show"
    ></create-sucess>
  </div>
</template>
<script>
import BackButton from "../components/BackButton";
import OnlineRacePanel from "../components/OnlineRacePanel";
import CheckPointPanel from "../components/CheckPointPanel";
import CheckPointLevel from "../components/ChessCheckPointLevel";
import LoseAlert from "../components/LoseAlert"; //失败提示
import CreateSucess from "../components/CreateSucess"; //失败提示
import {
  SearchEngine,
  countTimes,
  countTimes2,
  saveGameResult,
  preOperation,
  gameOver,
  isGameEnd,
  isMove
} from "../assets/js/online/CChess";
export default {
  data() {
    return {
      cloudList: [
        require("../assets/images/cloud-1.png"),
        require("../assets/images/cloud-2.png"),
        require("../assets/images/cloud-3.png"),
        require("../assets/images/cloud-4.png"),
        require("../assets/images/cloud-5.png"),
        require("../assets/images/cloud-2.png"),
        require("../assets/images/cloud-3.png"),
        require("../assets/images/cloud-4.png"),
        require("../assets/images/cloud-5.png"),
        require("../assets/images/cloud-2.png"),
        require("../assets/images/cloud-3.png"),
        require("../assets/images/cloud-4.png"),
        require("../assets/images/cloud-5.png"),
        require("../assets/images/cloud-2.png"),
        require("../assets/images/cloud-3.png"),
        require("../assets/images/cloud-4.png"),
        require("../assets/images/cloud-5.png"),
        require("../assets/images/cloud-2.png"),
        require("../assets/images/cloud-3.png"),
        require("../assets/images/cloud-4.png"),
        require("../assets/images/cloud-5.png")
      ],
      //是否匹配成功
      isMatchSuccess: false,
      showOnlineRacePanel: false,
      showCheckPointPanel: false,
      showCheckPointLevelPanel: false,
      showLostAlert: false,
      showCreateSucess: false,
      show1: false,
      show: true,
      avter1: "",
      btnImg: "",
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
      beginNum: "",
      endNum: "",
      ImgShow: true,
      machineNams: [
        "盛鹏",
        "晨康",
        "锐弘",
        "禄贤",
        "炳翰",
        "强鑫",
        "权皓",
        "鹏喆",
        "鸿峰",
        "梓勇",
        "远谷",
        "锐升",
        "乘沛",
        "仕博",
        "礼强",
        "谷泽",
        "祥祯",
        "延喆",
        "德翰",
        "文烁材凯",
        "胤鑫",
        "韦鹤",
        "宇翰",
        "祜欣",
        "尧恒",
        "平升",
        "成柏",
        "暄中",
        "龙畅",
        "逸辞",
        "峰畅",
        "晨琛",
        "盛斌",
        "钊盛",
        "伟博",
        "浩晨",
        "阳坤",
        "祜平",
        "伟佳锋宇",
        "斌郁",
        "颜帆",
        "轩林",
        "喆奇",
        "凡胤",
        "欣潍",
        "帆远",
        "延瑞",
        "颜祥",
        "信盛",
        "涛邦",
        "良侠",
        "林暄",
        "康安",
        "强诚",
        "鹏良",
        "凡海",
        "强锦",
        "安琛谷禄",
        "禧康",
        "欣成",
        "凯楷",
        "允浩",
        "桓振",
        "杰弘",
        "凯运",
        "强哲",
        "鸿晓",
        "沛远",
        "帆帆",
        "中弘",
        "宇彬",
        "皓暄",
        "晨烁",
        "康浩",
        "梓日",
        "远权",
        "畅皓然腾",
        "骏栋",
        "骞然",
        "诚允",
        "锋中",
        "芃钊",
        "坤佑",
        "振权",
        "加斌",
        "潍浩",
        "允盛",
        "骞谛",
        "卓烁",
        "坤延",
        "锐星",
        "禄延",
        "彬康",
        "德博",
        "允枫",
        "龙弘升晖",
        "凡祯",
        "辞胤",
        "伟福",
        "仕祥",
        "鸿彬",
        "梓辞",
        "佑欣",
        "荣林",
        "驰祜",
        "延梁",
        "天中",
        "德晖",
        "年杰",
        "浩栋",
        "辞逸",
        "起运",
        "振禄",
        "锋海",
        "康涛宇康",
        "邦晓",
        "禧斌",
        "辞延",
        "彬翰",
        "恒鹏",
        "濡乘",
        "晨凯",
        "琛皓",
        "斌鑫",
        "家帆",
        "锋颜",
        "宇瑞",
        "博贤",
        "安礼",
        "梓泽",
        "然锟",
        "振吉",
        "盛伟",
        "驰皓仕欣",
        "坤鹏",
        "起贤",
        "鸿皓",
        "允强",
        "喆澄",
        "荣铭",
        "轩伟",
        "家濡",
        "瑞家",
        "晖畅",
        "良柔",
        "日翰",
        "斌翱",
        "瑞林",
        "谷龙",
        "阳荣",
        "延彬",
        "然谛",
        "喆涛楷辞",
        "颜平",
        "谛天",
        "起海",
        "谷杞",
        "加谛",
        "鸿德",
        "震翱",
        "驰涛",
        "禧鹏",
        "杰栋",
        "升杞",
        "梓阳",
        "浩振",
        "吉颜",
        "良子",
        "文邦",
        "斌信",
        "凡锐",
        "宇郁家晨",
        "升钊",
        "澄澄",
        "福恒",
        "盛运",
        "权琛",
        "骞瑞",
        "林喆",
        "郁梓",
        "尧胤",
        "天初",
        "卓畅",
        "翰延",
        "峰然",
        "杞祜",
        "烁俊",
        "卓俊",
        "楷晖",
        "谛子",
        "家瑞锟腾",
        "澄文",
        "俊平",
        "振泽",
        "晓尧",
        "韦祜",
        "彬欣",
        "家宇",
        "禄逸",
        "沛卓",
        "轩鹏",
        "权嘉",
        "海梓",
        "年欣",
        "诚龙",
        "槐暄",
        "晨日",
        "林鑫",
        "侠柏",
        "瑞安彬卓",
        "郁礼",
        "祥博",
        "槐潍",
        "诚凯",
        "沛嘉",
        "林斌",
        "天卓",
        "锦畅",
        "奇锦",
        "沛起",
        "中槐",
        "骏邦",
        "初博",
        "日博",
        "驰彬",
        "海谷",
        "鑫谛",
        "盛佳",
        "帝潍娅文",
        "梅文",
        "涵凡",
        "玉芳",
        "露家",
        "敏函",
        "克萱",
        "美彩",
        "娅鹤",
        "娅蕾",
        "函格",
        "菲彬",
        "栀莲",
        "琳茹",
        "妮玲",
        "蓓克",
        "橘璇",
        "弦娜",
        "敏华",
        "玲敏",
        "灵媛旭珠",
        "菲杉",
        "楠惠",
        "鑫依",
        "昭婧",
        "菡芳",
        "璐旭",
        "桐梦",
        "莉呈",
        "桂蕾",
        "洁香",
        "妮钰",
        "彩韵",
        "芸呈",
        "桂华",
        "梦芸",
        "蓓玥",
        "韵萱",
        "珍昕",
        "雯梦",
        "蔚彤鸿莉",
        "漫春",
        "柔采",
        "凌婷",
        "婷云",
        "欢丽",
        "美怡",
        "芸林",
        "梦月",
        "婧彦",
        "弦欢",
        "茹媛",
        "蓓华",
        "珠楠",
        "歆月",
        "媛昕",
        "可桃",
        "惠媛",
        "钰雅",
        "露玉",
        "杉凌妮柏",
        "璐寒",
        "梦霞",
        "彩薇",
        "颖梓",
        "月梦",
        "茜柔",
        "淑云",
        "栀柔",
        "桃敏",
        "林妮",
        "梓美",
        "涵曦",
        "灵珠",
        "瑶橘",
        "媛栀",
        "钰莉"
      ],
      uuid: "",
      fightName: "？",
      fightLogo: require("../assets/images/user-logo.png"),
      fightLevel: "？",
      selectedTitle: ""
    };
  },
  methods: {
    getRandom(flag) {
      let index = Math.random() > 0.5 ? -1 : 1;
      if (flag) {
        return Math.random() * 200 * index;
      } else {
        return Math.random() * 5;
      }
    },
    getStyle(index, flag) {
      if (flag) {
        return {
          right: this.getRandom(true) * index + "px",
          top: this.getRandom() * index + "px"
        };
      } else {
        return {
          left: this.getRandom(true) * index + "px",
          top: this.getRandom() * index + "px"
        };
      }
    },
    gohome() {
      this.$router.push("/home");
    },
    goClose() {
      this.showLostAlert = false;
    },
    hideLostAlert() {
      this.showLostAlert = false;
    },
    // 随机获得人机的名称
    getMachineName() {
      this.fightName = this.machineNams[Math.floor(Math.random() * 306)];
      this.fightLevel = "1级";

      sessionStorage.setItem("fightName", this.fightName);
      sessionStorage.setItem(
        "fightLogo",
        require("../assets/images/user-logo.png")
      );
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
    openCheckPointPanel(level, stage, title, start, end) {
      this.selectedLevel = level;
      this.selectedTitle = title;
      this.beginNum = start;
      this.endNum = end;
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
          this.goGame(true);
        } else {
          this.waitTime += 1;
        }
      }, 1000);
    },
    getPersonInfo(id) {
      this.$axios({
        url: `${
          process.env.VUE_APP_URL
        }index.php?r=api-teach/select-student-detail`,
        method: "post",
        data: this.qs.stringify({
          student_id: id
        })
      })
        .then(res => {
          if (res.data.status == 1) {
            this.fightName = res.data.data.nickname;
            this.fightLogo = process.env.VUE_APP_URL + res.data.data.picture;
            this.fightLevel = res.data.data.grade_name;
            sessionStorage.setItem("fightName", this.fightName);
            sessionStorage.setItem("fightLogo", this.fightLogo);
            sessionStorage.setItem("fightLevel", this.fightLevel);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goGame(flag) {
      if (!flag) {
        //非人机
        this.uuid = `user${this.getUuuid(8, 16)}`;
      }
      if (this.isOnline) {
        //在线对战
        if (this.waitTime != 0) {
          return;
        }
        sessionStorage.setItem("uuid", this.uuid);
        this.goOnlineRace();
        if (this.socket == null) {
          this.socket = new WebSocket("ws://47.99.241.87:1234");
        }
        // this.socket = new WebSocket('ws://127.0.0.1:8001');
        this.socket.onopen = () => {
          //状态为1证明握手成功
          if (this.socket.readyState == 1) {
            //发送uuid
            this.socket.send(
              JSON.stringify({
                uid: this.uuid,
                userId: JSON.parse(localStorage.getItem("userInfo")).id
              })
            );
          }
        };
        //握手失败或者其他原因连接this.socket失败，则清除so对象并做相应提示操作
        this.socket.onclose = () => {
          this.socket = null;
        };
        this.socket.onmessage = msg => {
          if (msg.data.indexOf("b login success") != -1) {
            let fightId = JSON.parse(msg.data.substring(15)).userId;
            this.getPersonInfo(fightId);
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
              // 将自己的用户ID发送给黑方，用来获取用户昵称，头像信息
              this.socket.send(
                `${sessionStorage.getItem("uuid")}-${sessionStorage.getItem(
                  "user_type"
                )}-${JSON.stringify({
                  type: "user",
                  content:
                    "getuser" +
                    JSON.stringify({
                      userId: this.userId
                    }),
                  user_type: sessionStorage.getItem("user_type")
                })}`
              );
              //开始游戏
              this.isMatchSuccess = true;
              this.waitTime = 0;
              clearInterval(this.interval);
              //我方先手，开始计时
              // this.countTimes();
            }
          } else if (msg.data.indexOf("login success") != -1) {
            //自己登录成功
            sessionStorage.setItem(
              "code",
              msg.data.substring(msg.data.indexOf("user"))
            );
          } else if (msg.data == "offline" && !this.isGameEnd.value) {
            isMove.value = 12;
            //对方刷新或关闭浏览器
            // alert("对方已离线，你赢了");
            // this.saveGameResult(sessionStorage.getItem("user_type"), this.uuid);
            // this.gameOver();
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
                  this.isMatchSuccess = true;
                  // this.startGame();
                  // this.countTimes2();
                } else if (data.content.indexOf("getuser") != -1) {
                  //用户发送userID给对方
                  this.getPersonInfo(
                    JSON.parse(data.content.substring(7)).userId
                  );
                } else if (data.content == "out" && !isGameEnd.value) {
                  //对方1分钟未操作
                  isMove.value = 13;
                  // alert("由于对方长时间未操作，您赢得了本局比赛");
                  // this.isTimeUp = true;
                  // this.saveGameResult(
                  //   sessionStorage.getItem("user_type"),
                  //   this.uuid
                  // );
                  // this.gameOver();
                } else if (data.content == "nowinner") {
                  isMove.value = 15;
                  //对方要求和棋
                  // var result = "";
                  // if (confirm("您同意和棋吗？")) {
                  //   result = "agreenowinner";
                  // } else {
                  //   result = "refusenowinner";
                  // }
                  // this.socket.send(
                  //   `${sessionStorage.getItem("uuid")}-${sessionStorage.getItem(
                  //     "user_type"
                  //   )}-${JSON.stringify({
                  //     type: "user",
                  //     content: result,
                  //     user_type: sessionStorage.getItem("user_type")
                  //   })}`
                  // );
                  // if (result == "agreenowinner") {
                  //   //保存比赛结果
                  //   this.saveGameResult(
                  //     sessionStorage.getItem("user_type"),
                  //     this.uuid
                  //   );
                  //   this.gameOver();
                  // }
                } else if (data.content == "agreenowinner") {
                  //同意和棋

                  isMove.value = 16;
                  // alert("对方已同意和棋，对战结束");
                  // this.gameOver();
                } else if (data.content == "refusenowinner") {
                  //拒绝和棋
                   isMove.value = 17;
                  // alert("对方拒绝和棋!");
                } else if (data.content == "back") {
                  // var result = "";

                  isMove.value = 14;
                  //对方要求悔棋
                  // if (confirm("您同意对方悔棋吗？")) {
                  //   result = "agree";
                  //   moveOnline(
                  //     this.preOperation.y,
                  //     this.preOperation.x,
                  //     this.preOperation.j,
                  //     this.preOperation.i,
                  //     this.preOperation.eat,
                  //     true,
                  //     true
                  //   );
                  // } else {
                  //   result = "refuse";
                  // }
                  // this.socket.send(
                  //   `${sessionStorage.getItem("uuid")}-${sessionStorage.getItem(
                  //     "user_type"
                  //   )}-${JSON.stringify({
                  //     type: "user",
                  //     content: result,
                  //     user_type: sessionStorage.getItem("user_type")
                  //   })}`
                  // );
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
                  isMove.value = 18;
                  // alert("对方拒绝您悔棋!");
                } else if (data.content == "quit") {
                  //对方认输
                  isMove.value = 11;
                  // alert("对方已认输，您赢得了本局比赛");
                  // this.saveGameResult(
                  //   sessionStorage.getItem("user_type"),
                  //   this.uuid
                  // );
                  // this.gameOver();
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
                    // this.countTimes();
                    // this.countTimes2("over");
                  }
                }
                break;
              case "logout":
                if (this.isTimeUp || isFailed) {
                  //对方未操作结束比赛或者自己输掉比赛
                  return;
                }
                alert("对方已离线，你赢了");
                this.saveGameResult(
                  sessionStorage.getItem("user_type"),
                  this.uuid
                );
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
          url: `${process.env.VUE_APP_URL}index.php?r=api/add-socket-key`,
          method: "post",
          data: this.qs.stringify({
            a_user_socket_key: this.uuid,
            a_user_id: JSON.parse(localStorage.getItem("userInfo")).id,
            b_user_socket_key: `user${this.getUuuid(8, 16)}`
          })
        });
        //人机
        sessionStorage.setItem("user_type", "a");
        sessionStorage.setItem("uuid", this.uuid);
        this.isOnline = false;
        sessionStorage.setItem("isRed", true);
        sessionStorage.setItem("nowWho", 0);
        this.searchEngine = new this.SearchEngine(1);
        this.isMatchSuccess = true;
        this.getMachineName();
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
  watch: {
    isMatchSuccess() {
      if (this.isMatchSuccess) {
        setTimeout(() => {
          this.startGame();
        }, 2000);
      }
    }
  },
  components: {
    [BackButton.name]: BackButton,
    [OnlineRacePanel.name]: OnlineRacePanel,
    [CheckPointPanel.name]: CheckPointPanel,
    [CheckPointLevel.name]: CheckPointLevel,
    LoseAlert,
    CreateSucess
  }
};
</script>
<style scoped>
.chess-arena-wrapper {
  width: 100%;
  height: 100%;
  height: 100%;
  background: url(../assets/images/arena-bg.png) no-repeat,
    url(../assets/images/mountain-light.png) no-repeat,
    url(../assets/images/mountain-dark.png) no-repeat,
    url(../assets/images/sky.png) no-repeat;
  background-size: 100% 100%, 100%, 100%, 100%;
  background-position: center, center 8%, center 8%, top;
  overflow: hidden;
  display: flex;
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
  width: 100%;
  height: 9%;
  position: absolute;
  bottom: 23%;
}

.category-item {
  width: 30%;
  height: 100%;
  background: transparent;
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
button.online-race {
  background: url(../assets/images/online-race.png) no-repeat;
  background-size: 100% 100%;
  width: 50%;
  height: 100%;
  border: none;
  outline: 0;
}
button.online-race:active {
  background: url(../assets/images/online-race-active.png) no-repeat;
  background-size: 100% 100%;
  width: 50%;
  height: 100%;
  border: none;
  outline: 0;
}
button.check-point {
  background: url(../assets/images/chuangguan.png) no-repeat;
  background-size: 100% 100%;
  width: 50%;
  height: 100%;
  border: none;
  outline: 0;
}
button.check-point:active {
  background: url(../assets/images/chuangguan-active.png) no-repeat;
  background-size: 100% 100%;
  width: 50%;
  height: 100%;
  border: none;
  outline: 0;
}
</style>