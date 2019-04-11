<template>
  <div class="chess-tips-panel">
    <div class="chess-dialog-body chess-tips-body" :class="{'hide':!isShow}">
      <img src="../assets/images/close-tips.png" class="mail-box-close" @click="closeMyself">
      <article>
        <!-- <h3 class="article-title">标题</h3> -->
        <section class="article-content">
          <span>{{maildetail.content}}</span>
        </section>
      </article>
    </div>
    <chess-mask :is-show="isShow"></chess-mask>
  </div>
</template>
<script>
import ChessMask from "./Mask";
export default {
  name: "chess-tips-panel",
  data() {
    return {};
  },
  methods: {
    closeMyself() {
      this.$emit("hide");
    }
  },
  props: ["is-show", "maildetail"],
  components: {
    [ChessMask.name]: ChessMask
  },
  mounted() {
    
  }
};
</script>
<style scoped>
div.chess-tips-body {
  background: url(../assets/images/tips-bg.png) no-repeat;
  background-size: 100% 100%;
}
img.mail-box-close {
  width: 4rem;
  right: 3rem;
  top: 6rem;
}
article {
  width: 100%;
  height: 100%;
  padding: 12rem;
  color: #9d5e3c;
}
h3.article-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
section.article-content {
  height: 75%;
  overflow-x: hidden;
  overflow-y: scroll;
  line-height: 1.8rem;
  font-size: 1rem;
  letter-spacing: 1px;
  /* firfox非标准属性 */
  scrollbar-width: none;
  /* ie/edge */
  -ms-overflow-style: none;
}
section.article-content::-webkit-scrollbar {
  height: 0;
  width: 0;
}
</style>
