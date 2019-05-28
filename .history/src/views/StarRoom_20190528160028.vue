<template>
  <div class="chess-star-wrapper">
    <!-- 老师信息 -->
    <div class="inform">
      <div class="inform_left">
        <img
          :src="teacherInfo.picture == null ? require('../assets/images/user-logo.png') : teacherInfo.picture"
          alt
        >
      </div>
      <div class="inform_right">
        <ul class="inform_right_uu">
          <li>姓名：{{teacherInfo.admin_name}}</li>
          <li>性别：{{teacherInfo.sex == 1 ? '男' : '女'}}</li>
          <li>年龄：{{teacherInfo.age}}</li>
          <li>所属学校：{{teacherInfo.mechanism_name}}</li>
        </ul>
        <div class="inform_right_introduce">
          <p>简介:</p>
          <p>{{teacherInfo.describe}}</p>
          <p @click="openTeacherDetail" class="detail-link">详情</p>
        </div>
      </div>
      <div class="obeying_master" @click="Vteacher"></div>
    </div>
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
            <div
              @click="selectTeacher(teacher.id)"
              class="teacher-item pointer"
              :class="{active:currentId == teacher.id}"
              v-for="teacher in teacherList.slice(7*(n-1),7*(n-1)+7)"
              :key="teacher.id"
            >
              <img
                :src="teacher.picture == null ? require('../assets/images/user-logo.png') : teacher.picture"
                class="teacher-logo"
              >

              <p class="teacher-name">{{teacher.admin_name}}</p>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <chess-back-button></chess-back-button>
    <!-- 拜师成功 -->
    <create-sucess
      :is-show="showCreateSucess"
      :avter="avter"
      :btnImg="btnImg"
      :show1="show1"
      :show="show"
    ></create-sucess>
    <!-- 教师详情 -->
    <chess-teacher-detail-panel @hide="closeTeacherDetail" :content="currentDetail" :is-show="showTeacherDetail"></chess-teacher-detail-panel>
  </div>
</template>
<script>
import BackButton from "../components/BackButton";
import CreateSucess from "../components/CreateSucess";
import TeacherDetail from "../components/TeacherDetail";
import Swiper from "swiper";
export default {
  data() {
    return {
      teacherList: [],
      isFirstPage: true,
      isLastPage: false,
      showCreateSucess: false, //成功
      currentId: "",
      teacherInfo: "",
      avter: "",
      btnImg: "",
      show1: false,
      show: true,
      showTeacherDetail:false,
      currentDetail:''
    };
  },
  components: {
    [BackButton.name]: BackButton,
    CreateSucess,
    [TeacherDetail.name]:TeacherDetail
  },
  methods: {
    isClose() {
      //提示框消失
      setTimeout(() => {
        this.showCreateSucess = false;
      }, 1500);
    },
    computedLength() {
      return Math.ceil(this.teacherList.length / 7) > 1;
    },
    openTeacherDetail() {
      this.showTeacherDetail = true;
    },
    closeTeacherDetail() {
      this.showTeacherDetail = false;
    },
    selectTeacher(id) {
      if (this.currentId != id) {
        // this.getTeacherDetail(id);
        this.currentId = id;
        this.$axios({
          url: `${
            process.env.VUE_APP_URL
          }index.php?r=api-teach/select-teach-detail`,
          method: "post",
          data: this.qs.stringify({
            teach_id: id
          })
        })
          .then(res => {
            this.teacherInfo = res.data.data;
          })
          .catch(err => {
            alert("服务器异常");
          });
      }
      sessionStorage.setItem("teachId", id);
    },
    getTeacherList() {
      this.$axios({
        url: `${
          process.env.VUE_APP_URL
        }index.php?r=api-teach/select-teach-lists`,
        method: "post"
      })
        .then(res => {
          if (res.data.status == 1) {
            this.teacherList = res.data.data;
            this.getTeacherDetail(this.teacherList[0].id);
          }
        })
        .catch(err => {});
    },
    getTeacherDetail(id) {
      this.currentId = id;
      this.$axios({
        url: `${
          process.env.VUE_APP_URL
        }index.php?r=api-teach/select-teach-detail`,
        method: "post",
        data: this.qs.stringify({
          teach_id: id
        })
      })
        .then(res => {
          this.teacherInfo = res.data.data;
          this.currentDetail = this.teacherInfo.describe;
          this.initSwiper();
        })
        .catch(err => {
          alert("服务器异常");
        });
    },
    initSwiper() {
      this.isLastPage =
        Math.ceil(this.teacherList.length / 7) > 1 ? false : true;
      this.$nextTick(() => {
        const vm = this;
        new Swiper(".swiper-container", {
          watchSlidesProgress: true,
          pagination: {
            el: ".swiper-pagination"
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          },
          on: {
            progress: function(progress) {
              if (this.progress == 0) {
                //无法点击上一页
                vm.isFirstPage = true;
                if (vm.computedLength()) {
                  vm.isLastPage = false;
                }
              }
              if (this.progress == 1) {
                //无法点击最后一页
                vm.isLastPage = true;
                vm.isFirstPage = false;
              }
            }
          }
        });
      });
    },
    //拜师
    Vteacher() {
      var teacherId = sessionStorage.getItem("teachId");
      if (sessionStorage.getItem("teachId")) {
        var teacherId = sessionStorage.getItem("teachId");
      } else {
        teacherId = this.teacherList[0].id;
      }
      this.$axios({
        url: `${
          process.env.VUE_APP_URL
        }/index.php?r=api-student/apprentice-teacher`,
        method: "post",
        data: this.qs.stringify({
          teach_id: teacherId
        })
      })
        .then(res => {
          if (res.data.status == 1) {
            this.avter = require("../assets/images/拜师成功.png");
            this.showCreateSucess = true;
            this.isClose();
          } else {
            this.avter = require("../assets/images/你已拜师.png");
            this.showCreateSucess = true;
            this.isClose();
            // alert("你已拜师");
          }
        })
        .catch(err => {
          alert("服务器异常");
        });
    }
  },
  mounted() {
    this.getTeacherList();
  }
};
</script>
<style scoped>

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
  height: 73%;
  background: url(../assets/images/picture.png) no-repeat;
  background-size: 100% 100%;
  margin-right: 7%;
  padding: 4% 3%;
}
div.inform_left img {
  width: 100%;
  height: 100%;
}
div.inform_right {
  width: 48%;
  height: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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
  margin-bottom: 2%;
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
  width: 26%;
  height: 20%;
  background: url(../assets/images/拜师.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: -10%;
  left: 37%;
  cursor: pointer;
}
.teacher-list-wrapper {
  width: 58%;
  top: 72%;
  left: 21%;
  position: absolute;
  height: 20%;
}
.swiper-slide {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  background: transparent;
}
.teacher-item {
  background: url(../assets/images/teacher-bg.png) no-repeat;
  background-size: 100% 100%;
  height: 85%;
  width: calc(100% / 8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  max-width: 130px;
  margin: 0 1.2%;
}
.teacher-item.active {
  background: url(../assets/images/teacher-bg-active.png) no-repeat;
  background-size: 100% 100%;
  height: 85%;
  width: calc(100% / 8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  max-width: 130px;
  position: relative;
  top: -10%;
}
.pre-wrapper.swiper-button-prev,
.next-wrapper.swiper-button-next {
  position: absolute;
  top: 0 !important;
  width: 3%;
}
@media screen and (min-width: 1400px){
  .pre-wrapper.swiper-button-prev,
  .next-wrapper.swiper-button-next {
    position: absolute;
    top: -4% !important;
    width: 3%;
  }
}
.pre-wrapper.swiper-button-prev {
  left: 20%;
}
.next-wrapper.swiper-button-next {
  right: 20%;
}
img.page-icon {
  width: 100%;
}
img.teacher-logo {
  background: #fff;
  width: 75%;
  max-height: 65%;
  border-radius: 0.1rem;
}
.teacher-item p {
  color: #fff;
  font-size: 0.8rem;
}
.teacher-item.active p {
  color: #7e4f26;
}
.swiper-pagination.swiper-pagination-bullets {
  display: none;
}
p.detail-link {
    text-decoration: underline;
    text-align: right !important;
    display: block;
    font-size: 0.8rem !important;
    cursor: pointer;
}
.swiper-button-next, .swiper-button-prev{
  z-index: 3;
}
</style>
