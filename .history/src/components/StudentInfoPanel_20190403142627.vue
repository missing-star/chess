<template>
    <div class="chess-student-info-panel">
        <div class="chess-dialog-body chess-student-info-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <div class="student-info-wrapper">
                    <div class="student-logo-wrapper">

                    </div>
                    <div class="student-detail-info-wrapper">
                        <div class="detail-info-item">姓名：张某</div>
                        <div class="detail-info-item">棋力：3级</div>
                        <div class="detail-info-item">班级：二期3班</div>
                        <div class="detail-info-item">学校：学校名称</div>
                        <div class="detail-info-item">性别：女</div>
                        <div class="detail-info-item">年龄：12</div>
                        <div class="detail-info-item">激活卡：1236548</div>
                        <div class="detail-info-item">使用时间：6个月</div>
                        <div class="detail-info-item block">激活卡时间范围：2018年11月15日 - 2019年5月14日</div>
                        <div class="detail-info-item block">
                            <p class="tilte">经验值：</p>
                            <div class="progressbar-wrapper">
                                <div class="progressbar"></div>
                            </div>
                            <p class="percent-value">160 / 200</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
    </div>
</template>
<script>
import ChessMask from './Mask'
export default {
    name:'chess-student-info-panel',
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
    div.chess-student-info-body{
        background: url(../assets/images/student-info-panel-bg.png) no-repeat; 
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
    span.dot{
        background: #8a5034;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        box-shadow: inset 0 0 2px #6d371d, 0 2px 2px #c68867;
    }
</style>
