<template>
  <div class="water-box">
    <div class="chess-dialog-body water-box-wrap" :class="{'hide':!isShow}">
      <img src="../../public/images/close.png" class="mail-box-close" @click="closeMyself">

      <img src="../../public/images/water-1.png" class="water-img" alt>

      <div class="water-box-foot">
        <img src="../../public/images/弹框-再玩一次.png" alt>
        <img src="../../public/images/弹框-下一关.png" alt>
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
    }
  },
  props: ["is-show"],
  components: {
    [ChessMask.name]: ChessMask
  }
};
</script>
<style scoped>
.water-box-wrap {
  background: url(../../public/images/弹框-喷水.png) no-repeat;
  background-size: 100% 100%;
}

img.mail-box-close {
  right: -3rem;
  top: 8rem;
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
