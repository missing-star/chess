<template>
  <div class="chess-star-wrapper">
    <!-- 老师信息 -->
    <div class="inform">
      <div class="inform_left">
        <img src alt>
      </div>
      <div class="inform_right">
        <ul class="inform_right_uu">
          <li>姓名：胡歌</li>
          <li>性别：男</li>
          <li>年龄：36</li>
          <li>所属学校：实心培训机构</li>
        </ul>
        <div class="inform_right_introduce">
          <p>简介:</p>
          <p>老师个人简介信息</p>
        </div>
      </div>
    </div>
    <!-- 拜师按钮 -->
    <div class="obeying_master"></div>


    <div id="my-chart"></div>
    <chess-back-button></chess-back-button>
  </div>
</template>
<script>
import BackButton from "../components/BackButton";
export default {
  components: {
    [BackButton.name]: BackButton
  }
};
</script>
<style scoped>
div#my-chart {
  width: 40rem;
  height: 40rem;
}

div.chess-star-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/images/将星阁banner.jpg) no-repeat;
  background-size: 100% 100%;
}
div.inform {
  width: 35%;
  height: 50%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 16%;
  left: 33%;
}
div.inform_left {
  width: 45%;
  height: 65%;
  background: url(../assets/images/picture.png) no-repeat;
  background-size: 100% 100%;
  margin-right: 7%;
}
div.inform_right {
  width: 48%;
  height: 65%;
}
ul.inform_right_uu {
  margin: 0 0 16% 16%;
}
ul.inform_right_uu li {
  font-family: PingFangSC-Semibold;
  font-size: 1.2rem;
  color: #65400a;
  text-align: left;
  line-height: 1.5rem;
}
div.inform_right_introduce {
  width: 100%;
  height: 66%;
  background: url(../assets/images/information.png) no-repeat;
  background-size: 100% 100%;
  padding: 10% 7%;
}

div.inform_right_introduce p {
  font-family: PingFangSC-Semibold;
  font-size: 1.3rem;
  color: #65400a;
  text-align: left;
  margin-bottom: 3%;
}

div.inform_right_introduce p:nth-child(2) {
  font-family: PingFangSC-Regular;
  font-size: 1rem;
  color: #65400a;
  text-align: left;
  line-height: 1.3rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
}

div.obeying_master {
  width: 10%;
  height: 10%;
  background: url(../assets/images/拜师.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 61%;
  left: 45%;
}
</style>
