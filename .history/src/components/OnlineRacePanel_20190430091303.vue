<template>
    <div class="chess-online-race-panel">
        <div class="chess-dialog-body chess-online-race-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <div class="fighter-wrapper">
                    <div class="user-item">
                        <img :src="userLogo" class="user-logo">
                        <p class="nickname">{{userName}}</p>
                    </div>
                    <div class="vs-wrapper">
                        <div class="match-status-wrapper">
                            <img v-if="waitTime == 0 && isMatchSuccess" src="../assets/images/匹配成功.png" class="match-success">
                            <div v-else class="start-match matching">
                                {{waitTips}}
                            </div>
                        </div>
                        <div class="match-tips-wrapper">
                            <p class="tips-chara">匹配最佳搭档，开始对战吧</p>
                        </div>
                    </div>
                    <div class="user-item">
                        <img :src="fightLogo" class="user-logo">
                        <p class="nickname">{{fightName}}</p>
                    </div>
                </div>
                <div class="dashed-line"></div>
                <div class="btn-group-wrapper">
                    <!-- <button v-if="isMatchSuccess" @click="startGame" class="online-match-btn pointer success"></button> -->
                    <button :disabled="waitTime < 15 && waitTime != 0" @click="startFight" class="online-match-btn pointer"></button>
                </div>
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
        },
        startGame() {
            this.$emit('start-fight');
        }
    },
    computed:{
        waitTips() {
            console.log(this.waitTime);
            return '00:'+(this.waitTime < 10 ? ('0' + this.waitTime) : this.waitTime);
        }
    },
    props:['is-show','wait-time','is-match-success','fight-name','fight-logo'],
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
    img.user-logo{
        width: 80%;
        height: 70%;
        position: relative;
        z-index: -1;
        left: 7%;
        padding: 2%;
        margin-top: 2%;
        background: #fff;
        border-radius: 50%;
    }
    div.user-item{
        background: url(../assets/images/用户头像框.png) no-repeat;
        background-size: 100% 100%;
        width: 20%;
        height: 60%;
        position: relative;
    }
    p.nickname {
        position: absolute;
        color: #fff;
        bottom: 15%;
        font-size: 0.6rem;
        width: 100%;
        text-align: center;
    }
    .fighter-wrapper {
        width: 100%;
        height: 70%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    img.match-success {
        width: 20%;
    }
    .vs-wrapper {
        position: relative;
        flex: 1;
        height: 60%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-direction: column;
    }
    .match-status-wrapper {
        width: 100%;
        position: absolute;
        top: -20%;
        text-align: center;
    }
    div.start-match{
        background: url(../assets/images/时间框.png) no-repeat;
        background-size: 100% 100%;
        width: 25%;
        text-align: center;
        padding: 1.5%;
        color: #f7e8b9;
        font-size: 0.8rem;
        margin: 2% auto;
    }
    div.match-tips-wrapper{
        background: url(../assets/images/vs.png) no-repeat;
        background-size: 100% 100%;
        width: 80%;
        height: 92%;
        position: relative;
    }
    p.tips-chara {
        position: absolute;
        bottom: 20%;
        font-size: 0.6rem;
        text-align: center;
        width: 100%;
        color: #a97052;
    }
    div.dashed-line{
        background: url(../assets/images/split-line-race.png) no-repeat;
        background-size: 100% 100%;
        height: 2%;
    }
    button.online-match-btn{
        background: url(../assets/images/online-match.png) no-repeat;
        background-size: 100% 100%;
        height: 60%;
        width: 30%;
        outline: 0;
        border: none;
    }
    button.online-match-btn:active{
         background: url(../assets/images/online-match-active.png) no-repeat;
        background-size: 100% 90%;
    }
    button.online-match-btn.success{
        background: url(../assets/images/fight-now.png) no-repeat;
        background-size: 100% 100%;
        height: 60%;
        width: 30%;
        outline: 0;
        border: none;
    }
    button.online-match-btn.success:active{
         background: url(../assets/images/fight-now-active.png) no-repeat;
        background-size: 100% 90%;
    }
    .btn-group-wrapper {
        height: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
