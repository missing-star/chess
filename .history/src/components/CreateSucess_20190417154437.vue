<template>
  <div class="create-sucess">
    <div class="chess-dialog-body create-sucess-wrap" :class="{'hide':!isShow}" v-if="show">
      <img :src="avter" alt class="create-sucess-img">
      <img src="../assets/images/将帅.png" alt class="create-cucess-bot">
    </div>

    <div class="chess-dialog-body create-sucess-wrap1" :class="{'hide':!isShow}" v-if="show1">
      <div class="create-sucess-top">
        <img :src="avter" alt class="create-sucess-img1">
      </div>
      <img :src="btnImg" alt class="create-cucess-bot1">
    </div>
    <chess-mask :is-show="isShow"></chess-mask>
  </div>
</template>
<script>
import ChessMask from "./Mask";
export default {
  data() {
    return {
    //   show: false,
    //   show1: false
    };
  },
  methods: {
    closeMyself() {
      this.$emit("hide");
    }
  },
  props: ["is-show", "avter", "btnImg", "show", "show1"],
  components: {
    [ChessMask.name]: ChessMask
  }
};
</script>
<style scoped>
div.create-sucess-wrap {
  background: url(../assets/images/弹框底-红书.png) no-repeat;
  background-size: 100% 100%;
}

img.create-sucess-img {
  position: absolute;
  top: 36%;
  left: 26%;
  width: 45%;
}
img.create-cucess-bot {
  position: absolute;
  bottom: 25%;
  right: 13%;
  width: 16%;
}

div.create-sucess-wrap1 {
  background: url(../assets/images/弹框底-红书.png) no-repeat;
  background-size: 100% 100%;
}

div.create-sucess-top {
  width: 50%;
  height: 50%;
  text-align: center;
  margin: 17% 0 0 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}
img.create-sucess-img1 {
  width: 73%;
}
img.create-cucess-bot1 {
  position: absolute;
  bottom: 26%;
  right: 22%;
  width: 7%;
}
</style>
