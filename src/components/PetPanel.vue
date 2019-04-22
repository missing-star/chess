<template>
  <div class="chess-pet-panel">
    <div class="chess-dialog-body chess-pet-panel-body" :class="{'hide':!isShow}">
      <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
      <div class="content-wrapper-container">
        <div class="pet-info-wrapper">
          <img src="../assets/images/小象.png" class="pet-logo">
          <div class="pet-level-info">
            <div class="exp-wrapper">
              <p class="title">成长值：</p>
              <div class="exp-progressbar-wrapper">
                <div
                  class="exp-progressbar exp"
                  :style="petInfo.grow_value/petInfo.grade_experience*100+'%' | filterWidth"
                ></div>
              </div>
              <p class="exp-progress-value">{{petInfo.grow_value}} / {{petInfo.grade_experience}}</p>
            </div>
            <div class="exp-wrapper">
              <p class="title">成长点：</p>
              <div class="exp-progressbar-wrapper1">{{petInfo.grow_num}}</div>
              <p class="exp-progress-value"></p>
            </div>
            <div class="pet-name-leve-wrapper">
              <div class="pet-info-item">等级：{{petInfo.grade}}级</div>
              <div class="pet-info-item">称号：小象</div>
            </div>
          </div>
        </div>
        <div class="pet-operation-wrapper">
          <div
            @click="getOperation(0)"
            class="operation-item pointer"
            :class="{'not-active':currentOperation != 0,'active':currentOperation == 0}"
          >
            <img src="../assets/images/喂养icon.png" class="operation-icon not-active">
            <img src="../assets/images/喂养icon - 喂养中.png" class="operation-icon active">
            <p class="operation-title">喂养</p>
          </div>
          <div
            @click="getOperation(1)"
            class="operation-item pointer"
            :class="{'not-active':currentOperation != 1,'active':currentOperation == 1}"
          >
            <img src="../assets/images/对话icon.png" class="operation-icon not-active">
            <img src="../assets/images/对话icon - 操作中.png" class="operation-icon active">
            <p class="operation-title">对话</p>
          </div>
          <div
            @click="getOperation(2)"
            class="operation-item pointer"
            :class="{'not-active':currentOperation != 2,'active':currentOperation == 2}"
          >
            <img src="../assets/images/调教icon.png" class="operation-icon not-active">
            <img src="../assets/images/调教icon - 操作中.png" class="operation-icon active">
            <p class="operation-title">调教</p>
          </div>
          <div
            @click="getOperation(3)"
            class="operation-item pointer"
            :class="{'not-active':currentOperation != 3,'active':currentOperation == 3}"
          >
            <img src="../assets/images/嬉戏icon.png" class="operation-icon not-active">
            <img src="../assets/images/嬉戏icon - 操作中.png" class="operation-icon active">
            <p class="operation-title">嬉戏</p>
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
  name: "chess-pet-panel",
  data() {
    return {
      currentOperation: -1
    };
  },
  methods: {
    closeMyself() {
      this.$emit("hide");
    },
    getOperation(index) {
      if (index != this.currentOperation) {
        this.currentOperation = index;
      }
      this.$emit("getOperation", index);
    }
  },
  props: ["is-show", "petInfo"],
  components: {
    [ChessMask.name]: ChessMask
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
  }
};
</script>
<style scoped>
div.chess-pet-panel-body {
  background: url(../assets/images/pet-bg.png) no-repeat;
  background-size: 100% 100%;
}
div.pet-info-wrapper {
  padding-left: 5%;
}
div.content-wrapper-container {
  width: 82%;
  height: 72%;
  background-size: 100% 100%;
  margin-top: 14%;
  margin-left: 8%;
}
div.content-wrapper {
  background-size: 100% 100%;
  width: 98%;
  height: 98%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
img.pet-logo {
  width: 25%;
}
.pet-level-info {
  display: inline-block;
  vertical-align: top;
  width: 65%;
  margin-left: 10%;
}
p.title {
  color: #c49677;
  font-size: 1.2rem;
}
.exp-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2rem 1rem;
}
.exp-progressbar-wrapper {
  width: auto;
  height: 1rem;
  background: #fffcf2;
  border-radius: 1rem;
  flex: 0.8;
}

.exp-progressbar-wrapper1 {
  width: auto;
  height: 1rem;
  text-align: center;
  background: #fcf3d6;
  color: #d3b090;
  border-radius: 1rem;
  flex: 0.8;
}
.exp-progressbar {
  height: 100%;
  width: 0;
  border-radius: 1rem;
}
.exp-progressbar.exp {
  background: #ff7226;
}
.exp-progressbar.growth {
  background: #68bf21;
}
p.exp-progress-value {
  min-width: 16%;
  text-align: center;
  color: #d3b090;
}
.pet-name-leve-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 0;
}
.pet-info-item {
  background: #fcf3d6;
  width: 40%;
  height: 3rem;
  border-radius: 0.3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #c49677;
  font-size: 1.2rem;
}
.pet-operation-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 6rem;
}
.operation-item {
  width: 20%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
img.operation-icon {
  width: 70%;
}
img.operation-icon.active {
  width: 60%;
}
p.operation-title {
  color: #ecdfbe;
  font-size: 1.2rem;
  margin-top: 0.5rem;
}
.operation-item > img.operation-icon {
  display: none;
}
.operation-item.active > img.operation-icon.active {
  display: block;
}
.operation-item.not-active > img.operation-icon.not-active {
  display: block;
}
</style>
