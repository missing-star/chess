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
</style>
