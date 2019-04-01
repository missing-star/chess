<template>
    <div class="chess-teacher-list-panel">
        <div class="chess-dialog-body chess-teacher-list-panel-body" :class="{'hide':!isShow}">
            <div class="pre-wrapper">
                <img src="../assets/images/arrow-left-big.png" class="page-icon">
            </div>
            <div class="next-wrapper">
                <img src="../assets/images/arrow-right-big.png" class="page-icon">
            </div>
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="swiper-container">
                <div class="content-wrapper-container swiper-wrapper">
                    <div class="swiper-slide" v-for="n in Math.ceil(teacherList.length / 12)" :key="n">
                        <div class="teacher-item" v-for="item in teacherList.slice(12*(n-1),12*(n-1)+11)" :key="item">
                            <img src="../assets/images/user-logo.png" class="teacher-logo">
                            <p class="teacher-name">老师名称</p>
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
import Swiper from 'swiper'
export default {
    name:'chess-teacher-list-panel',
    data() {
        return {
           teacherList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
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
    },
    mounted() {
        this.$nextTick(() => {
            new Swiper('.swiper-container');
        })
    }
}
</script>
<style scoped>
    div.chess-teacher-list-panel-body{
        background: url(../assets/images/老师列表底.png) no-repeat; 
        background-size: 100% 100%;
    }
    div.swiper-container {
        width: 90%;
        height: 80%;
        margin-top: 11%;
        margin-left: 3%;
        background: url(../assets/images/列表底.png) no-repeat;
        background-size: 100% 100%;
    }
    div.swiper-slide{
        display: flex;
        padding: 3rem;
        background: transparent;
    } 
    img.mail-box-close{
        top: 2rem;
        right: -4.2rem;
    }
    .pre-wrapper,.next-wrapper {
        position: absolute;
        width: 5rem;
        top: 50%;
        cursor: pointer;
    }
    .pre-wrapper{
        left: -2rem;
    }
    .next-wrapper{
        right: -1.5rem;
    }
    img.page-icon {
        width: 100%;
    }
    .teacher-item {
        background: #fff;
        border-radius: 0.6rem;
        width: 14%;
        text-align: center;
        margin: 0 0.4rem;
        padding: 1rem;
    }
    img.teacher-logo {
        width: 100%;
    }
</style>
