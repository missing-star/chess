<template>
  <div class="water-box">
    <div class="chess-dialog-body1 water-box-wrap" :class="{'hide':!isShow}">
      <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">

      <img :src="waterImg" class="water-img" alt>

      <div class="water-box-foot">
        <img :src="againImg" alt @click="doAgain">
        <img :src="nextImg" alt @click="nextLevel">
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
    doAgain(){
      this.$emit("do-again");
    },
      nextLevel(){
      this.$emit("nextLevel");
    },
    
  },
  props: ["is-show","waterImg","againImg","nextImg"],
  components: {
    [ChessMask.name]: ChessMask
  }
};
</script>
<style scoped>
.water-box-wrap {
  background: url(../assets/images/弹框-喷水.png) no-repeat;
  background-size: 100% 100%;
}

img.mail-box-close {
  top: 20%;
}

img.water-img {
  width: 67%;
  position: absolute;
  top: 57%;
  left: 16%;
}

.water-box-foot {
  position: absolute;
  bottom: 10%;
  left: 18%;
}
.water-box-foot img {
  width: 24%;
  margin: 0 10%;
  cursor: pointer;
}
</style>
