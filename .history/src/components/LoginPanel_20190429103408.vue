<template>
  <div class="chess-set-panel">
    <div class="chess-dialog-body chess-set-panel-body" :class="{'hide':!isShow}">
      <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
      <div class="content-wrapper">
        
      </div>
    </div>
    <chess-mask :is-show="isShow"></chess-mask>
  </div>
</template>
<script>
import ChessMask from "./Mask";
export default {
  name: "chess-login-panel",
  data() {
    return {
      
    };
  },
  methods: {
    closeMyself() {
      this.$emit("hide");
    }
};
</script>
<style scoped>
div.chess-set-panel-body {
  background: url(../assets/images/dialog-setting-bg.png) no-repeat;
  background-size: 100% 100%;
}
div.content-wrapper {
  width: 82%;
  height: 80%;
  background-size: 100% 100%;
  margin-top: 12%;
  margin-left: 8%;
}
section.user-wrapper {
  height: 50%;
  width: 35%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
}
section.user-wrapper::after {
  content: "";
  height: 75%;
  width: 3px;
  position: absolute;
  right: 0;
  background: #a97052;
  box-shadow: 0 1px 1px 0 #642c0f, inset 0 1px 1px 0 #d6997a;
  border-radius: 3px;
}
img.user-logo {
  width: 5rem;
  height: 5rem;
  background: skyblue;
  border-radius: 1rem;
  margin-top: 1rem;
}
p.username {
  color: #ffddaa;
  padding: 1rem;
  font-size: 1.5rem;
}
div.button-wrapper {
  border: none;
  border-radius: 2rem;
  width: 90%;
  margin: 0.2rem auto;
}
div.button-wrapper > img {
  width: 60%;
  cursor: pointer;
}
.user-and-time-wrapper {
  background: #995f41;
  box-shadow: 0 1px 2px 0 #d0997c, inset 0 1px 2px 0 #5c2d14;
  border-radius: 1rem;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
section.time-wrapper {
  height: 17rem;
  width: 60%;
  text-align: center;
  display: inline-block;
  vertical-align: top;
  margin-left: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
div.volume-and-music-wrapper {
 height: 50%;
}
section.volume-wrapper {
  width: 35%;
  height: 12rem;
  display: inline-block;
  padding-top: 2rem;
}
p.volume-set-title {
  text-align: center;
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
span.lower > img,
span.higher > img {
  width: 100%;
}
.volume-set-control {
  margin-top: 3rem;
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
  padding-top: 2rem;
}
p.bg-music-title {
  text-align: center;
  color: #f1e4c1;
}
.music-control-wrapper {
  margin-top: 3rem;
  text-align: center;
}
img.mail-box-close {
  top: 0;
}
.time-control-wrapper {
  margin-top: 1rem;
  height: 10rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
</style>
