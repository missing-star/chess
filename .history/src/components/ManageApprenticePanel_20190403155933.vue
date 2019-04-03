<template>
    <div class="chess-manage-apprentice-panel">
        <div class="chess-dialog-body chess-manage-apprentice-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <ul class="apprentice-wrapper">
                    <li v-for="n in 20" :key="n" class="apprentice-item">
                        <div class="student-info-wrapper">
                            <p class="student-name">学生名称</p>
                            <p class="active-card">激活卡：123456784</p>
                        </div>
                        <img src="../assets/images/detail-btn.png" class="detail-icon">
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
    name:'chess-manage-apprentice-panel',
    props:['is-show'],
    data() {
        return {
            
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
    div.chess-manage-apprentice-body{
        background: url(../assets/images/apprentice-border-bg.png) no-repeat,url(../assets/images/apprentice-color-bg.png) no-repeat; 
        background-size: 100% 100%,101% 93%;
        background-position: center,center 121%;
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
    img.mail-box-close{
        top: 0.2rem;
        right: -4rem;
    }
    ul.apprentice-wrapper {
        height: 85%;
        width: 100%;
        overflow: hidden;
        padding: 0 3rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    li.apprentice-item {
        width: 48%;
        background: #fbeecb;
        margin: 0.5rem 0;
        border-radius: 1rem;
    }
</style>
