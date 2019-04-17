<template>
  <div class="create-sucess">
    <div class="chess-dialog-body login-alert" :class="{'hide':!isShow}">
      <img src="../assets/images/提示-注册.png" alt>
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
div.chess-dialog-body {
  z-index: 3;
}
div.chess-mask {
  z-index: 2;
}
div.login-alert {
  display: flex;
  align-items: center;
  justify-content: center;
}
div.login-alert img {
  width: 63%;
  height: 54%;
}
</style>
