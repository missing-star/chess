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
                                <img :src="studentInfo.picture" class="user-logo">
                                <p class="username">{{studentInfo.nickname}}</p>
                            </div>
                            <div class="grade-info-wrapper">
                                <p class="grade-item">班级：{{studentInfo.class_nickname}}</p>
                                <p class="grade-item">性别：{{studentInfo.sex == 1 ? '男' : '女'}}</p>
                                <p class="grade-item">年龄：{{studentInfo.age}}</p>
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
                                <p class="content">已完成{{finishedList.length}}卷</p>
                            </div>
                            <div class="item checking">
                                <img src="../assets/images/checking-icon.png" class="check-icon">
                                <p class="content">1卷批改中</p>
                            </div>
                        </div>
                        <div class="not-finished-wrapper">
                            <img src="../assets/images/unfinished-icon.png" class="check-icon">
                            <p class="content not-finished">未完成{{unFinishList.length}}卷</p>
                        </div>
                    </div>
                    <div class="relive-mentor-relationship">
                        <p class="button-relive pointer" @click="reliveRelationship">
                            解除师生关系
                        </p>
                    </div>
                </div>
                <div class="homework-wrapper">
                    <div class="tabbar-wrapper">
                        <div @click="switchIndex(0)" class="tabbar-item pointer finished" :class="{active:currentIndex == 0}">
                            
                        </div>
                        <div @click="switchIndex(1)" class="tabbar-item pointer unfinished" :class="{active:currentIndex == 1}">
                            
                        </div>                            
                    </div>
                    <ul class="homework-list-wrapper" v-show="currentIndex == 0">
                        <li v-for="n in 20" :key="n" class="homework-item">
                            <p class="homework-name">作业名称是八个字</p>
                            <span class="dashed-line">····</span>
                            <img src="../assets/images/homework-common-icon.png" class="homework-icon">
                            <p class="homework-time">
                                02.15 10:00-02.16 10:00
                            </p>
                            <button class="detail pointer">详情</button>
                        </li>
                    </ul>
                    <ul class="homework-list-wrapper" v-show="currentIndex == 1">
                        <li v-for="n in 20" :key="n" class="homework-item">
                            <p class="homework-name">未完成作业名称</p>
                            <span class="dashed-line">····</span>
                            <img src="../assets/images/homework-common-icon.png" class="homework-icon">
                            <p class="homework-time auto">
                                02.15 10:00-02.16 10:00
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
    </div>
</template>
<script>
import ChessMask from './Mask'
import { homedir } from 'os';
export default {
    name:'chess-student-detail-panel',
    props:['is-show','stu-id'],
    data() {
        return {
            currentIndex:0,
            studentInfo:{},
            finishedList:[],
            unFinishList:[]
        }
    },
    components:{
        [ChessMask.name]:ChessMask
    },
    methods: {
        switchIndex(index) {
            if(this.currentIndex != index) {
                this.currentIndex = index;
            }
        },
        closeMyself() {
            this.$emit('hide');
        },
        reliveRelationship() {
            if(confirm('您确定要解除师生关系吗？')) {
                this.$axios({
                    url:`${process.env.VUE_APP_URL}index.php?r=api-teach/relieve`,
                    method:'post',
                    data:this.qs.stringify({
                        student_id:this.stuId
                    })
                }).then((res) => {
                    console.log(res.data);
                    if(res.data.status == 0) {
                        alert(res.data.msg);
                    }
                }).catch((err) => {

                });
            }
        }
    },
    watch:{
        stuId:function() {
            this.$axios({
                url:`${process.env.VUE_APP_URL}index.php?r=api-teach/select-student-detail`,
                method:'post',
                data:this.qs.stringify({
                    student_id:this.stuId
                })
            }).then((res) => {
                if(res.data.status == 1) {
                    this.studentInfo = res.data.data;
                }
                else {
                    alert('获取学生详情失败');
                }
            }).catch(() => {
                alert('服务器异常');
            });

            this.$axios({
                url:`${process.env.VUE_APP_URL}index.php?r=api-teach/task-notice-log`,
                method:'post',
                data:this.qs.stringify({
                    student_id:this.stuId
                })
            }).then((res) => {
                if(res.data.status == 1) {
                    this.studentInfo = res.data.data;
                    this.finishedList = res.data.data.filter((homwork) => {
                        return homework.status == 1;
                    });
                    this.unFinishList = res.data.data.filter((homework) => {
                        return homework.status == 2;
                    });
                }
                else {
                    alert('获取作业列表失败');
                }
            }).catch(() => {
                alert('服务器异常');
            });
        }
    }
}
</script>
<style scoped>
    div.chess-student-detail-body{
        background: url(../assets/images/student-detail-panel-bg.png) no-repeat; 
        background-size: 100% 100%;
    }
    div.content-wrapper-container{       
        width: 84%;
        height: 80%;
        margin-top: 10%;
        margin-left: 6%;
        display: flex;
        align-items: center;
        position: relative;
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
    .homework-condition-wrapper{
        margin-top: 1.5rem;
    }
    p.title {
        color: #ffddaa;
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
        padding: 0.5rem;
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
    p.button-relive{
        width: 30%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.2rem;
        padding: 0.3rem;
        font-size: 0.6rem;
    }
    div.relive-mentor-relationship{
        text-align: right;
        width: 100%;
    }
    p.content {
        margin-left: 0.2rem;
    }
    .not-finished-wrapper{
        color: #ecd8ae;
        width: 96%;
        border-radius: 2rem;
    }
    .progressbar {
        height: 100%;
        background: #ff7226;
        border-radius: 1rem;
        width: 85%;
    }
    img.mail-box-close{
        top: 0.2rem;
        right: -4rem;
    }
    .homework-wrapper {
        width: 50%;
        height: 85%;
        margin-left: 5%;
        position: relative;
    }
    li.homework-item {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    p.homework-name {
        color: #854f32;
        font-size: 1.2rem;
    }
    img.homework-icon {
        width: 1.5rem;
    }
    span.dashed-line {
        writing-mode: vertical-lr;
        color: #d7aa93;
    }
    p.homework-time {
        width: 21%;
        font-size: 0.6rem;
        color: #b87f61;
    }
    p.homework-time.auto {
        width: auto;
    }
    button.detail {
        background-image: linear-gradient(-180deg, #ffb555 0%, #ff7e2b 100%);
        border: none;
        padding: 0.4rem 0.8rem;
        border-radius: 1rem;
        color: #fff;
        outline: 0;
    }
    ul.homework-list-wrapper {
        height: 90%;
        overflow: scroll;
        overflow-x: hidden;
        -ms-overflow-style: none;
        scrollbar-width:none;
        margin-top: 2rem;
    }
    ul.homework-list-wrapper::-webkit-scrollbar {
        width:0;
    }
    li.homework-item {
        margin: 0.6rem 0;
        padding: 0.8rem 0.2rem;
        background: url(../assets/images/homework-list-bg.png) no-repeat;
        background-size: 100% 100%;
    }
    .tabbar-wrapper {
        position: absolute;
        display: flex;
        top: -1.8rem;
        left: 30%;
        transform: rotate(1.2deg);
    }
    .tabbar-item {
        width: 6rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color:#a97052;
    }
    .tabbar-item.active{
        color: #ffffff;
    }
    .tabbar-item.finished{
        background: url(../assets/images/finished.png) no-repeat;
        background-size: 100% 100%;
    }
    .tabbar-item.finished.active{
        background: url(../assets/images/finished-active.png) no-repeat;
        background-size: 100% 100%;
    }
    .tabbar-item.unfinished{
        background: url(../assets/images/unfinished.png) no-repeat;
        background-size: 100% 100%;
        transform: rotate(-1deg);
        position: relative;
        top: 0.1rem;
        margin-left: 0.5rem;
    }
    .tabbar-item.unfinished.active{
        background: url(../assets/images/unfinished-active.png) no-repeat;
        background-size: 100% 100%;
        transform: rotate(-1deg);
        position: relative;
        top: 0.1rem;
        margin-left: 0.5rem;
    }
</style>
