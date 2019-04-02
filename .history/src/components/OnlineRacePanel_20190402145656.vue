<template>
    <div class="chess-online-race-panel">
        <div class="chess-dialog-body chess-online-race-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <div class="user-fight-wrapper">
                    <div class="user-left">
                        <p class="username">用户名</p>
                        <img src="../assets/images/user-logo.png" alt="" class="user-logo">
                    </div>
                    <img src="../assets/images/vs.png" alt="vs" class="vs-icon">
                    <div class="user-right">
                        <p class="username">用户名</p>
                        <img src="../assets/images/user-logo.png" alt="" class="user-logo">
                    </div>
                </div>
                <div class="img-wrapper">
                    <img src="../assets/images/elephant.png" alt="">
                    <img src="../assets/images/online-race-middle-icon.png" alt="">
                    <img src="../assets/images/elephant.png" alt="">                
                </div>
                <img @click="startFight" src="../assets/images/重做.png" alt="开战" class="start-icon pointer">
            </div>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
    </div>
</template>
<script>
import ChessMask from './Mask'
export default {
    name:'chess-online-race-panel',
    data() {
        return {
            currentTab:0
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
    div.chess-online-race-body{
        background: url(../assets/images/dialog-mailbox-bg.png) no-repeat; 
         background-size: 100% 100%;
    }
    div.content-wrapper-container{
        background:#f0e5c4;
        width: 80%;
        height: 65%;
        margin-top: 16%;
        margin-left: 8%;
        border-radius: 1rem;
    }
    div.content-wrapper{
        background: url(../assets/images/yellow-2.png) no-repeat;
        background-size: 100% 100%;
        width: 98%;
        height: 98%;
        margin: 0 auto;
        position: relative;
        z-index: 1;
    }
    img.mail-box-close{
        right:-4rem;
        top: 2rem;
    }
    .user-fight-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding-top: 1rem;
    }
    img.vs-icon {
        width: 10rem;
    }
    .user-left,.user-right {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    p.username {
        color: #000;
        font-size: 1.5rem;
    }
    img.user-logo {
        width: 5rem;
        height: 5rem;
        background: #fff;
        border-radius: 50%;
        margin-left: 1rem;
    }
    .img-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding-top: 1rem;
    }
    .img-wrapper>img{
        width: 25%;
    }
    img.start-icon {
        display: block;
        margin: 0 auto;
        width: 15%;
        margin-top: 5%;
    }
</style>
