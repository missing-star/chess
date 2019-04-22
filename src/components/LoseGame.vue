<template>
  <div class="water-box">
    <div class="chess-dialog-body water-box-wrap" :class="{'hide':!isShow}">
      <!-- <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself"> -->

      <div class="water-box-mid">
        <img :src="avter" class="water-img" alt>
      </div>

      <div class="water-box-foot">
        <img src="../assets/images/弹框-退出.png" alt @click="goHistroy">
        <img src="../assets/images/弹框-再玩一次.png" alt @click="doAgain">
      </div>
    </div>
    <chess-mask :is-show="isShow"></chess-mask>
  </div>
</template>
<script>
import ChessMask from "./Mask";
export default {
  data() {
    return {};
  },
  methods: {
    closeMyself() {
      this.$emit("hide");
    },
    doAgain() {
      this.$emit("do-again");
    },
    goHistroy() {
      this.$router.push("/arena");
    }
  },
  props: ["is-show", "ImgShow", "avter"],
  components: {
    [ChessMask.name]: ChessMask
  }
};
</script>
<style scoped>
.water-box-wrap {
  background: url(../assets/images/弹框底.png) no-repeat;
  background-size: 100% 100%;
}

img.mail-box-close {
  right: -3rem;
  top: 2rem;
}
div.water-box-mid {
  width: 75%;
  text-align: center;
  margin: 36% 0 0 12%;
}

img.water-img {
  width: 80%;
  top: 52%;
  left: 16%;
}
.water-box-foot {
  width: 78%;
  position: absolute;
  bottom: 10%;
  left: 10%;
  text-align: center;
}
.water-box-foot img {
  width: 24%;
  margin: 0 10%;
  cursor: pointer;
}
</style>
