<template>
  <div class="chess-star-wrapper">
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
          <p>
            老师个人简介信息
          </p>
        </div>
      </div>
    </div>
    <div class="obeying_master">

    </div>
    <div id="my-chart"></div>
    <div class="teacher-list-wrapper">
      <div class="pre-wrapper swiper-button-prev">
          <img v-if="isFirstPage" src="../assets/images/arrow-left-disabled.png" class="page-icon">
          <img v-else src="../assets/images/arrow-left-big.png" class="page-icon">
      </div>
      <div class="next-wrapper swiper-button-next">
          <img v-if="isLastPage" src="../assets/images/arrow-right-disabled.png" class="page-icon">
          <img v-else src="../assets/images/arrow-right-big.png" class="page-icon">
      </div>
      <div class="swiper-container swiper-no-swiping">
          <div class="content-wrapper-container swiper-wrapper">
              <div class="swiper-slide" v-for="n in Math.ceil(teacherList.length / 7)" :key="n">
                  <div class="teacher-item" v-for="item in teacherList.slice(7*(n-1),7*(n-1)+7)" :key="item">
                      <img src="../assets/images/user-logo.png" class="teacher-logo">
                      <p class="teacher-name">老师名称</p>
                  </div>
              </div>
          </div>
          <div class="swiper-pagination"></div>
      </div>
    </div>
    <chess-back-button></chess-back-button>
  </div>
</template>
<script>
import BackButton from "../components/BackButton";
export default {
  data() {
    return {
      teacherList:[1,2,3,4,5,6,7,8,9,10,11,12,13],
      isFirstPage:true,
      isLastPage:false
    }
  },
  components: {
    [BackButton.name]: BackButton
  },
  methods:{
    computedLength() {
        return Math.ceil(this.teacherList.length / 12) > 1;
    },
    
  },
  mounted() {
    this.isLastPage = Math.ceil(this.teacherList.length / 12) > 1 ? false : true;
      this.$nextTick(() => {
          const vm = this;
          new Swiper('.swiper-container',{
              watchSlidesProgress:true,
                pagination: {
                  el: '.swiper-pagination',
              },
              navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
              },
              on:{
                  progress: function(progress){
                      if(this.progress == 0) {
                          //无法点击上一页
                          vm.isFirstPage = true;
                          if(vm.computedLength()) {
                              vm.isLastPage = false;
                          }
                      }
                      if(this.progress == 1) {
                          //无法点击最后一页
                          vm.isLastPage = true;
                          vm.isFirstPage = false;
                      }
                  }
              }
          });
      })
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
    background: url(../assets/images/拜师.png)no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 61%;
    left: 45%;
}
.teacher-list-wrapper {
    width: 58%;
    margin: 0 auto;
    margin-top: 4rem;
    height: 9rem;
}
</style>
