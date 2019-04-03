<template>
    <div class="chess-student-detail-panel">
        <div class="chess-dialog-body chess-student-detail-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <div class="category-wrapper">
                    <div class="student-info-wrapper">
                        <p class="title">学员信息</p>
                        <div class="dash-line"></div>
                        <div class="student-detail-wrapper">
                            <div class="student-logo-wrapper">
                                <img src="../assets/images/user-logo.png" class="user-logo">
                                <p class="username">张某同学</p>
                            </div>
                            <div class="grade-info-wrapper">
                                <p class="grade-item">班级：二期3班</p>
                                <p class="grade-item">性别：女</p>
                                <p class="grade-item">年龄：12</p>
                            </div>
                        </div>
                        <div class="exp-wrapper">
                            <p class="exp-title">经验值：</p>
                            <div class="progressbar-wrapper">
                                <div class="progressbar"></div>
                            </div>
                            <p class="exp-number">160 / 200</p>
                        </div>
                    </div>
                    <div class="homework-condition-wrapper">
                        <p class="title">作业情况</p>
                        <div class="dash-line"></div>
                        <div class="finished-and-checking">
                            <div class="item finshed">
                                <img src="../assets/images/homework-icon.png" class="check-icon">
                                <p class="content">已完成12卷</p>
                            </div>
                            <div class="item checking">
                                <img src="../assets/images/homework-icon.png" class="check-icon">
                                <p class="content">1卷批改中</p>
                            </div>
                        </div>
                        <div class="not-finished-wrapper">
                            <img src="../assets/images/homework-icon.png" class="check-icon">
                            <p class="content not-finished">未完成3卷</p>
                        </div>
                    </div>
                    <div class="relive-mentor-relationship">
                        <p class="button-relive pointer">
                            解除师徒关系
                        </p>
                    </div>
                </div>
                <div class="userinfo-wrapper">
                    
                </div>
            </div>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
    </div>
</template>
<script>
import ChessMask from './Mask'
export default {
    name:'chess-student-detail-panel',
    props:['is-show'],
    data() {
        return {
            categoryList:[
                {id:0,icon:require('../assets/images/成长日志.png')},
                {id:1,icon:require('../assets/images/我的成就.png')},
                {id:2,icon:require('../assets/images/我的作业.png')},
                {id:3,icon:require('../assets/images/自习室.png')}
            ]
        }
    },
    components:{
        [ChessMask.name]:ChessMask
    },
    methods: {
        closeMyself() {
            this.$emit('hide');
        },
        openPanel(target) {
            switch (target) {
                case 0:
                    this.closeMyself();
                    this.$emit('open-log');
                    break;
                case 1:
                    this.closeMyself();
                    this.$emit('open-ach');
                    break;
                break;
                case 2:
                    this.closeMyself();
                    this.$emit('open-homework');
                    break;
                break;
                case 3:
                    
                    break;
            }
        }
    }
}
</script>
<style scoped>
    div.chess-student-detail-body{
        background: url(../assets/images/community-bg.png) no-repeat; 
        background-size: 100% 100%;
    }
    div.content-wrapper-container{       
        width: 85%;
        height: 80%;
        margin-top: 10%;
        margin-left: 5%;
        display: flex;
        align-items: center;
    }
    .category-wrapper {
        width: 45%;
        height: 85%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .student-info-wrapper,.homework-condition-wrapper{
        background: #a46849;
        box-shadow: 0 1px 1px 0 #daa990, inset 0 1px 1px 0 #7e4a30;
        width: 100%;
        border-radius: 0.5rem;
        padding: 0.5rem;
        text-align: center;
    }
    p.title {
        color: #ffddaa;
        text-shadow: 0 1px 1px;
        text-align: center;
        font-size: 1.2rem;
    }
    div.dash-line{
        background: url(../assets/images/dot.png);
        height: 0.5rem;
        width: 87%;
        background-size: contain;
        margin: 1rem auto;
    }
    .student-detail-wrapper {
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
    .grade-info-wrapper {
        flex:0.8;
    }
    p.grade-item {
        background: #9c6042;
        box-shadow: 0 1px 1px 0 #d9ab93, inset 0 1px 1px 0 #552e19;
        width: 100%;
        margin: 0.5rem 0;
        padding: 0.4rem;
        border-radius: 0.2rem;
        color: #eabfab;
    }
    .student-logo-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 6.5rem;
    }
    p.username {
        color: #703E23;
        text-shadow: 0 1px #d4a085;
    }
    .exp-wrapper {
        display: flex;
        align-items: center;
        padding: 0.2rem 0;
        color: #edc3af;
        justify-content: space-around;
        margin: 0.5rem;
    }
    .progressbar-wrapper {
        background: #955c3e;
        box-shadow: 0 1px 1px 0 #d9ab93, inset 0 1px 1px 0 #552e19;
        width: 50%;
        height: 0.7rem;
        border-radius: 1rem;
    }
    img.check-icon {
        width: 1.5rem;
    }
    .finished-and-checking {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .item,.not-finished-wrapper,p.button-relive{
        width: 45%;
        display: inline-flex;
        align-items: center;
        background: #9c6042;
        box-shadow: 0 1px 1px 0 #d9ab93, inset 0 1px 1px 0 #552e19;
        margin: 0.5rem 0;
        padding: 0.4rem;
        border-radius: 0.5rem;
        color: #eabfab;
    }
    div.relive-mentor-relationship{
        text-align: right;
        width: 100%;
    }
    p.content {
        margin-left: 0.2rem;
    }
    .not-finished-wrapper{
        width: 96%;
    }
    .progressbar {
        height: 100%;
        background: #ff7226;
        border-radius: 1rem;
        width: 85%;
    }

</style>
