<template>
    <div class="chess-home">
        <!-- 背景音乐 -->
        <audio ref="audio" id="audio-music" loop>
            <source src="../assets/audio/bg.mp3">
        </audio>
        <!-- 用户信息 -->
        <div @click="openPersonalInfoPanel" class="user-info-wrapper-container pointer">
            <div class="user-info-wrapper">
                <div class="user-logo-wrapper">
                    <img src="../assets/images/user-logo.png" class="user-logo">
                </div>
                <div class="user-name-level-wrapper">
                    <p class="teacher-name">老师名称</p>
                </div>
            </div>
        </div>
        <!-- 大帅府，私塾 -->
        <div class="room-container">
            <div @click="openLink(item.url)" class="room-item" :key="index" v-for="(item,index) in roomList">
                <img class="room-item-icon" :src="item.icon" :alt="item.name">
                <template v-if="item.logo">
                    <img :src="item.logo" style="width:4rem;position:absolute;bottom:-1rem;left:-1rem;">
                </template>
            </div>
        </div>
        
        <!-- 我的信件 -->
        <chess-mail-box @hide="hideMailPanel" :isShow="showMailPanel"  @open-tips-detail="openTipsPanel"></chess-mail-box>
        <!-- 公告栏 -->
        <div class="notice-container" @click="openNoticePanel">
            <img src="../assets/images/bulletin-board.png" alt="公告栏">
        </div>
        <chess-notice-panel @hide="hideNoticePanel" :isShow="showNoticePanel"></chess-notice-panel>
        <!-- 设置弹框 -->
        <chess-teacher-set-panel @hide="hideSetPanel" @control-bgm="controlBgm" :isShow="showSetPanel" @change-volume="changeVolume"></chess-teacher-set-panel>
        <!-- 学生详情（作业） -->
        <chess-student-detail-panel @hide="hideStudentDetailPanel" :isShow="showStudentDetailPanel"></chess-student-detail-panel>
        <!-- 学生详情（个人信息） -->
        <chess-student-info-panel @hide="hideStudentInfoPanel" :isShow="showStudentInfoPanel"></chess-student-info-panel>
        <!-- 老师个人信息 -->
        <chess-personal-info-panel @hide="hidePersonalInfoPanel" :isShow="showPersonalInfoPanel"></chess-personal-info-panel>
        <!-- 管理收徒 -->
        <chess-manage-apprentice-panel @hide="hideManageApprenticePanel" :isShow="showManageApprenticePanel"></chess-manage-apprentice-panel>
        <!-- 批改作业 -->
        <chess-check-homework-panel @hide="hideCheckHomeworkPanel" :isShow="showCheckHomeworkPanel"></chess-check-homework-panel>
        <!-- 选择作业 -->
        <chess-select-homework-panel @hide="hideSelectHomeworkPanel" :isShow="showSelectHomeworkPanel"></chess-select-homework-panel>
        <!-- 创建班级 -->
        <chess-create-grade-panel @hide="hideCreateGradePanel" :isShow="showCreateGradePanel"></chess-create-grade-panel>
        <!-- 棋谱列表 -->
        <chess-table-panel @hide="hideChessTablePanel" :isShow="showChessTablePanel"></chess-table-panel>
        <!-- 公告详情 -->
        <chess-notice-detail-panel @hide="hideNoticeDetailPanel" :isShow="showNoticeDetailPanel"></chess-notice-detail-panel>
        <!-- 添加学生 -->
        <chess-add-student-panel @hide="hideAddStudentPanel" :isShow="showAddStudentPanel"></chess-add-student-panel>
        <!-- 信息提示框 -->
        <chess-tips-panel @hide="hideTipsPanel" :is-show="showTipsPanel"></chess-tips-panel>
        <!-- 设置按钮 -->
        <chess-set-btn @game-set="gameSet"></chess-set-btn>
        <!-- 信箱 -->
        <div class="mailbox-wrapper">
            <img src="../assets/images/mailbox.png" @click="openMailPanel">
            <span class="mailbox-number">5</span>
        </div>
        <!-- 信息提示框 -->
        <chess-create-tips-panel @hide="hideCreateTipsPanel" :is-show="showCreateTipsPanel"></chess-create-tips-panel>
    </div>
</template>
<script>
import SetButton from '../components/SetButton'
import SetPanel from '../components/TeacherSetPanel'
import MailBoxPanel from '../components/MailBoxPanel'
import NoticePanel from '../components/NoticePanel'
import StudentDetailPanel from '../components/StudentDetailPanel'
import StudentInfoPanel from '../components/StudentInfoPanel'
import PersonalInfoPanel from '../components/PersonalInfoPanel'
import ManageApprenticePanel from '../components/ManageApprenticePanel'
import CheckHomeworkPanel from '../components/CheckHomeworkPanel'
import ChessTablePanel from '../components/ChessTablePanel'
import SelectHomeworkPanel from '../components/SelectHomeworkPanel'
import CreateGradePanel from '../components/CreateGradePanel'
import TipsPanel from '../components/TipsPanel'
import CreateTipsPanel from '../components/CreateTipsPanel'
import NoticeDetailPanel from '../components/NoticeDetailPanel'
import AddStudentPanel from '../components/AddStudentPanel'
export default {
    data() {
        return {
            showSetPanel:false,
            isShowDialog:false,
            showMailPanel:false,
            showNoticePanel:false,
            showCreateTipsPanel:false,
            showStudentDetailPanel:false,
            showStudentInfoPanel:false,
            showPersonalInfoPanel:false,
            showManageApprenticePanel:false,
            showCheckHomeworkPanel:false,
            showChessTablePanel:false,
            showSelectHomeworkPanel:false,
            showCreateGradePanel:false,
            showNoticeDetailPanel:false,
            showAddStudentPanel:false,
            showTipsPanel:false,
            roomList:[
                {
                    url:'/chief-mansion',
                    name:'大帅府',
                    icon:require('../assets/images/chief-mansion.png')
                },
                {
                    url:'/private-school',
                    name:'私塾',
                    icon:require('../assets/images/private-school.png'),
                    logo:require('../assets/images/teacher.png')
                }
            ]
        }
    },
    methods:{
        gameSet() {
            this.showSetPanel = true;
        },
        hideSetPanel() {
            this.showSetPanel = false;
        },
        openMailPanel() {
            this.showMailPanel = true;
        },
        hideMailPanel() {
            this.showMailPanel = false;
        },
        openNoticePanel() {
            this.showNoticePanel = true;
        },
        hideNoticePanel() {
            this.showNoticePanel = false;
        },
        openCreateTipsPanel() {
            this.showCreateTipsPanel = true;
        },
        hideCreateTipsPanel() {
            this.showCreateTipsPanel = false;
        },
        hideTeacherListPanel() {
            this.showTeacherPanel = false;
        },
        openStudentDetailPanel() {
            this.showStudentDetailPanel = true;
        },
        hideStudentDetailPanel() {
            this.showStudentDetailPanel = false;
        },
        openStudentInfoPanel() {
            this.showStudentInfoPanel = true;
        },
        hideStudentInfoPanel() {
            this.showStudentInfoPanel = false;
        },
        openPersonalInfoPanel() {
            this.showPersonalInfoPanel = true;
        },
        hidePersonalInfoPanel() {
            this.showPersonalInfoPanel = false;
        },
        openManageApprenticePanel() {
            this.showManageApprenticePanel = true;
        },
        hideManageApprenticePanel() {
            this.showManageApprenticePanel = false;
        },
        openCheckHomeworkPanel() {
            this.showCheckHomeworkPanel = true;
        },
        hideCheckHomeworkPanel() {
            this.showCheckHomeworkPanel = false;
        },
        openChessTablePanel() {
            this.showChessTablePanel = true;
        },
        hideChessTablePanel() {
            this.showChessTablePanel = false;
        },
        openSelectHomeworkPanel() {
            this.showSelectHomeworkPanel = true;
        },
        hideSelectHomeworkPanel() {
            this.showSelectHomeworkPanel = false;
        },
        openCreateGradePanel() {
            this.showCreateGradePanel = true;
        },
        hideCreateGradePanel() {
            this.showCreateGradePanel = false;
        },
        openNoticeDetailPanel() {
            this.showNoticeDetailPanel = true;
        },
        hideNoticeDetailPanel() {
            this.showNoticeDetailPanel = false;
        },
        openAddStudentPanel() {
            this.showAddStudentPanel = true;
        },
        hideAddStudentPanel() {
            this.showAddStudentPanel = false;
        },
        openTipsPanel() {
            this.showTipsPanel = true;
        },
        hideTipsPanel() {
            this.openMailPanel();
            this.showTipsPanel = false;
        },
        changeVolume(volume) {
            this.$refs.audio.volume = volume;
        },
        controlBgm(isClose) {
            setTimeout(() => {
                if(isClose) {
                    this.$refs.audio.pause();
                }
                else {
                    this.$refs.audio.play();
                }
            }, 300);
        },
        openLink(url){
            if(url.includes('/')) {
                this.$router.push({path:url})
            }
            else {
                this[url]();
            }
        }
    },
    components:{
        [SetButton.name]:SetButton,
        [SetPanel.name]:SetPanel,
        [MailBoxPanel.name]:MailBoxPanel,
        [NoticePanel.name]:NoticePanel,
        [CreateTipsPanel.name]:CreateTipsPanel,
        [StudentDetailPanel.name]:StudentDetailPanel,
        [StudentInfoPanel.name]:StudentInfoPanel,
        [PersonalInfoPanel.name]:PersonalInfoPanel,
        [ManageApprenticePanel.name]:ManageApprenticePanel,
        [CheckHomeworkPanel.name]:CheckHomeworkPanel,
        [ChessTablePanel.name]:ChessTablePanel,
        [SelectHomeworkPanel.name]:SelectHomeworkPanel,
        [CreateGradePanel.name]:CreateGradePanel,
        [NoticeDetailPanel.name]:NoticeDetailPanel,
        [AddStudentPanel.name]:AddStudentPanel,
        [TipsPanel.name]:TipsPanel
    }
}
</script>
<style scoped>
    div.chess-home{
        position: relative;
        height: 100%;
        background: url(../assets/images/home-bg.png) no-repeat;
        background-size: 100% 100%;
    }
    img.elephant {
        width: 10rem;
        position: absolute;
        left: 33%;
        bottom: 17%;
        cursor: pointer;
    }
    div.room-container {
        position: relative;
        top: 20%;
        text-align: center;
    }
    div.room-item{
        margin: 0 3%;
        cursor: pointer;
        width: 18%;
        display: inline-block;
        position: relative;
    }
    img.room-item-icon{
        width: 95%;
    }
    div.room-item:nth-child(2)>img{
        width: 110%;
    }
    div.notice-container{
        width: 16rem;
        position: absolute;
        left: 31%;
        bottom: 16%;
        cursor: pointer;
    }
    div.notice-container>img{
        width: 100%;
    }
    .user-info-wrapper {
        box-shadow: 0 0 3px 1px rgba(0,0,0,0.50);
        border-radius: 4rem;
        margin: 0.2rem;
        padding: 0.2rem;
        height: 4.5rem;
    }
    img.user-logo {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background: skyblue;
    }
    div.user-logo-wrapper,div.user-name-level-wrapper{
        float: left;
    }
    .user-info-wrapper-container{
        position: absolute;
        left: 1rem;
        top: 1rem;
        background: #543c27;
        border-radius: 4rem;
        width: 23rem;
        padding: 0.2rem;
    }
    p.username {
        color: #FFFFFF;
        font-size: 1.2rem;
        display: inline-block;
    }
    .user-name-level-wrapper {
        height: 4rem;
        padding-left: 1rem;
    }
    span.nick-level {
        background: #ff9036;
        margin-left: 1rem;
        font-size: 0.8rem;
        color: #FFFFFF;
        padding: 0.1rem 0.5rem;
        border-radius: 0.8rem;
        border-bottom-left-radius: 0;
    }
    .progress-wrapper {
        margin-top: 1rem;
        width: 15rem;
    }
    span.title,div.progress-bar-wrapper,p.level-number{
        display: inline-block;
        color: #FFFFFF;
        font-size: 0.8rem;
    }
    .progress-bar-wrapper {
        width: 8rem;
        height: 0.4rem;
        background: #6e553f;
        border-radius: 1rem;
        margin: 0.05rem 0.4rem;
    }
    .progress-bar {
        height: 100%;
        border-radius: 1rem;
        width: 50%;
        background: #ff9036;
    }
    div.mailbox-wrapper {
        position: absolute;
        width: 6rem;
        left: 60%;
        bottom: 20%;
        cursor: pointer;
    }
    div.mailbox-wrapper>img{
        width: 100%;
    }
    span.mailbox-number {
        position: absolute;
        right: 0.3rem;
        top: 0.65rem;
        color: #000000;
        font-size: 1rem;
        display: inline-block;
        width: 2.3rem;
        text-align: center;
    }
    .daily-task-wrapper {
        position: absolute;
        right: 0;
        top: 2rem;
        background: rgba(0,0,0,0.5);
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        color: #FFFFFF;
        transition: all 0.3s ease-out;
    }
    .daily-task-category-wrapper{
        overflow: hidden;
        width: 15rem;
        transition: all 0.3s ease-out;
    }
    .daily-task-category-wrapper.hide{
        width: 0;
    }
    li.daily-task-category-item{
        background: #f4e3b5;
        margin: 1rem 0.5rem;
        padding: 0.5rem 2rem;
        border-radius: 1rem;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        cursor: pointer;
    }
    li.daily-task-category-item.main-category {
        background: #543c27; 
    }
    .pack-up-btn {
        cursor: pointer;
        width: 4rem;
        background-image:linear-gradient(-180deg, #f6be70 0%, #e9893d 100%);
        position: absolute;
        left: -4rem;
        top: 1rem;
        height: 2rem;
        line-height: 2rem;
        border-top-left-radius: 0.3rem;
        border-bottom-left-radius: 0.3rem;
        font-size: 0.8rem;
        padding-left: 0.5rem;
    }
    .pack-up-btn>p.title,img.arrow-right {
        display: inline-block;
    }
    img.arrow-right{
        width: 0.8rem;
        position: relative;
        top: 0.2rem;
        left: 0.5rem;
    }
    img.arrow-right.rotate{
        transform: rotate(180deg);
    }
    p.black-name {
        width: 22%;
        text-align: left;
    }
    p.teacher-name {
        color: #fff;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
    }
</style>
