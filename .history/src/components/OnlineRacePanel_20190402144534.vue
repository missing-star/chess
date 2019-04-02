<template>
    <div class="chess-online-race-panel">
        <div class="chess-dialog-body chess-online-race-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <div class="user-fight-wrapper">
                    <div class="user-left">
                        <p class="username"></p>
                        <img src="../assets/images/user-logo.png" alt="" class="user-logo">
                    </div>
                    <img src="../assets/images/vs.png" alt="vs" class="vs-icon">
                    <div class="user-right">
                        <p class="username"></p>
                        <img src="../assets/images/user-logo.png" alt="" class="user-logo">
                    </div>
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
    p.unread-number {
        position: absolute;
        width: 3rem;
        height: 1.8rem;
        right: 1.5rem;
        top: 1.5rem;
        background: url(../assets/images/unread-all.png) no-repeat;
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
    img.mail-box-close{
        right:-4rem;
        top: 2rem;
    }
</style>
