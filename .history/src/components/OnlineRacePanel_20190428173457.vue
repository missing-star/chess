<template>
    <div class="chess-online-race-panel">
        <div class="chess-dialog-body chess-online-race-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <div class="fighter-wrapper">
                    <div class="user-item">

                    </div>
                    <div class="vs-wrapper">
                        <div class="match-status-wrapper">
                            <img v-if="waitTime == 10" src="../assets/images/匹配成功.png" class="match-success">
                            <div v-else class="start-match matching">
                                正在匹配
                            </div>
                        </div>
                        <div class="match-tips-wrapper">

                        </div>
                    </div>
                    <div class="user-item">

                    </div>
                </div>
                <!-- <div class="user-fight-wrapper">
                    <div class="user-left">
                        <p class="username">{{userName}}</p>
                        <img :src="userLogo" alt="" class="user-logo">
                    </div>
                    <img src="../assets/images/vs.png" alt="vs" class="vs-icon">
                    <div class="user-right">
                        <p class="username">等待中</p>
                        <img src="../assets/images/user-logo.png" alt="" class="user-logo">
                    </div>
                </div>
                <div class="img-wrapper">
                    <img src="../assets/images/elephant.png" alt="">
                    <img src="../assets/images/online-race-middle-icon.png" alt="">
                    <img src="../assets/images/elephant.png" alt="">                
                </div>
                <img v-if="waitTime == 0"  @click="startFight" src="../assets/images/start-game.png" alt="开战" class="start-icon pointer">
                <p v-else class="wait-time">正在匹配{{waitTime}}s</p> -->
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
    div.user-item{
        background: url(../assets/images/用户头像框.png) no-repeat;
        background-size: 100% 100%;
        width: 18%;
        height: 60%;
    }
    .fighter-wrapper {
        width: 100%;
        height: 60%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    img.match-success {
        width: 40%;
    }
    .vs-wrapper {
        position: relative;
        flex: 1;
        height: 60%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
    }
    .match-status-wrapper {
        width: 100%;
    }
    div.start-match{
        background: url(../assets/images/时间框.png) no-repeat;
        background-size: 100% 100%;
        width: 30%;
        text-align: center;
        padding: 2%;
        color: #f7e8b9;
        font-size: 0.8rem;
        margin: 2% auto;
    }
    div.match-tips-wrapper{
        background: url(../assets/images/vs.png) no-repeat;
        background-size: 100% 100%;
        width: 80%;
        height: 80%;
    }
    /* div.content-wrapper{
        background: url(../assets/images/yellow-2.png) no-repeat;
        background-size: 100% 100%;
        width: 98%;
        height: 98%;
        margin: 0 auto;
        position: relative;
        z-index: 1;
    } */
    /* .user-fight-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 40%;
    }
    img.vs-icon {
        height: 40%;
    }
    .user-left,.user-right {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
    }
    p.username {
        color: #000;
        font-size: 1rem;
        white-space: nowrap;
    }
    img.user-logo {
        max-width: 5rem;
        height: 50%;
        background: #fff;
        border-radius: 50%;
        margin-left: 1rem;
    }
    .img-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 40%;
    }
    .img-wrapper>img{
        height: 80%;
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
    } */
</style>
