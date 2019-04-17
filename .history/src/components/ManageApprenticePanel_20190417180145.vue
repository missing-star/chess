<template>
  <div class="chess-manage-apprentice-panel">
    <div class="chess-dialog-body chess-manage-apprentice-body" :class="{'hide':!isShow}">
      <img src="images/close.png" class="mail-box-close" @click="closeMyself">
      <div class="content-wrapper-container">
        <ul class="apprentice-wrapper">
          <li v-for="apprentice in apprenticeList" :key="apprentice.id" class="apprentice-item">
            <div class="student-info-wrapper">
              <p class="student-name">{{apprentice.nickname}}</p>
              <div class="dashed-line"></div>
              <p class="active-card">激活卡：{{apprentice.crad}}</p>
            </div>
            <img
              src="images/detail-btn.png"
              @click="getApprenticeDetail(apprentice.id)"
              class="detail-icon pointer"
            >
          </li>
        </ul>
      </div>
      <div class="bottom-wrapper">
        <input
          @keyup.enter="getAllApprentices"
          type="text"
          placeholder="卡号/激活卡/姓名"
          class="search-input"
          v-model="keyword"
        >
      </div>
    </div>
    <chess-mask :is-show="isShow"></chess-mask>
  </div>
</template>
<script>
import ChessMask from "./Mask";
export default {
  name: "chess-manage-apprentice-panel",
  props: ["is-show"],
  data() {
    return {
      apprenticeList: [],
      keyword: ""
    };
  },
  components: {
    [ChessMask.name]: ChessMask
  },
  methods: {
    closeMyself() {
      this.$emit("hide");
    },
    openPanel(target) {
      switch (target) {
        case 0:
          this.closeMyself();
          this.$emit("open-log");
          break;
        case 1:
          this.closeMyself();
          this.$emit("open-ach");
          break;
          break;
        case 2:
          this.closeMyself();
          this.$emit("open-homework");
          break;
          break;
        case 3:
          break;
      }
    },
    getApprenticeDetail(id) {
      //徒弟详情
      this.closeMyself();
      this.$emit("open-student-info-detail", id);
    },
    //搜索
    getAllApprentices() {
      this.$axios({
        url: `${process.env.VUE_APP_URL}index.php?r=api-teach/master-student`,
        method: "post",
        data: this.qs.stringify({
          keyword: this.keyword
        })
      })
        .then(res => {
          this.apprenticeList = res.data.data;
        })
        .catch(err => {
          alert("服务器异常");
        });
    }
  },
  mounted() {
    this.getAllApprentices();
  }
};
</script>
<style scoped>
div.chess-manage-apprentice-body {
  background: url(images/apprentice-border-bg.png) no-repeat,
    url(images/apprentice-color-bg.png) no-repeat;
  background-size: 100% 100%, 101% 93%;
  background-position: center, center 121%;
}
div.content-wrapper-container {
  width: 84%;
  height: 80%;
  margin-top: 10%;
  margin-left: 6%;
  display: flex;
  align-items: center;
  position: relative;
}
img.mail-box-close {
  top: 0.2rem;
  right: -4rem;
}
ul.apprentice-wrapper {
  height: 85%;
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
  padding: 0 3rem;
  display: flex;
  align-items: flex-start;
  align-content:flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-bottom: 7rem;
}
ul.apprentice-wrapper::-webkit-scrollbar {
  width: 0;
}
li.apprentice-item:nth-child(2n+1) {
    margin-right: 1rem;
}
li.apprentice-item {
  width: 48%;
  background: #fbeecb;
  margin: 1rem 0;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
}
img.detail-icon {
  width: 3.5rem;
}
p.student-name {
  color: #753f22;
  font-size: 1.2rem;
}
.student-info-wrapper {
  border: 1px solid #e9ce84;
  height: 4rem;
  width: 76%;
  border-radius: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding: 0 0.8rem;
}
.dashed-line {
  width: 100%;
  height: 1px;
  border: 1px dashed #e9ce84;
  border-bottom: 0;
}
div.bottom-wrapper {
  background: url(images/bottom-bg.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  width: 96%;
  height: 12rem;
  bottom: 3%;
  left: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
}
input.search-input {
  border: none;
  background: #955c3e;
  box-shadow: 0 1px 1px 0 #d9ab93, inset 0 1px 1px 0 #552e19;
  border: none;
  border-radius: 1rem;
  height: 2rem;
  width: 15rem;
  background-image: url(images/search-icon.png);
  background-repeat: no-repeat;
  background-position: 2%;
  background-size: 1.2rem;
  padding-left: 2rem;
  font-size: 1.1rem;
  color: #764328;
  outline: 0;
}
input.search-input::-webkit-input-placeholder {
  color: #764328;
}
</style>
