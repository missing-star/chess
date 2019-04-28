<template>
  <div class="chess-set-panel">
    <div class="chess-dialog-body chess-set-panel-body" :class="{'hide':!isShow}">
      <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
      <div class="content-wrapper">
        <div class="user-and-time-wrapper">
          <section class="user-wrapper">
            <img @click="toggleShow" src="../assets/images/user-logo.png" class="user-logo pointer">
            <p class="username">{{studentInfo.nickname}}</p>
            <div class="button-wrapper">
              <img src="../assets/images/exit-login.png" alt="退出登录" @click="loginOut">
            </div>
            <div class="button-wrapper">
              <img src="../assets/images/change-pwd.png" alt="修改密码">
            </div>
          </section>
          <section class="time-wrapper">
            <p class="ajust-game-title">调整游戏时间</p>
            <div class="dashed-line"></div>
            <div class="time-control-wrapper">
              <chess-switch @trigger="triggerTime" :current-time-value="currentTimeValue" time-value="30" icon="30.png"
                styles="width:48%;" active-title="开启30分钟" un-active-title="关闭30分钟"></chess-switch>
              <chess-switch @trigger="triggerTime" :current-time-value="currentTimeValue" time-value="60" icon="60.png"
                styles="width:48%;" active-title="开启60分钟" un-active-title="关闭60分钟"></chess-switch>
              <chess-switch @trigger="triggerTime" :current-time-value="currentTimeValue" time-value="90" icon="90.png"
                styles="width:48%;" active-title="开启90分钟" un-active-title="关闭90分钟"></chess-switch>
              <chess-switch @trigger="triggerTime" :current-time-value="currentTimeValue" time-value="120"
                icon="120.png" styles="width:48%;" active-title="开启120分钟" un-active-title="关闭120分钟"></chess-switch>
            </div>
          </section>
        </div>
        <div class="volume-and-music-wrapper">
          <section class="volume-wrapper">
            <p class="volume-set-title">音量</p>
            <div class="volume-set-control">
              <span class="lower" @click="controlVolme(0)">
                <img src="../assets/images/smaller.png">
              </span>
              <input v-model="currentVolume" type="range" class="volume-range" min="0" max="100" step="1">
              <span class="higher" @click="controlVolme(1)">
                <img src="../assets/images/bigger.png">
              </span>
            </div>
          </section>
          <section class="music-wrapper">
            <p class="bg-music-title">背景音乐</p>
            <div class="music-control-wrapper">
              <chess-switch @trigger="triggerBgm" icon="voice.png" styles="width:7rem;" active-title="开启"
                un-active-title="关闭"></chess-switch>
            </div>
          </section>
        </div>
      </div>
    </div>
    <chess-mask :is-show="isShow"></chess-mask>
    <my-upload field="img"
		:width="300"
		:height="300"
		url="/upload"
		:params="params"
		:headers="headers"
		:value.sync="show"
		img-format="png"></my-upload>
	<img :src="imgDataUrl">
  </div>
</template>
<script>
  import ChessMask from "./Mask";
  import Switch from "./Switch";
  import myUpload from 'vue-image-crop-upload/upload-1.vue';
  export default {
    name: "chess-set-panel",
    data() {
      return {
        currentVolume: 50,
        currentTimeValue: "",
        show: false,
        params: {
          token: '123456798',
          name: 'avatar'
        },
        headers: {
          smail: '*_~'
        },
        imgDataUrl: '' // the datebase64 url of created image
      };
    },
    events: {
      /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess(imgDataUrl, field) {
        console.log('-------- crop success --------');
        this.imgDataUrl = imgDataUrl;
      },
      /**
       * upload success
       *
       * [param] jsonData   服务器返回数据，已进行json转码
       * [param] field
       */
      cropUploadSuccess(jsonData, field) {
        console.log('-------- upload success --------');
        console.log(jsonData);
        console.log('field: ' + field);
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail(status, field) {
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      }
    },
    methods: {
      toggleShow() {
        this.show = !this.show;
      },
      closeMyself() {
        this.$emit("hide");
      },
      controlVolme(type) {
        if (type == 0) {
          //reduce
          this.currentVolume - 5 < 0 ?
            (this.currentVolume = 0) :
            (this.currentVolume -= 5);
        } else {
          //add
          this.currentVolume + 5 > 100 ?
            (this.currentVolume = 100) :
            (this.currentVolume += 5);
        }
      },
      triggerTime(timeValue) {
        this.currentTimeValue = timeValue;
      },
      triggerBgm(isClose) {
        this.$emit("control-bgm", isClose);
      },
      loginOut() {
        this.$emit("login-out");
      }
    },
    props: ["is-show", "studentInfo"],
    components: {
      [ChessMask.name]: ChessMask,
      [Switch.name]: Switch,
      'my-upload': myUpload
    },
    watch: {
      currentVolume() {
        this.$emit("change-volume", this.currentVolume / 100);
      }
    },
    mounted() {
      this.$emit("change-volume", this.currentVolume / 100);
    }
  };
</script>
<style scoped>
  div.chess-set-panel-body {
    background: url(../assets/images/dialog-setting-bg.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div.content-wrapper {
    width: 80%;
    height: 80%;
    background-size: 100% 100%;
  }

  section.user-wrapper {
    background: #995f41;
    box-shadow: 0 1px 2px 0 #d0997c, inset 0 1px 2px 0 #5c2d14;
    border-radius: 1rem;
    width: 35%;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    vertical-align: top;
  }

  img.user-logo {
    width: 4em;
    height: 4em;
    background: skyblue;
    border-radius: 0.8rem;
    margin-top: 5%;
  }

  p.username {
    color: #ffddaa;
    padding: 5%;
    font-size: 120%;
  }

  div.button-wrapper {
    border: none;
    border-radius: 2rem;
    width: 90%;
    margin: 0.2rem auto;
    text-align: center;
  }

  div.button-wrapper>img {
    width: 80%;
    cursor: pointer;
  }

  section.time-wrapper {
    background: #995f41;
    box-shadow: 0 1px 2px 0 #d0997c, inset 0 1px 2px 0 #5c2d14;
    border-radius: 1rem;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 5%;
  }

  div.dashed-line {
    background: url(../assets/images/dot.png);
    height: 0.5rem;
    width: 83%;
    background-size: contain;
    margin: 0 auto;
  }

  p.ajust-game-title {
    color: #ffddaa;
    padding: 1rem;
    font-size: 1.5rem;
  }

  section.volume-wrapper {
    width: 35%;
    height: 12rem;
    display: inline-block;
    padding-top: 5%;
  }

  p.volume-set-title {
    text-align: center;
    font-size: 1.5rem;
    color: #f1e4c1;
  }

  span.lower,
  span.higher {
    width: 3.5rem;
    border-radius: 50%;
    display: inline-block;
    padding: 0.5rem;
    color: #f1e4c1;
    cursor: pointer;
  }

  span.lower>img,
  span.higher>img {
    width: 100%;
  }

  .volume-set-control {
    margin-top: 15%;
    display: flex;
    align-items: center;
  }

  input[type="range"] {
    -webkit-appearance: none !important;
    height: 3.5rem;
    background: transparent;
    width: 60%;
    margin: 0 1%;
  }

  /*input轨道 chrom Safari */
  input[type="range"]::-webkit-slider-runnable-track {
    height: 0.65rem;
    background-image: linear-gradient(-1deg, #ffa635 0%, #ff772c 100%);
    box-shadow: 0 -1px 1px 0 #894e31, inset 0 -1px 1px 0 #ff9619,
      inset 0 2px 4px 0 #ad4400;
    border-radius: 0.65rem;
  }

  /*input轨道 firfox */
  input[type="range"]::-moz-range-track {
    height: 0.65rem;
    background-image: linear-gradient(-1deg, #ffa635 0%, #ff772c 100%);
    box-shadow: 0 -1px 1px 0 #894e31, inset 0 -1px 1px 0 #ff9619,
      inset 0 2px 4px 0 #ad4400;
    border-radius: 0.65rem;
  }

  /*input轨道 ie */
  input[type="range"]::-ms-track {
    height: 0.65rem;
    border-radius: 0.65rem;
    background-image: linear-gradient(-1deg, #ffa635 0%, #ff772c 100%);
    box-shadow: 0 -1px 1px 0 #894e31, inset 0 -1px 1px 0 #ff9619,
      inset 0 2px 4px 0 #ad4400;
    border-radius: 0.65rem;
  }

  input[type="range"]:focus {
    outline: 0;
  }

  /* 滑块 chrom safari */
  input[type="range"]::-webkit-slider-thumb {
    cursor: pointer;
    -webkit-appearance: none !important;
    height: 2.5rem;
    width: 2.5rem;
    position: relative;
    top: -0.8rem;
    background-image: url(../assets/images/speaker.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }

  /*滑块 firfox */
  input[type="range"]::-moz-range-thumb {
    cursor: pointer;
    -webkit-appearance: none !important;
    height: 3rem;
    width: 3rem;
    background: transparent;
    border: none;
    position: relative;
    top: -0.825rem;
    background-image: url(../assets/images/speaker.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }

  /*滑块 ie/edge */
  input[type="range"]::-ms-thumb {
    cursor: pointer;
    -webkit-appearance: none !important;
    height: 3rem;
    width: 3rem;
    position: relative;
    top: -0.825rem;
    background-image: url(../assets/images/speaker.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }

  section.volume-wrapper,
  section.music-wrapper {
    display: inline-block;
    vertical-align: top;
  }

  section.music-wrapper {
    width: 60%;
    margin-left: 5%;
    width: 60%;
    height: 12rem;
    padding-top: 5%;
  }

  p.bg-music-title {
    text-align: center;
    font-size: 1.5rem;
    color: #f1e4c1;
  }

  .music-control-wrapper {
    margin-top: 10%;
    text-align: center;
  }

  img.mail-box-close {
    top: 0;
  }

  .time-control-wrapper {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    flex: 1;
    width: 80%;
  }

  .user-and-time-wrapper {
    height: 60%;
    display: flex;
  }
</style>