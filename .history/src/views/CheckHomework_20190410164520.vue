<template>
    <div class="chess-self-study-wrapper">
        <div class="left-part-wrapper">
            <div class="content-wrapper">
                <p class="title">
                    作业标题
                </p>
                <div class="dashed-line"></div>
                <p class="content">
                    作业简介
                </p>
            </div>
        </div>
        <div class="middle-part-wrapper">
            <div id="space" class="chess-panel">

            </div>
        </div>
        <div class="right-part-wrapper">
            <div class="finish-condition">
                <img src="../assets/images/personal-info-logo-wrapper.png" class="logo-wrapper">
                <div class="description">
                    <p class="finish-status">学生未完成</p>
                    <p class="tips-times">提示2次</p>
                </div>
            </div>
            <div class="race-operation-wrapper">
                <p class="title operation">
                    老师打分
                </p>
                <div class="operation-group-btn">
                    <div class="input-score-wrapper">
                        <label class="scroe">分数：</label>
                        <input v-model="score" type="number" class="score-number">
                    </div>
                    <img src="../assets/images/confirm-btn.png" @click="confirmScore" class="confirm-icon pointer">
                </div>
            </div>
            <div class="race-operation-wrapper">
                <p class="title operation">
                    老师评价
                </p>
                <div class="operation-group-btn">
                    <textarea v-model="evaluation" placeholder="老师，请您简单的给学员评价下作业吧！"></textarea>
                </div>
            </div>
        </div>
        <chess-back-button></chess-back-button>
    </div>
</template>
<script>
import BackButton from '../components/BackButton'
import '../assets/js/jquery.min'
import {initChess} from '../assets/js/CChess'
import '../assets/css/Chess.css'
export default {
    components:{
        [BackButton.name]:BackButton
    },
    data() {
        return {
            score:'',
            evaluation:''
        }
    },
    methods:{
        confirmScore() {
            if(!parseFloat(this.score) && this.score.trim() == '') {
                alert('请输入正确的分数!');
                return false;
            }
            this.$axios({
                url:`${process.env.VUE_APP_URL}index.php?r=api-teach/edit-task`,
                method:'post',
                params:{
                    task_log_id:this.$route.params.id,
                    score:this.score,
                    teach_bb:this.evaluation
                }
            }).then((res) => {
                console.log(res);
            }).catch((err) => {

            });
        }
    },
    mounted() {
        initChess();
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
        height: 100%;
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
        background-size: 92% 92%;
        background-position: center center;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
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
        scrollbar-width:none;
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
    .finish-condition {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img.logo-wrapper {
        width: 30%;
    }
    p.finish-status,p.tips-times {
        background: #955c3e;
        box-shadow: 0 1px 1px 0 #cc987c, inset 0 1px 1px 0 #6d3a1f;
        height: 2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 1.5rem;
        border-radius: 0.2rem;
        color: #ffc061;
        margin: 0.5rem;
    }
    p.tips-times{
        color:#ffddaa;
    }
    .description {
        display: flex;
        flex-direction: column;
        padding-left: 2rem;
    }
    img.confirm-icon {
        width: 30%;
    }
    .input-score-wrapper{
        background: url(../assets/images/score-bg.png) no-repeat;
        background-size: 100% 100%;
        height: 5rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 2rem;
    }
    input.score-number {
        background: transparent;
        border: none;
        height: 50%;
        flex: 0.8;
        outline: 0;
    }
    label.scroe {
        color: #dd2f00;
        font-size: 1.2rem;
    }
    textarea{
        width: 100%;
        height: 100%;
        /* Firefox */
        scrollbar-width:none;
        /* IE */
        -ms-overflow-style: none;
        font-size: 1rem;
        line-height: 1.5rem;
        color: #ffddaa;
        text-shadow:0 1px 1px #5b2e16;
        background: transparent;
        border: none;
        resize: none;
        word-break: break-all;
        padding: 0.5rem;
        outline: 0;
        padding: 0rem 1.5rem;
    }
    textarea::-webkit-scrollbar{
        width: 0;
    }
    textarea::-webkit-input-placeholder{
        color: #ffddaa;
        text-shadow:0 1px 1px #5b2e16;
    }
</style>
