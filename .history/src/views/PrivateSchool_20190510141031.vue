<template>
  <div class="chess-private-school-wrapper">
    <div class="category-wrapper">
        <button class="start-game pointer" @click="manageStudent"></button>
        <button class="start-game pointer" @click="manageMentor"></button>
    </div>
    <!-- 学生管理 -->
    <chess-manage-student-panel
      @class-change="classChange"
      @open-assign-homework="openSelectHomeworkPanel"
      @open-class-task-log="openClassTaskLog"
      @open-add-student="openAddStudentPanel"
      @open-student-detail="openStudentDetailPanel"
      @open-create-grade="openCreateGradePanel"
      :is-show="showManageStudentPanel"
      @hide="hideManageStudentPanel"
    ></chess-manage-student-panel>
    <!-- 学生详情（作业） -->
    <chess-student-detail-panel
      :stu-id="selectedStuId"
      @hide="hideStudentDetailPanel"
      :isShow="showStudentDetailPanel"
    ></chess-student-detail-panel>
    <!-- 学生详情（个人信息） -->
    <chess-student-info-panel
      @hide="hideStudentInfoPanel"
      :isShow="showStudentInfoPanel"
      :pupil="pupil"
    ></chess-student-info-panel>
    <!-- 师徒管理 -->
    <chess-manage-apprentice-panel
      @open-student-info-detail="openStudentInfoPanel"
      :is-show="showManageApprenticePanel"
      @hide="hideManageApprenticePanel"
    ></chess-manage-apprentice-panel>
    <!-- 添加学生 -->
    <chess-add-student-panel
      :class-id="currentGrade.id"
      @hide="hideAddStudentPanel"
      :isShow="showAddStudentPanel"
      :studentList="studentList"
      @search="search"
    ></chess-add-student-panel>
    <!-- 创建班级 -->
    <chess-create-grade-panel @hide="hideCreateGradePanel" :isShow="showCreateGradePanel"></chess-create-grade-panel>
    <!-- 批改作业 -->
    <chess-check-homework-panel
      @hide="hideCheckHomeworkPanel"
      :isShow="showCheckHomeworkPanel"
      :checkList="checkList"
      :num="num"
      :info="info"
    ></chess-check-homework-panel>
    <!-- 选择作业 -->
    <chess-select-homework-panel
      :class-id="currentGrade.id"
      :class-name="currentGrade.nickname"
      @hide="hideSelectHomeworkPanel"
      :isShow="showSelectHomeworkPanel"
    ></chess-select-homework-panel>
    <chess-back-button></chess-back-button>
    <!-- 作业列表 -->
    <class-task-log
      :isShow="showClassTaskLog"
      @hide="hideClassTaskLog"
      @open-home-work="openHomeWork"
      :homeList="homeList"
      :info="info"
    ></class-task-log>

    <!-- 创建成功提示 -->
    <create-sucess :is-show="showCreateSucess" :avter="avter"></create-sucess>
  </div>
</template>
<script>
import BackButton from "../components/BackButton";
import ManageStudentPanel from "../components/ManageStudentPanel";
import ManageApprenticePanel from "../components/ManageApprenticePanel";
import CreateGradePanel from "../components/CreateGradePanel";
import StudentInfoPanel from "../components/StudentInfoPanel";
import StudentDetailPanel from "../components/StudentDetailPanel";
import AddStudentPanel from "../components/AddStudentPanel";
import CheckHomeworkPanel from "../components/CheckHomeworkPanel";
import SelectHomeworkPanel from "../components/SelectHomeworkPanel";
import CreateSucess from "../components/CreateSucess";

import ClassTaskLog from "../components/ClassTaskLog"; //作业列表
import { constants } from "crypto";
import { filter } from "minimatch";
export default {
  data() {
    return {
      showManageStudentPanel: false,
      showManageApprenticePanel: false,
      showCreateGradePanel: false,
      showStudentDetailPanel: false,
      showStudentInfoPanel: false,
      showAddStudentPanel: false,
      showCheckHomeworkPanel: false,
      showSelectHomeworkPanel: false,
      showCreateSucess: false, //创建成功
      showClassTaskLog: false,
      selectedStuId: -1,
      currentGrade: {
        id: "",
        nickname: ""
      },
      pupil: "",
      studentList: "",
      avter: "",
      homeList: [],
      checkList: [],
      info: [],
      num: "",
    };
  },
  methods: {
    manageStudent() {
      this.showManageStudentPanel = true;
    },
    hideManageStudentPanel() {
      this.showManageStudentPanel = false;
    },
    manageMentor() {
      this.showManageApprenticePanel = true;
    },
    hideManageApprenticePanel() {
      this.showManageApprenticePanel = false;
    },
    openCreateGradePanel() {
      this.showCreateGradePanel = true;
    },
    hideCreateGradePanel() {
      this.showCreateGradePanel = false;
      this.showManageStudentPanel = true;
    },
    openStudentDetailPanel(id) {
      this.selectedStuId = id;
      this.showStudentDetailPanel = true;
    },
    hideStudentDetailPanel() {
      this.showStudentDetailPanel = false;
      this.showManageStudentPanel = true;
    },
    // 徒弟详情
    openStudentInfoPanel(id) {
      this.showStudentInfoPanel = true;
      this.$axios({
        url: `${
          process.env.VUE_APP_URL
        }index.php?r=api-teach/select-student-detail`,
        method: "post",
        data: this.qs.stringify({
          student_id: id
        })
      })
        .then(res => {
          this.pupil = res.data.data;
          console.log(res.data);
        })
        .catch(err => {
          alert("服务器异常");
        });
    },
    hideStudentInfoPanel() {
      this.showStudentInfoPanel = false;
      this.showManageApprenticePanel = true;
    },
    //添加学生
    openAddStudentPanel(classId) {
      this.showAddStudentPanel = true;
      this.$axios({
        method: "post",
        url: `${
          process.env.VUE_APP_URL
        }index.php?r=api-teach/select-not-teach-student-lists`,
        data: this.qs.stringify({
          keyword: this.keyword
        })
      })
        .then(res => {
          console.log(res.data);
          this.studentList = res.data.data;
        })
        .catch(err => {});
    },
    // 添加学生搜素
    search() {
      this.openAddStudentPanel();
    },
    hideAddStudentPanel() {
      this.showAddStudentPanel = false;
      this.showManageStudentPanel = true;
    },
    //打开作业列表
    openClassTaskLog() {
      var userInfo = sessionStorage.getItem("classId");
      this.info = JSON.parse(userInfo);
      this.showClassTaskLog = true;
      this.$axios({
        method: "post",
        url: `${process.env.VUE_APP_URL}index.php?r=api-teach/class-task-log`,
        data: this.qs.stringify({
          class_id: this.info.id,
          keyword: ""
        })
      })
        .then(res => {
          console.log(res.data);
          this.homeList = res.data.data;
        })
        .catch(err => {});
    },
    hideClassTaskLog() {
      this.showClassTaskLog = false;
      this.showManageStudentPanel = true;
    },
    // 打开作业下的学生
    openHomeWork(id) {
      console.log(id)
      this.showClassTaskLog = false;
      this.showCheckHomeworkPanel = true;
      this.$axios({
        method: "post",
        url: `${process.env.VUE_APP_URL}index.php?r=api-teach/task-student-log`,
        data: this.qs.stringify({
          task_id: id
        })
      })
        .then(res => {
          console.log(res.data);
          this.checkList = res.data.data;
          var inform = this.checkList.filter(item => {
            return item.is_read == 0;
          });
          this.num = inform.length;
        })
        .catch(err => {});
    },
    hideCheckHomeworkPanel() {
      this.showCheckHomeworkPanel = false;
      this.showClassTaskLog = true;
    },
    openSelectHomeworkPanel() {
      this.showSelectHomeworkPanel = true;
    },
    hideSelectHomeworkPanel() {
      this.showSelectHomeworkPanel = false;
      this.showManageStudentPanel = true;
    },
    classChange(grade) {
      this.currentGrade = grade;
    }
  },
  components: {
    [BackButton.name]: BackButton,
    [ManageStudentPanel.name]: ManageStudentPanel,
    [ManageApprenticePanel.name]: ManageApprenticePanel,
    [CreateGradePanel.name]: CreateGradePanel,
    [StudentDetailPanel.name]: StudentDetailPanel,
    [StudentInfoPanel.name]: StudentInfoPanel,
    [AddStudentPanel.name]: AddStudentPanel,
    [CheckHomeworkPanel.name]: CheckHomeworkPanel,
    [SelectHomeworkPanel.name]: SelectHomeworkPanel,
    CreateSucess,
    ClassTaskLog
  }
};
</script>
<style scoped>
.chess-private-school-wrapper {
  width: 100%;
  height: 100%;
  background: url(../assets/images/bg-private-room.jpg) no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.category-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  height: 3.5rem;
  position: absolute;
  bottom: 6%;
}
button.start-game {
  border: none;
  width: 30%;
  height: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  color: #fff;
  outline: 0;
}
</style>
