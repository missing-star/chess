<template>
    <div class="chess-self-study-wrapper">
        <div class="left-part-wrapper">
            <div class="content-wrapper">
                <p class="title">
                    大标题
                </p>
                <p class="sub-title">
                    小标题
                </p>
                <div class="dashed-line"></div>
                <p class="content">
                    关卡介绍
                </p>
            </div>
        </div>
        <div class="middle-part-wrapper">
            <div class="chess-panel">

            </div>
        </div>
        <div class="right-part-wrapper">
            <div class="black-wrapper">
                <div class="user-wrapper">
                    <div class="user-logo-wrapper">
                        <img src="../assets/images/user-logo.png" class="user-logo">
                    </div>
                    <span class="user-category">
                        黑方
                    </span>
                </div>
            </div>
            <div class="race-operation-wrapper">
                <p class="title operation">
                    操作台
                </p>
                <div class="operation-group-btn">
                    <img src="../assets/images/重做.png" class="operation-item-btn pointer">
                    <img src="../assets/images/答案.png" class="operation-item-btn pointer">
                    <img src="../assets/images/上一题.png" class="operation-item-btn pointer">
                    <img src="../assets/images/下一题.png" class="operation-item-btn pointer">
                </div>
            </div>
            <div class="red-wrapper">
                <div class="user-wrapper">
                    <div class="user-logo-wrapper red">
                        <img src="../assets/images/user-logo.png" class="user-logo">
                    </div>
                    <span class="user-category">
                        红方
                    </span>
                </div>
            </div>
        </div>
        <chess-back-button></chess-back-button>
    </div>
</template>
<script>
import BackButton from '../components/BackButton'
export default {
    components:{
        [BackButton.name]:BackButton
    }
}
</script>
<style scoped>
    div.chess-self-study-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        min-height: 900px;
    }
    div.left-part-wrapper,div.right-part-wrapper{
        background: url(../assets/images/信息显示底.png) no-repeat;
        background-size: 100% 100%;
        height: 100vh;
        width: 15%;
        flex: 1;
        padding:2rem;
        min-width: 400px;
    }
    div.middle-part-wrapper{
        background: url(../assets/images/棋盘底.png) no-repeat;
        background-size: 100% 100%;
        width: 100vh;
        height: 100vh;
        min-height: 900px;
        min-width: 900px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div.chess-panel{
        width: 81%;
        height: 90%;
        background: url(../assets/images/棋盘.png) no-repeat;
        background-size: 100% 100%;
    }
     div.dashed-line{
        background: url(../assets/images/dot.png);
        height: 0.5rem;
        width: 83%;
        background-size: contain;
        margin: 1rem auto;
    }
    div.content-wrapper{
        background:#955c3e;
        box-shadow:0 1px 1px 0 #d9ab93, inset 0 1px 1px 0 #552e19;
        height: 40%;
        width: 100%;
        border-radius: 1rem;
        padding: 1rem 0;
    }
    p.title {
        font-family: PingFangSC-Semibold;
        font-size: 1.5rem;
        color: #ffddaa;
        text-shadow: 0 1px 1px #5b2e16;
        text-align: center;
    }
    p.sub-title {
        color: #ffddaa;
        text-align: center;
        padding-top: 0.5rem;
    }
    ul.record-list-wrapper {
        height: 93%;
        overflow-x: hidden;
        overflow-y: scroll;
        scrollbar-width:0;
        -ms-overflow-style: none;
        padding: 0 1rem;
    }
    span.split-line {
        background: #a76d4e;
        box-shadow: 0 1px 1px 0 #4c2512;
        height: 1rem;
        width: 1px;
    }
    div.back-btn-wrapper{
        bottom: 2rem;
        left: 2rem;
    }
    .black-wrapper,.red-wrapper {
        width: 100%;
        background: url(../assets/images/棋手信息底.png) no-repeat;
        background-size: 100% 100%;
        height: 15rem;
    }
    div.user-logo-wrapper{
        background: url(../assets/images/黑方头像底.png) no-repeat;
        background-size: 100% 100%;
        width: 7vh;
        height: 7vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div.user-logo-wrapper.red{
        background: url(../assets/images/红方头像.png) no-repeat;
        background-size: 100% 100%;
        width: 7vh;
        height: 7vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .user-wrapper {
        display: flex;
        align-items: center;
        padding: 3rem 2rem;
        padding-bottom: 1rem;
        flex-direction: column;
        justify-content: center;
    }
    img.user-logo {
        width: 80%;
        height: 80%;
        background: skyblue;
        border-radius: 50%;
    }
    span.user-category {
        color: #f0ddb4;
        font-size: 1.5rem;
        margin-top: 1.5rem;
    }
    div.race-operation-wrapper{
        background: url(../assets/images/操作台底.png) no-repeat;
        background-size: 100% 100%;
        height: 22rem;
    }
    .right-part-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    p.title.operation {
        margin-top: 2rem;
    }
    p.content {
        color: #ffddaa;
        padding: 0 2rem;
    }
    img.operation-item-btn {
        width: 34%;
        margin: 0.5rem;
    }
    .operation-group-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding-top: 4rem;
        height: 16rem;
    }
</style>
