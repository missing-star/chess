<template>
    <div class="chess-private-school-wrapper">
        <h2>私塾</h2>
        <div class="category-wrapper">
            <div class="category-item">
                <button class="start-game pointer" @click="manageStudent">学生管理</button>
            </div>
            <div class="category-item">
                <button class="start-game pointer" @click="manageMentor">师徒管理</button>
            </div>
        </div>
        <!-- 学生管理 -->
        <chess-manage-student-panel @open-student-detail="openStudentDetailPanel" @open-create-grade="openCreateGradePanel" :is-show="showManageStudentPanel" @hide="hideManageStudentPanel"></chess-manage-student-panel>
        <!-- 学生详情（作业） -->
        <chess-student-detail-panel @hide="hideStudentDetailPanel" :isShow="showStudentDetailPanel"></chess-student-detail-panel>
        <!-- 学生详情（个人信息） -->
        <chess-student-info-panel @hide="hideStudentInfoPanel" :isShow="showStudentInfoPanel"></chess-student-info-panel>
        <!-- 师徒管理 -->
        <chess-manage-apprentice-panel @open-student-info-detail="openStudentInfoPanel" :is-show="showManageApprenticePanel" @hide="hideManageApprenticePanel"></chess-manage-apprentice-panel>
        <!-- 添加学生 -->
        <chess-add-student-panel @hide="hideAddStudentPanel" :isShow="showAddStudentPanel"></chess-add-student-panel>
        <!-- 创建班级 -->
        <chess-create-grade-panel @hide="hideCreateGradePanel" :isShow="showCreateGradePanel"></chess-create-grade-panel>
        <chess-back-button></chess-back-button>
    </div>
</template>
<script>
import BackButton from '../components/BackButton'
import ManageStudentPanel from '../components/ManageStudentPanel'
import ManageApprenticePanel from '../components/ManageApprenticePanel'
import CreateGradePanel from '../components/CreateGradePanel'
import StudentInfoPanel from '../components/StudentInfoPanel'
import StudentDetailPanel from '../components/StudentDetailPanel'
import AddStudentPanel from '../components/AddStudentPanel'
export default {
    data() {
        return {
            showManageStudentPanel:false,
            showManageApprenticePanel:false,
            showCreateGradePanel:false,
            showStudentDetailPanel:false,
            showStudentInfoPanel:false,
            showAddStudentPanel:false,
        }
    },
    methods:{
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
        openStudentDetailPanel() {
            this.showStudentDetailPanel = true;
        },
        hideStudentDetailPanel() {
            this.showStudentDetailPanel = false;
            this.showManageStudentPanel = true;
        },
        openStudentInfoPanel() {
            this.showStudentInfoPanel = true;
        },
        hideStudentInfoPanel() {
            this.showStudentInfoPanel = false;
            this.showManageApprenticePanel = true;
        }
    },
    components:{
        [BackButton.name]:BackButton,
        [ManageStudentPanel.name]:ManageStudentPanel,
        [ManageApprenticePanel.name]:ManageApprenticePanel,
        [CreateGradePanel.name]:CreateGradePanel,
        [StudentDetailPanel.name]:StudentDetailPanel,
        [StudentInfoPanel.name]:StudentInfoPanel,
    }
}
</script>
<style scoped>
.chess-private-school-wrapper {
    width: 100%;
    height: 100%;
    background: url(../assets/images/home-bg.png) no-repeat;
    background-size: 100% 100%;
    padding-top: 10%;
}
h2 {
    text-align: center;
    font-size: 2rem;
}
.category-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem;
}
.category-item {
    width: 20rem;
    height: 25rem;
    background: #f6f6f6;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-right: 1rem;
}
button.start-game {
    border: none;
    width: 55%;
    padding: 1rem;
    border-radius: 0.5rem;
    color: #fff;
    margin-bottom: 3rem;
    outline: 0;
}
</style>
