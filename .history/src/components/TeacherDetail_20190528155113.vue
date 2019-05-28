<template>
  <div class="chess-tips-panel">
    <div class="chess-dialog-body chess-tips-body" :class="{'hide':!isShow}">
      <div class="tips-title"></div>
      <img src="../assets/images/close-tips.png" class="mail-box-close" @click="closeMyself">
      <article>
        <!-- <h3 class="article-title">{{noticeDetail.title}}</h3> -->
        <section class="article-content">
          <span>{{content}}</span>
        </section>
      </article>
    </div>
    <chess-mask :is-show="isShow"></chess-mask>
  </div>
</template>
<script>
import ChessMask from "./Mask";
export default {
  name: "chess-teacher-detail-panel",
  data() {
    return {};
  },
  methods: {
    closeMyself() {
      this.$emit("hide");
    }
  },
  props: ["is-show","content"],
  components: {
    [ChessMask.name]: ChessMask
  },
  mounted() {
    console.log('ok')
  }
};
</script>
<style scoped>
div.chess-tips-body {
  background: url(../assets/images/tips-bg2.png) no-repeat;
  background-size: 100% 90%;
  background-position: bottom;
}
div.tips-title {
  background: url(../assets/images/public-notice-title.png) no-repeat;
  background-size: 100% 100%;
  height: 7rem;
  width: 45%;
  position: absolute;
  left: 27.5%;
  top: 2rem;
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
h3.article-title,
p.info-source {
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
p.info-source {
  margin-top: 1rem;
  text-align: right;
}
</style>
