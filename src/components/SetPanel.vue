<template>
    <div class="chess-set-panel">
        <div class="chess-dialog-body chess-set-panel-body" :class="{'hide':!isShow}">
            <img src="../assets/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper">
                <div class="user-and-time-wrapper">
                    <section class="user-wrapper">
                        <img src="../assets/user-logo.png" class="user-logo">
                        <p class="username">用户名称</p>
                        <div class="button-wrapper">
                            <button class="exit-login">退出登录</button>
                        </div>
                        <div class="button-wrapper">
                            <button class="change-pwd">修改密码</button>
                        </div>
                    </section>
                    <section class="time-wrapper">
                        <p class="ajust-game-title">调整游戏时间</p>
                        <div class="dashed-line"></div>
                    </section>
                </div>
                <div class="volume-and-music-wrapper">
                    <section class="volume-wrapper">
                        <p class="volume-set-title">音量</p>
                        <div class="volume-set-control">
                            <span class="lower">小</span>
                            <input type="range" class="volume-range" value="0">
                            <span class="higher">大</span>
                        </div>
                    </section>
                    <section class="music-wrapper">
                        <p class="bg-music-title">背景音乐</p>
                        <div class="music-control-wrapper">
                            <chess-switch width="7" active-title="开启" un-active-title="关闭"></chess-switch>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
    </div>
</template>
<script>
import ChessMask from './Mask'
import Switch from './Switch'
export default {
    name:'chess-set-panel',
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
        [ChessMask.name]:ChessMask,
        [Switch.name]:Switch
    }
}
</script>
<style scoped>
    div.chess-set-panel-body{       
        background: url(../assets/dialog-setting-bg.png) no-repeat;   
    }
    div.content-wrapper{
        width: 82%;
        height: 80%;
        background-size: 100% 100%;
        margin-top: 12%;
        margin-left: 8%;
    }
    section.user-wrapper {
        background: #995f41;
        box-shadow: 0 1px 2px 0 #d0997c, inset 0 1px 2px 0 #5c2d14;
        border-radius: 1rem;
        height: 17rem;
        width: 35%;
        text-align: center;
        display: inline-block;
        vertical-align: top;
    }
    img.user-logo {
        width: 5rem;
        height: 5rem;
        background: skyblue;
        border-radius: 1rem;
        margin-top: 1rem;
    }
    p.username {
        color: #ffddaa;
        padding: 1rem;
        font-size: 1.5rem;
    }
    div.button-wrapper {
        background-image: linear-gradient(-180deg, #f5eedb 0%, #e2b471 100%);
        box-shadow: 0 2px 4px 0 #744730, inset 0 1px 3px 0 rgba(255,255,255,0.50);
        border: none;
        border-radius: 2rem;
        width: 90%;
        margin: 0.5rem auto;
        padding: 0.2rem;
    }
    button.exit-login,button.change-pwd{
        background-image:linear-gradient(-1deg, #f1e1bb 0%, #ecc992 100%);
        box-shadow:inset 0 1px 1px 0 #ffefd6;
        padding: 0.3rem;
        display: block;
        width: 100%;
        border-radius: 2rem;
        border: none;
        color:#703e23;
        cursor: pointer;
        outline: 0;
        font-size: 1rem;
    }
    section.time-wrapper {
        background: #995f41;
        box-shadow: 0 1px 2px 0 #d0997c, inset 0 1px 2px 0 #5c2d14;
        border-radius: 1rem;
        height: 17rem;
        width: 60%;
        text-align: center;
        display: inline-block;
        vertical-align: top;
        margin-left: 5%;
    }
    div.dashed-line{
        background: url(../assets/dot.png);
        height: 0.5rem;
        width: 83%;
        background-size: contain;
        margin: 0 auto;
    }
    p.ajust-game-title {
        color: #ffddaa;
        padding: 1rem;
        font-size: 1.5rem;
    }
    div.volume-and-music-wrapper {
        padding-top: 1rem;
    }
    section.volume-wrapper {
        width: 35%;
        height: 12rem;
        display: inline-block;
        padding-top: 2rem;
    }
    p.volume-set-title {
        text-align: center;
        font-size: 1.5rem;
        color: #f1e4c1;
    }
    span.lower,span.higher {
        background: #995f41;
        box-shadow: 0 1px 1px 0 #cd9f87, inset 0 1px 1px 0 #744126;
        border-radius: 50%;
        display: inline-block;
        padding: 0.5rem;
        color: #f1e4c1;
    }
    .volume-set-control {
        margin-top: 3rem;
    }
    input[type=range] {
        -webkit-appearance: none !important;
        height: 1rem;
        width: 60%;
        margin: 0 1rem;
        background-image:linear-gradient(-1deg, #ffa635 0%, #ff772c 100%);
        box-shadow:0 -1px 1px 0 #894e31, inset 0 -1px 1px 0 #ff9619, inset 0 2px 4px 0 #ad4400;
        border-radius: 1rem;
    }
    input[type=range]::-webkit-slider-runnable-track {
        height: 1rem;
    }
    input[type=range]:focus{
        outline: 0;
    }
    input[type=range]::-webkit-slider-thumb {
        cursor: pointer;
        -webkit-appearance: none !important;
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 50%;
        position: relative;
        top: -0.75rem;
        background: #f3e6c4;
        padding: 1rem;
        background-image: url(../assets/speaker.png);
        background-size: 55% 55%;
        background-repeat: no-repeat;
        background-position: center center;
    }
    section.volume-wrapper,section.music-wrapper{
        display: inline-block;
        vertical-align: top;
    }
    section.music-wrapper{
        width: 60%;
        margin-left: 5%;
        width: 60%;
        height: 12rem;
        padding-top: 2rem;
    }
    p.bg-music-title{
        text-align: center;
        font-size: 1.5rem;
        color: #f1e4c1;
    }
    .music-control-wrapper {
        margin-top: 3rem;
        padding-left: 40%;
    }
</style>
