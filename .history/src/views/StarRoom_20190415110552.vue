<template>
  <div class="chess-star-wrapper">
    <div class="inform">
      <div class="inform_left">
        <img src alt>
      </div>
      <div class="inform_right">
        <ul class="inform_right_uu">
          <li>姓名：{{teacherInfo.admin_name}}</li>
          <li>性别：{{teacherInfo.sex}}</li>
          <li>年龄：{{teacherInfo.age}}</li>
          <li>所属学校：{{teacherInfo.school_id}}</li>
        </ul>
        <div class="inform_right_introduce">
          <p>简介:</p>
          <p>
            {{teacherInfo.describe}}
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
                  <div @click="selectTeacher(teacher.id)" class="teacher-item pointer" :class="{active:currentId == teacher.id}" v-for="teacher in teacherList.slice(7*(n-1),7*(n-1)+7)" :key="teacher.id">
                      <img :src="teacher.picture | filterImg" class="teacher-logo">
                      <p class="teacher-name">{{teacher.admin_name}}</p>
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
      isLastPage:false,
      currentId:'',
      teacherInfo:''
    }
  },
  components: {
    [BackButton.name]: BackButton
  },
  methods:{
    computedLength() {
        return Math.ceil(this.teacherList.length / 7) > 1;
    },
    selectTeacher(id) {
      console.log(`id=${id},currentId=${this.currentId}`)
      if(this.currentId != id) {
        this.getTeacherDetail(id);
      }
    },
    getTeacherList() {
      this.$axios({
        url:`${process.env.VUE_APP_URL}index.php?r=api-teach/select-teach-lists`,
        method:'post'
      }).then((res) => {
        if(res.data.status == 1) {
          this.teacherList = res.data.data;
          this.getTeacherDetail(this.teacherList[0].id);
        }
      }).catch((err) => {

      });
    },
    getTeacherDetail(id) {
      this.currentId = id;
      this.$axios({
        url:`${process.env.VUE_APP_URL}index.php?r=api-teach/select-teach-detail`,
        method:'post',
        data:this.qs.stringify({
          teach_id:id
        })
      }).then((res) => {
        this.teacherInfo = res.data.data;
        this.initSwiper();
      }).catch((err) => {
        alert('服务器异常');
      })
    },
    initSwiper() {
      this.isLastPage = Math.ceil(this.teacherList.length / 7) > 1 ? false : true;
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
  },
  mounted() {
    this.getTeacherList();
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
    margin-top: 4%;
    height: 11rem;
    position: relative;
}
.swiper-slide {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    background: transparent;
}
.teacher-item{
  background: url(../assets/images/teacher-bg.png) no-repeat;
  background-size: 100% 100%;
  height: 90%;
  width: calc(100% / 8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  max-width: 130px;
}
.teacher-item.active{
  background: url(../assets/images/teacher-bg-active.png) no-repeat;
  background-size: 100% 100%;
  height: 90%;
  width: calc(100% / 8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  max-width: 130px;
  position: relative;
  top: -10%;
}
.pre-wrapper.swiper-button-prev, .next-wrapper.swiper-button-next {
    position: absolute;
    top: -2.2rem !important;
}
.pre-wrapper.swiper-button-prev{
  left: 20%;
}
.next-wrapper.swiper-button-next{
  right: 20%;
}
img.page-icon {
    width: 3rem;
}
img.teacher-logo {
    background: #fff;
    width: 75%;
}
.teacher-item p{
  color: #fff;
}
.teacher-item.active p{
  color:#7e4f26;
}
</style>
