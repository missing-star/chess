<template>
    <div class="chess-task-panel">
        <div class="chess-dialog-body chess-task-panel-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <div class="create-delete-wrapper">
                    <img src="../assets/images/create-table-btn.png" alt="创建棋谱" class="create-table-icon">
                    <p class="delete-wrapper">
                        <img src="../assets/images/delete-active.png" alt="删除" class="delet-icon">
                        <img src="../assets/images/delete.png" alt="删除" class="delete-icon">
                        <span class="delete-title">删除</span>
                    </p>
                </div>
                <ul class="task-list-wrapper">
                    <li v-for="n in 20" :key="n" class="task-item">
                        <p class="finish-bonus">
                            完成奖励
                        </p>
                        <div class="task-title-wrapper">
                            <p class="task-title">任务标题</p>
                            <div class="task-progress-wrapper">
                                <div class="progress-bar-wrapper">
                                    <div class="progress-bar"></div>
                                </div>
                                <span class="task-num">3 / 3</span>
                            </div>
                        </div>
                        <div class="finish-bonus-content">
                            <p class="content-title"><img src="../assets/images/temp-icon.png" class="bonus-icon">30</p>
                        </div>
                        <div class="finish-status-wrapper" v-if="n % 2 != 0">
                            已完成
                        </div>
                        <div class="finish-status-wrapper not-finished" v-if="n % 2 == 0">
                            <img class="go-finish-icon" src="../assets/images/arrow-right-task.png">
                            去完成
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
    </div>
</template>
<script>
import ChessMask from './Mask'
export default {
    name:'chess-table-panel',
    props:['is-show'],
    data() {
        return {
            currentIndex:0
        }
    },
    components:{
        [ChessMask.name]:ChessMask
    },
    methods: {
        closeMyself() {
            this.$emit('hide');
        },
        switchTab(index) {
            this.currentIndex = index;
        }
    }
}
</script>
<style scoped>
    div.chess-task-panel-body{
        background: url(../assets/images/create-table-bg.png) no-repeat; 
        background-size: 100% 100%;
    }
    div.content-wrapper-container{       
        width: 82%;
        height: 80%;
        margin-top: 7%;
        margin-left: 8%;
    }
    ul.task-list-wrapper{
        overflow-x: hidden;
        overflow-y: scroll;
        /* firfox非标准属性 */
        scrollbar-width: none;
        /* ie/edge */
        -ms-overflow-style: none;
        height: 98%;
    }
    ul.task-list-wrapper::-webkit-scrollbar{
        width: 0;
        height: 0;
    }
    li.task-item {
        width: 46%;
        display: inline-block;
        height: 4.8rem;
        margin: 2%;
        background-image:linear-gradient(-180deg, #fae7b4 0%, #fcefcb 65%, #fbeecc 100%);
        box-shadow:0 6px 8px 0 #6a3a21;
        border-radius: 0.8rem;
        position: relative;
        padding: 0.5rem;
    }
    .task-title-wrapper {
        border: 1px dashed #e9ce84;
        height: 100%;
        border-radius: 0.5rem;
        width: 60%;
        padding: 0.2rem;
        display: inline-block;
    }
    p.task-title {
        color: #753f22;
        font-size: 1.5rem;
    }
    .progress-bar-wrapper {
        width: 75%;
        height: 0.6rem;
        background:#ecd186;
        box-shadow:0 1px 1px 0 #fffbf0, inset 0 1px 1px 0 #b59a4d;
        border-radius: 0.6rem;
        display: inline-block;
        vertical-align: top;
    }
    .progress-bar {
        background:#ff6d21;
        box-shadow:0 1px 1px 0 #ffffff, inset 0 1px 1px 0 #d16b1e;
        height: 100%;
        width: 20%;
        border-radius: 0.6rem;
    }
    span.task-num {
        display: inline-block;
        vertical-align: text-top;
        line-height: 0.5rem;
        color:#ff6f00;
        padding-left: 0.4rem;
    }
    .task-progress-wrapper {
        padding-top: 0.8rem;
    }
    p.finish-bonus{
        background:#f2db9a;
        box-shadow:0 1px 1px 0 rgba(255,255,255,0.50);
        top: 0;
        right: 18%;
        font-size: 0.5rem;
        padding: 0.3rem;
        border-bottom-right-radius: 0.2rem;
        border-bottom-left-radius: 0.2rem;
        color: #d2875f;
        position: absolute;
    }
    .finish-status-wrapper {
        position: absolute;
        right: 0;
        height: 100%;
        top: 0;
        border-top-right-radius: 0.8rem;
        border-bottom-right-radius: 0.8rem;
        background: #f2db9a;
        box-shadow: -1px 0 1px 0 #fff7e0;
        writing-mode: vertical-lr;
        text-align: center;
        width: 2.5rem;
        color:#a97052;
        padding-left: 0.85rem;
        font-size: 0.7rem;
        letter-spacing: 2px;
        cursor: pointer;
    }
    img.go-finish-icon{
        width: 1rem;
    }
    .finish-status-wrapper.not-finished {
        background-image: linear-gradient(-180deg, #309be6 0%, #66b5ed 65%, #5daee7 100%);
        color: #fcecc1;
        box-shadow: -1px 0 1px 0 #66b5ed;
    }
    .finish-bonus-content {
        display: inline-block;
        position: relative;
        bottom: 0.5rem;
        left: 0.5rem;
    }
    img.bonus-icon {
        position: absolute;
        left: -1px;
        width: 2rem;
        top: -0.15rem;
        padding: 0;
        margin: 0;
    }
    p.content-title {
        background: #c19863;
        box-shadow: 0 1px 1px 0 #ffffff, inset 0 1px 1px 0 #9a703a;
        width: 5rem;
        border-radius: 1.2rem;
        color: #FFFFFF;
        padding: 0.2rem;
        line-height: 1.2rem;
        position: relative;
        text-align: right;
        padding-right: 1rem;
    }
    img.mail-box-close{
        top: -1rem;
        right: -4rem;
    }
    .create-delete-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    img.create-table-icon {
        width: 8rem;
    }
</style>
