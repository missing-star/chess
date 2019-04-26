<template>
  <div class="chess-com-panel">
    <div class="chess-dialog-body chess-com-panel-body" :class="{'hide':!isShow}">
      <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
      <div class="content-wrapper-container">
        <div class="category-wrapper">
          <div
            @click="openPanel(item.id)"
            v-for="item in categoryList"
            :key="item.id"
            class="category-item pointer"
          >
            <img :src="item.icon" class="category-item icon">
          </div>
        </div>
        <div class="userinfo-wrapper">
          <img src="../assets/images/user-logo.png" class="user-logo">
          <p class="nickname">{{information.nickname}}</p>
          <div class="exp-wrapper">
            <p class="exp-title">经验值</p>
            <div class="exp-progressbar-wrapper">
              <div class="exp-progressbar" :style="information.experience/information.total_experience*100+'%' | filterWidth"></div>
            </div>
            <span class="exp-value">{{information.experience}}/{{information.total_experience}}</span>
          </div>
          <div class="userinfo-detail-wrapper">
            <p class="userinfo-item inline">棋力等级：{{information.grade_name}}</p>
            <p
              class="userinfo-item inline"
            >师傅：{{information.master_name?information.master_name:"暂无师傅"}}</p>
            <p class="userinfo-item inline">班级：{{information.class_nickname}}</p>
            <p class="userinfo-item inline">性别：{{information.sex==1?"男":"女"}}</p>
            <p class="userinfo-item block">老师：{{information.teacher_name}}</p>
            <p class="userinfo-item block">学校：{{information.mechanism_name}}</p>
          </div>
        </div>
      </div>
    </div>
    <chess-mask :is-show="isShow"></chess-mask>
  </div>
</template>
<script>
import ChessMask from "./Mask";
export default {
  name: "chess-com-panel",
  props: ["is-show", "information"],
  data() {
    return {
      categoryList: [
        { id: 0, icon: require("../assets/images/成长日志.png") },
        { id: 1, icon: require("../assets/images/我的成就.png") },
        { id: 2, icon: require("../assets/images/我的作业.png") },
        { id: 3, icon: require("../assets/images/自习室.png") }
      ]
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
          this.closeMyself();
          this.$emit("open-self");
          break;
      }
    }
  },
   filters: {
    filterWidth(chartWidth) {
      if (chartWidth == "0%") {
        chartWidth = "0%";
      }
      return {
        width: `${chartWidth}`
      };
    }
  },
};
</script>
<style scoped>
div.chess-com-panel-body {
  background: url(../assets/images/community-bg.png) no-repeat;
  background-size: 100% 100%;
}
div.content-wrapper-container {
  width: 82%;
  height: 80%;
  margin-top: 10%;
  margin-left: 8%;
  display: flex;
  align-items: center;
}
.category-wrapper {
  width: 40%;
  height: 85%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}
.category-item {
  width: 46%;
}
img.category-item.icon {
  width: 100%;
  height: 90%;
}
.userinfo-wrapper {
  width: 60%;
  padding-left: 10%;
  height: 100%;
  padding-top: 2%;
  text-align: center;
}
img.user-logo {
  width: 20%;
  max-height: 18%;
  border-radius: 50%;
  background: skyblue;
}
p.nickname {
  width: 40%;
  background: #c38e72;
  padding: 0.5rem;
  border-radius: 0.2rem;
  color: #fff;
  margin: 1rem auto;
}
.exp-progressbar-wrapper {
  width: 60%;
  height: 0.8rem;
  background: #fff;
  border-radius: 1rem;
}
.exp-progressbar {
  height: 100%;
  width: auto;
  background: #ff7226;
  border-radius: 1rem;
}
.exp-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #b87f61;
  height: 5%;
}
p.userinfo-item {
  background: #fcf3d6;
  border-radius: 0.2rem;
  margin: 2.2% 0;
  display: inline-flex;
  align-items: center;
  color: #b87f61;
  padding: 0.5rem;
  font-size: 0.9rem;
}
p.userinfo-item{
  height: 18%;
}
p.userinfo-item.inline {
  width: 45%;
}
p.userinfo-item.block {
  width: 100%;
}
.userinfo-detail-wrapper {
  margin-top: 1%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 50%;
}
</style>
