<template>
    <div class="chess-personal-info-panel">
        <div class="chess-dialog-body chess-personal-info-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <div class="user-info-logo-wrapper">
                    <div class="user-logo-wrapper">
                        <img src="../assets/images/user-logo.png" class="user-logo">
                    </div>
                    <div class="username">
                        周某人
                    </div>
                </div>
                <div class="user-info-detail-wrapper">
                    <p class="userinfo-item inline">姓名：周某人</p>
                    <p class="userinfo-item inline">性别：男</p>
                    <p class="userinfo-item inline">年龄：36岁</p>
                    <p class="userinfo-item inline">教龄：6年</p>
                    <p class="userinfo-item block">所属学校：学校名称</p>
                </div>
            </div>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
    </div>
</template>
<script>
import ChessMask from './Mask'
export default {
    name:'chess-personal-info-panel',
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
    div.chess-personal-info-body{
        background: url(../assets/images/personal-info-panel.png) no-repeat; 
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
    .user-info-logo-wrapper {
        width: 45%;
        height: 85%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    img.mail-box-close{
        top: 0.2rem;
        right: -4rem;
    }
    .user-info-detail-wrapper {
        width: 50%;
        height: 35%;
        margin-left: 5%;
        position: relative;
    }
    div.user-logo-wrapper{
        background: url(../assets/images/personal-info-logo-wrapper.png) no-repeat;
        background-size: 100% 100%;
        width: 60%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img.user-logo {
        width: 55%;
        transform: rotate(8deg);
    }
    .username {
        background: #ab7255;
        box-shadow: 0 1px 1px 0 #d8a88f, inset 0 1px 1px 0 #7f4729;
        width: 45%;
        height: 2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        border-radius: 0.3rem;
        margin-top: 2rem;
    }
    .user-info-detail-wrapper {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    p.userinfo-item {
        background: #fcf3d6;
        height: 2.5rem;
        border-radius: 0.2rem;
        margin: 0.6rem 0;
        display: inline-flex;
        align-items: center;
        color: #b87f61;
        padding:0.5rem; 
        font-weight: bold;
    }
    p.userinfo-item.inline {
        width: 45%;
    }
    p.userinfo-item.block {
        width: 100%;
    }
</style>
