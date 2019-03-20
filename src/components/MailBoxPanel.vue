<template>
    <div class="chess-mail-box">
        <div class="chess-dialog-body chess-mail-box-body" :class="{'hide':!isShow}">
            <img src="../assets/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <img src="../assets/newest.png" class="tab-item-icon newest" :class="{active:currentTab == 0}" @click="switchTab(0)">
                <img src="../assets/history.png" class="tab-item-icon history" :class="{active:currentTab == 1}" @click="switchTab(1)">
                <div class="content-wrapper">
                    <p class="unread-number">5</p>
                    <ul class="msg-list-wrapper">
                        <li v-for="n in 40" :key="n" class="msg-item">
                            <img src="../assets/unread.png" class="unread-icon">
                            <p class="msg-content">你已拜师成功</p>
                            <a href="javascript:;" class="detail">详情</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
    </div>
</template>
<script>
import ChessMask from './Mask'
export default {
    name:'chess-mail-box',
    data() {
        return {
            currentTab:0
        }
    },
    methods:{
        closeMyself() {
            this.$emit('hide');
        },
        switchTab(index) {
            this.currentTab = index;
        }
    },
    props:['is-show'],
    components:{
        [ChessMask.name]:ChessMask
    }
}
</script>
<style scoped>
    div.chess-mail-box-body{
        background: url(../assets/dialog-mailbox-bg.png) no-repeat; 
    }
    div.content-wrapper-container{
        background: url(../assets/yellow-1.png) no-repeat;
        width: 82%;
        height: 72%;
        background-size: 100% 100%;
        margin-top: 14%;
        margin-left: 8%;
    }
    div.content-wrapper{
        background: url(../assets/yellow-2.png) no-repeat;
        background-size: 100% 100%;
        width: 98%;
        height: 98%;
        margin: 0 auto;
        position: relative;
        z-index: 1;
    }
    img.tab-item-icon {
        height: 5rem;
        position: absolute;
        left: 3rem;
        top: 12rem;
        z-index: 1;
        cursor: pointer;
    }
    img.tab-item-icon.active{
        z-index: 2;
    }
    img.tab-item-icon.history{
        top: 18rem;
    }
    ul.msg-list-wrapper {
        margin: 5rem;
        height: 85%;
        overflow: scroll;
        position: relative;
        top: 2rem;
        padding-left: 0.5rem;
        padding-top: 0.5rem;
    }
    ul.msg-list-wrapper::-webkit-scrollbar{
        height: 0;
        width: 0;
    }
    li.msg-item{
        position: relative;
        color:#a97052;
        margin-bottom: 0.8rem;
        background: url(../assets/msg-bg.png) no-repeat;
        background-size: 100% 100%;
        padding:0.8rem 1rem;
    }
    img.unread-icon {
        position: absolute;
        width: 1.5rem;
        left: -0.5rem;
        top: -0.5rem;
    }
    p.unread-number {
        position: absolute;
        width: 3rem;
        height: 1.8rem;
        right: 1.5rem;
        top: 1.5rem;
        background: url(../assets/unread-all.png) no-repeat;
        background-size: 100% 100%;
        line-height: 1.8rem;
        text-align: center;
        color: #FFFFFF;
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
