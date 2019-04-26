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
                <img v-if="waitTime == 0"  @click="startFight" src="../assets/images/start-game.png" alt="开战" class="start-icon pointer">
                <p v-else class="wait-time">正在匹配{{waitTime}}s</p>
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
            
        }
    },
    methods:{
        closeMyself() {
            this.$emit('hide');
        },
        startFight() {
            //开始匹配
            this.$emit('start-game');
        }
    },
    props:['is-show','wait-time'],
    components:{
        [ChessMask.name]:ChessMask
    },
    mounted() {
        
    }
}
</script>
<style scoped>
    div.chess-online-race-body{
        background: url(../assets/images/online-race-bg.png) no-repeat; 
         background-size: 100% 100%;
         display: flex;
        align-items: center;
        justify-content: center;
    }
    div.content-wrapper-container{
        width: 80%;
        height: 70%;
        border-radius: 1rem;
        padding-top: 3%;
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
    p.wait-time {
        text-align: center;
        color: #c38e72;
        margin-top: 5%;
    }
</style>
