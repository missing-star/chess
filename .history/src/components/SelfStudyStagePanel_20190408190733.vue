<template>
    <div class="chess-student-detail-panel">
        <div class="chess-dialog-body chess-student-detail-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <div class="category-wrapper">
                    <p class="title" :class="{active:currentIndex == 0}">标题</p>
                    <p class="split-line"></p>
                    <p class="title" :class="{active:currentIndex == 0}">标题</p>
                    <p class="split-line"></p>
                    <p class="title" :class="{active:currentIndex == 0}">标题</p>
                    <p class="split-line"></p>
                    <p class="title" :class="{active:currentIndex == 0}">标题</p>
                </div>
                <div class="homework-wrapper">
                    
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
    
</style>
