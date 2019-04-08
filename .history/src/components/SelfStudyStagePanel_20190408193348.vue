<template>
    <div class="chess-student-detail-panel">
        <div class="chess-dialog-body chess-student-detail-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <div class="category-wrapper">
                    <p @click="switchCase(0)" class="title pointer" :class="{active:currentIndex == 0}">标题</p>
                    <p class="split-line"></p>
                    <p @click="switchCase(1)" class="title pointer" :class="{active:currentIndex == 1}">标题</p>
                    <p class="split-line"></p>
                    <p @click="switchCase(2)" class="title pointer" :class="{active:currentIndex == 2}">标题</p>
                    <p class="split-line"></p>
                    <p @click="switchCase(3)" class="title pointer" :class="{active:currentIndex == 3}">标题</p>
                </div>
                <div class="homework-wrapper">
                    <ul class="item-list-wrapper">
                        <li class="item">
                            <div class="left-part">
                                <p class="item-title">标题</p>
                                <div class="progressbar-wrapper">
                                    <p class="progressbar"></p>
                                    <span class="finish-status"> 0 / 1</span>
                                </div>
                            </div>
                            <div class="right-part">
                                <img src="../assets/images/arrow-right-task.png" class="arrow-right-icon">
                                <p class="go-study">去练习</p>
                            </div>
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
export default {
    name:'chess-self-study-stage-panel',
    props:['is-show'],
    data() {
        return {
            categoryList:[
                {id:0,icon:require('../assets/images/成长日志.png')},
                {id:1,icon:require('../assets/images/我的成就.png')},
                {id:2,icon:require('../assets/images/我的作业.png')},
                {id:3,icon:require('../assets/images/自习室.png')}
            ],
            currentIndex:0
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
        switchCase(index) {
            if(this.currentIndex != index) {
                this.currentIndex = index;
            }
        }
    }
}
</script>
<style scoped>
    div.chess-student-detail-body{
        background: url(../assets/images/self-study-stage-bg.png) no-repeat; 
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
        height: 65%;
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
    p.title{
        background: url(../assets/images/not-active-bg.png) no-repeat;
        background-size: 100% 100%;
        width: 80%;
        height: 3.5rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #efd9ad;
        font-size: 1.5rem;
        text-shadow:0 2px 2px #552a12;
    }
    p.title.active{
        background: url(../assets/images/active-bg.png) no-repeat;
        background-size: 100% 100%;
        width: 80%;
        height: 3.5rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color:#703e23;
        text-shadow:0 1px 1px #ffffff;
    }
    p.split-line{
        background: url(../assets/images/split-line.png) no-repeat;
        background-size: 100% 100%;
        height: 4px;
        width: 80%;
    }
    .homework-wrapper {
        width: 45%;
        margin-left: 8%;
        height: 85%;
    }
    li.item {
        background-image: linear-gradient(-180deg, #fae7b4 0%, #fcefcb 65%, #fbeecc 100%);
        box-shadow: 0 2px 4px 0 #a49466;
        border-radius: 0.5rem;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 5rem;
    }
    .left-part {
        border: 1px dashed #e9ce84;;
        height: 85%;
        width: 70%;
        border-radius: 0.5rem;
        margin-left: 0.5rem;
        padding: 0.5rem;
    }
    p.item-title {
        color: #753f22;
        font-size: 1.5rem;
    }
    .progressbar-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.5rem;
    }
    p.progressbar {
        width: 80%;
        height: 0.8rem;
        background: url(../assets/images/finish-pro.png) no-repeat;
        background-size: 100% 100%;
    }
    span.finish-status {
        color: #ff6f00;
    }
    .right-part {
        background-image: linear-gradient(-180deg, #309be6 0%, #66b5ed 65%, #5daee7 100%);
        height: 100%;
        width: 20%;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
    img.arrow-right-icon {
        width: 40%;
    }
</style>
