<template>
    <div class="chess-notice-panel">
        <div class="tabbar-wrapper" :class="{'hide':!isShow}">
            <div @click="switchTab(0)" class="tabbar-item" :class="{active:currentIndex == 0}">
                平台公告
                <p class="unread-number">5</p>
            </div>
            <div class="tabbar-item" @click="switchTab(1)" :class="{active:currentIndex == 1}">
                学校公告
                <p class="unread-number">5</p>
            </div>
        </div>
        <div class="chess-dialog-body chess-notice-panel-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <ul class="msg-list-wrapper">
                    <li v-for="n in 40" :key="n" class="msg-item">
                        <img src="../assets/images/unread.png" class="unread-icon">
                        <p class="msg-content">你已收徒成功</p>
                        <a href="javascript:;" class="detail">详情</a>
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
    name:'chess-notice-panel',
    props:['is-show'],
    components:{
        [ChessMask.name]:ChessMask
    },
    data() {
        return {
            currentIndex:0
        }
    },
    methods: {
        closeMyself() {
            this.$emit('hide');
        },
        switchTab(index) {
            this.currentIndex = index;
        }
    }
}
</script>
<style scoped>
    div.chess-notice-panel-body{
        background: url(../assets/images/dialog-setting-bg.png) no-repeat; 
    }
    div.content-wrapper-container{
        background: url(../assets/images/yellow-2.png) no-repeat;
        width: 82%;
        height: 80%;
        background-size: 100% 100%;
        margin-top: 7%;
        margin-left: 8%;
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
    ul.msg-list-wrapper {
        margin: 5rem;
        height: 85%;
        overflow-x: hidden;
        overflow-y: scroll;
        position: relative;
        top: 2rem;
        padding-left: 0.5rem;
        padding-top: 0.5rem;
        /* firfox非标准属性 */
        scrollbar-width: none;
        /* ie/edge */
        -ms-overflow-style: none;
    }
    ul.msg-list-wrapper::-webkit-scrollbar{
        height: 0;
        width: 0;
    }
    li.msg-item{
        position: relative;
        color:#a97052;
        margin-bottom: 0.8rem;
        background: url(../assets/images/msg-bg.png) no-repeat;
        background-size: 100% 100%;
        padding:0.8rem 1rem;
    }
    img.unread-icon {
        position: absolute;
        width: 1.5rem;
        left: -0.5rem;
        top: -0.5rem;
    }
    p.msg-content{
        display: inline-block;
    }
    a.detail {
        color: #ff8607;
        text-decoration: none;
        float: right;
    }
    .tabbar-wrapper {
        position: absolute;
        top: 5.8rem;
        left: 38%;
        z-index: 2;
        transition: all 0.3s ease-out;
    }
    .tabbar-wrapper.hide{
        top: -100%;
    }
    div.tabbar-item{
        background: url(../assets/images/tab-icon.png) no-repeat;
        background-size: 100% 100%;
        width: 14rem;
        height: 5rem;
        display: inline-block;
        cursor: pointer;
        color: #753f22;
        text-align: center;
        line-height: 4rem;
        font-size: 1.8rem;
        font-weight: bold;
        position: relative;
    }
    div.tabbar-item.active{
        color: #ac5e35;
        background-image: url(../assets/images/tab-icon-active.png);
    }
    img.mail-box-close{
        top: 0;
    }
    p.unread-number {
        position: absolute;
        width: 3rem;
        height: 1.8rem;
        right: -0.2rem;
        top: -0.2rem;
        background: url(/img/unread-all.c41a1c3b.png) no-repeat;
        background-size: 100% 100%;
        line-height: 1.8rem;
        text-align: center;
        color: #FFFFFF;
        font-size: 1.2rem;
    }
</style>
