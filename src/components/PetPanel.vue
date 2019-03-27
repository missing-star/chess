<template>
    <div class="chess-pet-panel">
        <div class="chess-dialog-body chess-pet-panel-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <div class="pet-info-wrapper">
                    <img src="../assets/images/elephant.png" class="pet-logo">
                    <div class="pet-level-info">
                        <div class="exp-wrapper">
                            <p class="title">经验值</p>
                            <div class="exp-progressbar-wrapper">
                                <div class="exp-progressbar"></div>
                            </div>
                            <p class="exp-progress-value">
                                15 / 20
                            </p>
                        </div>
                        <div class="exp-wrapper">
                            <p class="title">成长点</p>
                            <div class="exp-progressbar-wrapper">
                                <div class="exp-progressbar"></div>
                            </div>
                            <p class="exp-progress-value">
                                8 / 20
                            </p>
                        </div>
                    </div>
                </div>
                <div class="pet-operation-wrapper">

                </div>
            </div>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
    </div>
</template>
<script>
import ChessMask from './Mask'
export default {
    name:'chess-pet-panel',
    data() {
        return {
           
        }
    },
    methods:{
        closeMyself() {
            this.$emit('hide');
        }
    },
    props:['is-show'],
    components:{
        [ChessMask.name]:ChessMask
    }
}
</script>
<style scoped>
    div.chess-pet-panel-body{
        background: url(../assets/images/dialog-mailbox-bg.png) no-repeat; 
        background-size: 100% 100%;
    }
    div.content-wrapper-container{
        width: 82%;
        height: 72%;
        background-size: 100% 100%;
        margin-top: 14%;
        margin-left: 8%;
    }
    div.content-wrapper{
        background-size: 100% 100%;
        width: 98%;
        height: 98%;
        margin: 0 auto;
        position: relative;
        z-index: 1;
    }
    img.pet-logo {
        width: 20%;
        transform: rotate(15deg);
    }
    .pet-level-info {
        display: inline-block;
        vertical-align: top;
        width:80%;
    }
    p.title {
        color: #c49677;
        font-size: 1.2rem;
    }
</style>
