<template>
    <div class="chess-teacher-list-panel">
        <div class="chess-dialog-body chess-teacher-list-panel-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="pre-wrapper swiper-button-prev">
                    <img v-if="isFirstPage" src="../assets/images/arrow-left-disabled.png" class="page-icon">
                    <img v-else src="../assets/images/arrow-left-big.png" class="page-icon">
                </div>
                <div class="next-wrapper swiper-button-next">
                    <img v-if="isLastPage" src="../assets/images/arrow-right-disabled.png" class="page-icon">
                    <img v-else src="../assets/images/arrow-right-big.png" class="page-icon">
                </div>
            <div class="swiper-container">
                <div class="content-wrapper-container swiper-wrapper">
                    <div class="swiper-slide" v-for="n in Math.ceil(teacherList.length / 12)" :key="n">
                        <div class="teacher-item" v-for="item in teacherList.slice(12*(n-1),12*(n-1)+12)" :key="item">
                            <img src="../assets/images/user-logo.png" class="teacher-logo">
                            <p class="teacher-name">老师名称</p>
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
    </div>
</template>
<script>
import ChessMask from './Mask'
import Swiper from 'swiper'
import { constants } from 'fs';
export default {
    name:'chess-teacher-list-panel',
    data() {
        return {
           teacherList:[1,2,3,4,5,6,7,8,9,10],
           isFirstPage:true,
           isLastPage:false
        }
    },
    methods:{
        closeMyself() {
            this.$emit('hide');
        },
        computedLength() {
            return Math.ceil(teacherList.length / 12) > 1;
        }
    },
    props:['is-show'],
    components:{
        [ChessMask.name]:ChessMask
    },
    mounted() {
        this.isLastPage = Math.ceil(this.teacherList.length / 12) > 1 ? false : true;
        this.$nextTick(() => {
            const vm = this;
            new Swiper('.swiper-container',{
                watchSlidesProgress:true,
                 pagination: {
                    el: '.swiper-pagination',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                on:{
                    progress: function(progress){
                        if(this.progress == 0) {
                            //无法点击上一页
                            vm.isFirstPage = true;
                            if(this.computedLength()) {
                                vm.isLastPage = false;
                            }
                        }
                        if(this.progress == 1) {
                            //无法点击最后一页
                            vm.isLastPage = true;
                            vm.isFirstPage = false;
                        }
                    }
                }
            });
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
        flex-wrap: wrap;
        padding: 3rem;
        background: transparent;
        align-items: flex-start;
        justify-content: flex-start;
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
        margin: 2rem 0.6rem;
        padding: 1rem;
    }
    img.teacher-logo {
        width: 100%;
    }
</style>
