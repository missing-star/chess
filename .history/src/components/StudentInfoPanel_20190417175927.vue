<template>
  <div class="chess-student-info-panel">
    <div class="chess-dialog-body chess-student-info-body" :class="{'hide':!isShow}">
      <img src="./images/close.png" class="mail-box-close" @click="closeMyself">
      <div class="content-wrapper-container">
        <div class="student-info-wrapper">
          <div class="student-logo-wrapper">
            <img src="./images/user-logo.png" class="user-logo">
            <p class="username">{{pupil.nickname}}</p>
          </div>
          <div class="student-detail-info-wrapper">
            <div class="detail-info-item">姓名：{{pupil.nickname}}</div>
            <div class="detail-info-item">棋力：{{pupil.grade_id}}级</div>
            <div class="detail-info-item">班级：{{pupil.class_nickname?pupil.class_nickname:"暂无班级"}}</div>
            <div class="detail-info-item">学校：{{pupil.mechanism_name}}</div>
            <div class="detail-info-item">性别：{{pupil.sex==1?"男":"女"}}</div>
            <div class="detail-info-item">年龄：{{pupil.age}}</div>
            <div class="detail-info-item">激活卡：{{pupil.crad}}</div>
            <div class="detail-info-item">使用时间：{{pupil.use_time_limit}}个月</div>
            <div class="detail-info-item block">激活卡时间范围：{{pupil.create_at}} - {{pupil.end_time}}</div>
            <div class="detail-info-item block progress">
              <p class="tilte">经验值：</p>
              <div class="progressbar-wrapper">
                <div class="progressbar"></div>
              </div>
              <p class="percent-value">{{pupil.experience}} / {{pupil.total_experience}}</p>
            </div>
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
  name: "chess-student-info-panel",
  props: ["is-show", "pupil"],
  data() {
    return {
      categoryList: [
        { id: 0, icon: require("./images/成长日志.png") },
        { id: 1, icon: require("./images/我的成就.png") },
        { id: 2, icon: require("./images/我的作业.png") },
        { id: 3, icon: require("./images/自习室.png") }
      ],
      currentIndex: 0
    };
  },
  components: {
    [ChessMask.name]: ChessMask
  },
  methods: {
    switchIndex(index) {
      if (this.currentIndex != index) {
        this.currentIndex = index;
      }
    },
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
    }
  }
};
</script>
<style scoped>
div.chess-student-info-body {
  background: url(./images/student-info-panel-bg.png) no-repeat;
  background-size: 100% 100%;
}
div.content-wrapper-container {
  width: 84%;
  height: 80%;
  margin-top: 10%;
  margin-left: 6%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
}
span.dot {
  background: #8a5034;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  box-shadow: inset 0 0 2px #6d371d, 0 2px 2px #c68867;
}
.student-info-wrapper {
  height: 60%;
  margin-top: 10%;
  width: 76%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
img.user-logo {
  width: 5rem;
  height: 5rem;
  background: #c1d093;
  border-radius: 50%;
}
p.username {
  color: #411e0c;
  text-shadow: 0 1px #d4a085;
  margin-top: 1rem;
}
.student-logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.detail-info-item {
  background: #995f41;
  box-shadow: 0 1px 2px 0 #d0997c, inset 0 1px 2px 0 #5c2d14;
  width: 45%;
  padding: 0.6rem;
  border-radius: 0.4rem;
  margin: 0.4rem 0;
  color: #eabfab;
  font-size: 0.9rem;
}
.detail-info-item.block {
  width: 95%;
}
.student-detail-info-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 70%;
}
.detail-info-item.block.progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.progressbar-wrapper {
  height: 0.7rem;
  width: 65%;
  border-radius: 0.7rem;
  background: #955c3e;
  box-shadow: 0 1px 1px 0 #d9ab93, inset 0 1px 1px 0 #552e19;
}
.progressbar {
  height: 100%;
  background: #ff7226;
  border-radius: 1rem;
  width: 85%;
}
img.mail-box-close {
  top: 0.2rem;
  right: -4rem;
}
</style>
