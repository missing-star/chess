<template>
    <div class="chess-student-detail-panel">
        <div class="chess-dialog-body chess-student-detail-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <div class="category-wrapper">
                    <div class="student-info-wrapper">
                        <div class="grade-info-wrapper">
                            <div class="grade-logo">
                            </div>
                            <div class="grade-name">
                                <p class="grade-editor">
                                    <span class="title">一期三班</span>
                                    <img src="../assets/images/edit-icon.png" alt="编辑" class="edit-grade-icon">
                                </p>
                                <p class="grade-person-number">35人</p>
                                <p class="grade-create-time">创建时间：19.0.2.12</p>
                                <img src="../assets/images/add-student.png" alt="添加学员" class="add-student-icon pointer">
                            </div>
                        </div>
                        <p class="solid-line"></p>
                        <div class="btn-group">
                            <img src="../assets/images/check-homework.png" alt="批改作业" class="check-homework-icon pointer">
                            <img src="../assets/images/assign-homework.png" alt="布置作业" class="assign-homework-icon pointer">
                        </div>
                    </div>
                    <div class="homework-condition-wrapper">
                        <div class="next-page swiper-button-prev">
                            <img v-if="isFirstPage" src="../assets/images/arrow-left-disabled-s.png" class="navigation-icon">
                            <img v-else src="../assets/images/arrow-left-s.png" class="navigation-icon">
                        </div>
                        <div class="pre-page swiper-button-next">
                            <img v-if="isLastPage" src="../assets/images/arrow-right-disabled-s.png" class="navigation-icon">
                            <img v-else src="../assets/images/arrow-right-s.png" class="navigation-icon">
                        </div>
                        <div class="swiper-container swiper-no-swiping">
                            <div class="content-wrapper-container swiper-wrapper">
                                <div v-for="n in Math.ceil(gradeList.length / 4)" :key="n" class="swiper-slide">
                                    <div class="grade-item" v-for="item in gradeList.slice(4*(n-1),4*(n-1)+4)" :key="item">
                                    班级{{item}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src="../assets/images/create-now.png" alt="创建班级" class="create-grade-icon">
                    <div class="relive-mentor-relationship">
                        
                    </div>
                </div>
                <div class="homework-wrapper">
                    <div class="top-wrapper">
                        <img v-if="selectedList.length == 0" src="../assets/images/delete.png" class="delete-icon">
                        <img v-else src="../assets/images/delete-active.png" class="delete-icon">
                        <p class="top-title">一期三班学生列表</p>
                    </div>
                    <ul class="apprentice-wrapper">
                    <li v-for="n in 20" :key="n" class="apprentice-item">
                        <p class="username pointer">张某同学</p>
                        <span class="level-wrapper">6级</span>
                        <span class="dashed-line">
                            <i class="dot"></i>
                            <i class="dot"></i>
                            <i class="dot"></i>
                            <i class="dot"></i>
                            <i class="dot"></i>
                        </span>
                        <img src="../assets/images/edit-icon.png" class="home-icon">
                        <p class="join-time">3次未完成</p>
                        <button @click="toggleStudent(n,$event)" class="add pointer not-selected">添加</button>
                        <button @click="toggleStudent(n,$event)" class="add pointer selected">已选</button>
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
import Swiper from 'swiper'
export default {
    name:'chess-manage-student-panel',
    props:['is-show'],
    data() {
        return {
            categoryList:[
                {id:0,icon:require('../assets/images/成长日志.png')},
                {id:1,icon:require('../assets/images/我的成就.png')},
                {id:2,icon:require('../assets/images/我的作业.png')},
                {id:3,icon:require('../assets/images/自习室.png')}
            ],
            gradeList:[1,2,3,4,5,6,7,8,9,10,11,12,13],
            currentIndex:0,
            isFirstPage:true,
            isLastPage:false,
            selectedList:[]
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
        computedLength() {
            return Math.ceil(this.gradeList.length / 4) > 1;
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
        },
        toggleStudent(id,e) {
            const index = this.selectedList.indexOf(id);
            if(index != -1) {
                this.selectedList.splice(index,1);
                e.target.parentNode.classList.remove('active');
            }
            else {
                e.target.parentNode.classList.add('active');
                this.selectedList.push(id);
            }
        },
    },
    mounted() {
        this.isLastPage = Math.ceil(this.gradeList.length / 4) > 1 ? false : true;
        const vm = this;
        new Swiper('.swiper-container',{
                watchSlidesProgress:true,
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
                        else if(this.progress == 1) {
                            //无法点击最后一页
                            vm.isLastPage = true;
                            vm.isFirstPage = false;
                        }
                        else {
                            vm.isFirstPage = false;
                            vm.isLastPage = false;
                        }
                    }
                }
            });
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
        position: relative;
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
        position: relative;
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
    .grade-info-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 8rem;
    }
    .grade-logo {
        background: #f0e5c4;
        height: 8rem;
        width: 30%;
        border-radius: 0.5rem;
    }
    p.grade-editor {
        display: inline-flex;
        align-items: center;
        width: 100%;
    }
    img.add-student-icon {
        width: 50%;
    }
    span.title {
        color: #f0e5c4;
        font-size: 1.2rem;
    }
    img.edit-grade-icon {
        width: 1.3rem;
        margin-left: 1rem;
    }
    p.grade-person-number,p.grade-create-time {
        color: #e8c998;
        text-align: left;
        padding: 0.2rem 0;
    }
    .grade-name {
        text-align: left;
        display: flex;
        height: 90%;
        flex-direction: column;
        justify-content: space-between;
    }
    img.check-homework-icon,img.assign-homework-icon {
        width: 35%;
    }
    .btn-group {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    p.solid-line {
        width: 95%;
        height: 2px;
        margin: 1rem auto;
        background: #a97052;
        box-shadow: 0 1px 1px 0 #642c0f, inset 0 1px 1px 0 #d6997a;
    }
    .homework-condition-wrapper{
        height: 8rem;
        background: transparent;
        box-shadow: none;
    }
    .content-wrapper-container.swiper-wrapper {
        margin: 0 !important;
    }
    .grade-item {
        margin: 0 1%;
        width: 22%;
        height: 100%;
        background: #ebae3f;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.5rem;
    }
    .swiper-slide.swiper-slide-active {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background: transparent;
    }
    .swiper-slide{
        background: transparent;
    }
    .pre-page.swiper-button-next {
        position: absolute;
        right: -0.4rem;
        width: 1.8rem;
    }
    .next-page.swiper-button-prev {
        width: 1.8rem;
        left: -1.2rem;
        position: absolute;
    }
    img.navigation-icon{
        width: 100%;
    }
    img.create-grade-icon {
        width: 30%;
        position: absolute;
        right: 0;
        bottom: 0;
    }
    .top-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    img.delete-icon {
        width: 2rem;
    }
    p.top-title {
        flex: 0.95;
        text-align: center;
        background: #e9daad;
        padding: 0.5rem;
        font-size: 1.2rem;
        color: #895336;
        border-radius: 0.2rem;
    }
    ul.apprentice-wrapper {
        height: 85%;
        width: 100%;
        overflow: scroll;
        overflow-x: hidden;
        padding: 0 3rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
        -ms-overflow-style: none;
        scrollbar-width:none;
        padding-bottom: 7rem;
        margin-top: 0.5rem;
    }
    ul.apprentice-wrapper {
        height: 85%;
        width: 100%;
        overflow: scroll;
        overflow-x: hidden;
        padding: 0 3rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
        -ms-overflow-style: none;
        scrollbar-width:none;
        padding-bottom: 7rem;
        margin-top: 0.5rem;
    }
    ul.apprentice-wrapper::-webkit-scrollbar{
        width: 0;
    }
    
</style>
