<template>
    <div class="chess-online-race-wrapper">
        <div class="left-part-wrapper">
            <div class="content-wrapper">
                <p class="title">
                    对战路线步骤
                </p>
                <div class="dashed-line"></div>
                <ul ref="recordWrapper" class="record-list-wrapper">
                    <li v-for="(item,index) in showRecordList" :key="index" class="record-item">
                        <p class="record-item number" :class="{active:index == showRecordList.length - 1}">{{index+1}}</p>
                        <p class="record-item detail" :class="{active:index == showRecordList.length - 1}">
                            <span class="record-item detail red" :class="{active:index == showRecordList.length - 1}">
                                {{item.red}}
                            </span>
                            <span class="split-line"></span>
                            <span class="record-item detail black" :class="{active:item.black == ''}">
                                {{item.black == '' ? '等待中' : item.black}}
                            </span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="middle-part-wrapper">
            <div class="chess-panel" id="space">

            </div>
        </div>
        <div class="right-part-wrapper">
            <div class="race-operation-wrapper">
                <p class="title operation">
                    老师留言
                </p>
                <div class="operation-group-btn content">
                    <textarea v-model="comments" readonly></textarea>
                </div>
            </div>
            <div class="race-operation-wrapper">
                <p class="title operation">
                    操作台
                </p>
                <div class="operation-group-btn">
                    <div class="operation-item pointer">
                        <img @click="forward" src="../assets/images/前进.png" alt="前进" class="operation-item-icon not-active">
                        <img src="../assets/images/前进-选中.png" alt="前进-active" class="operation-item-icon active">
                    </div>
                    <div class="operation-item pointer">
                        <img @click="backOff" src="../assets/images/后退.png" alt="后退" class="operation-item-icon not-active">
                        <img src="../assets/images/后退-选中.png" alt="后退-active" class="operation-item-icon active">
                    </div>
                </div>
            </div>
        </div>
        <chess-back-button></chess-back-button>
    </div>
</template>
<script>
import BackButton from '../components/BackButton'
import '../assets/js/jquery.min'
import {initChess,resetPanel,backRecord,nextRecord,recordList,showrecordList,currentIndex,map, numberList, selectedQi, isPutOver,initAll} from '../assets/js/create/CChess'
import '../assets/css/Chess.css'
export default {
    data() {
        return {
            showRecordList:showrecordList,
            recordList:recordList,
            currentIndex:currentIndex,
            map:map,
            list:map,
            comments:'',
            selectedQi: selectedQi,
            numberList:numberList,
            isPutOver:isPutOver,
            saveMap:[]
        }
    },
    methods:{
        // 前进
        forward(e) {
            nextRecord();
        },
        //后退
        backOff(e) {
            backRecord();
        }
    },
    components:{
        [BackButton.name]:BackButton
    },
    watch:{
        showRecordList:function() {
            this.$nextTick(() => {
                this.$refs.recordWrapper.scrollTop =  this.$refs.recordWrapper.scrollHeight;
            });
        },
        list:function(){
            console.log(this.list);
        }
    },
    mounted() {
        var obj = {
            create_at: "1555494727",
            data_code: "[[-3,-4,-5,-6,-7,-6,-5,-4,-3],[0,0,0,0,0,0,0,0,0],[0,-2,0,0,0,0,0,-2,0],[-1,0,-1,0,-1,0,-1,0,-1],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1],[0,2,0,0,0,0,0,2,0],[0,0,0,0,0,0,0,0,0],[3,4,5,6,7,6,5,4,3]]",
            data_text: '[{"y":7,"x":4,"j":7,"i":7,"sourceElem":"PR","targetElem":{"cla":"","value":0},"flag":true,"eat":null},{"y":4,"x":4,"j":3,"i":4,"sourceElem":"BB","targetElem":{"cla":"","value":0},"flag":true,"eat":null},{"y":5,"x":4,"j":6,"i":4,"sourceElem":"BR","targetElem":{"cla":"","value":0},"flag":true,"eat":null},{"y":4,"x":6,"j":3,"i":6,"sourceElem":"BB","targetElem":{"cla":"","value":0},"flag":true,"eat":null},{"y":5,"x":6,"j":6,"i":6,"sourceElem":"BR","targetElem":{"cla":"","value":0},"flag":true,"eat":null},{"y":9,"x":1,"j":2,"i":1,"sourceElem":"PB","targetElem":{"cla":"MR","value":4},"flag":true,"eat":null},{"y":9,"x":1,"j":9,"i":0,"sourceElem":"JR","targetElem":{"cla":"PB","value":-2},"flag":true,"eat":null}]',
            desc: "",
            id: "7",
            play_log: '[{"red":"炮二平五","black":"卒五进一"},{"red":"兵五进一","black":"卒七进一"},{"red":"兵三进一","black":"炮二进七"},{"red":"车九平八","black":""}]',
            teach_id: "1",
            title: "作业1",
            type: "2"
        }
        sessionStorage.clear();
        initChess('default');
    }
}
</script>
<style scoped>
    div.chess-online-race-wrapper {
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
        height: 85%;
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
    ul.record-list-wrapper {
        height: 93%;
        overflow-x: hidden;
        overflow-y: scroll;
        scrollbar-width:none;
        -ms-overflow-style: none;
        padding: 0 1rem;
    }
    ul.record-list-wrapper::-webkit-scrollbar{
        width: 0;
    }
    li.record-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0.8rem 0;
    }
    p.record-item.number {
        background: #834c30;
        box-shadow: 0 1px 1px 0 #d5a58d, inset 0 1px 1px 0 #5d311b;
        border-radius: 1rem;
        width: 20%;
        height: 2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #ffddaa;
        font-size: 1.2rem;
    }
    p.record-item.detail {
        background: #834c30;
        box-shadow: 0 1px 1px 0 #d09f86, inset 0 1px 1px 0 #5d311b;
        border-radius: 1rem;
        width: 75%;
        height: 2rem;
        display: inline-flex;
        align-items: center;
        justify-content: space-around;
        color: #ffddaa;
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
    div.user-logo-wrapper{
        background: url(../assets/images/黑方头像底.png) no-repeat;
        background-size: 100% 100%;
        width: 7vh;
        height: 7vh;
        display: flex;
        align-items: center;
        justify-content: center;
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
    .operation-group-btn {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 3rem 0;
        padding-bottom: 4rem;
        height: 100%;
        justify-content: space-around;
    }
    img.operation-item {
        width: 40%;
    }
    textarea{
        outline: 0;
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
    }
    textarea::-webkit-scrollbar{
        width: 0;
    }
    textarea::-webkit-input-placeholder{
        color: #ffddaa;
        text-shadow:0 1px 1px #5b2e16;
    }
    .operation-group-btn.content {
        padding: 4rem 2rem;
    }
    div.operation-item img.operation-item-icon.not-active {
        display: block;
    }
    div.operation-item img.operation-item-icon.active {
        display: none;
    }
    div.operation-item.active img.operation-item-icon.not-active {
        display: none;
    }
    div.operation-item.active img.operation-item-icon.active {
        display: block;
    }
    img.operation-item-icon {
        width: 100%;
    }
    .operation-item {
        width: 35%;
    }
    p.record-item.number.active,p.record-item.detail.active {
        background: #f1e0b8;
        color: #834c30;
        box-shadow: 0 1px 1px 0 #50250f, inset 0 1px 1px 0 #ffffff;
    }
    span.record-item.detail.black.active {
        color: #ff520f;
    }
    span.record-item.detail{
        width: 40%;
        text-align: center;
    }
    .black-chess-wrapper,.red-chess-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 9%;
        height: 65%;
    }
    .black-chess-wrapper{
       align-items:  flex-end;
    }
    .red-chess-wrapper{
        align-items: flex-start;
    }
    span.chess-item {
        width: 70%;
        position: relative;
        cursor: pointer;
    }
    span.chess-item img {
        width: 100%;
    }
    i.icon-number {
        position: absolute;
        top: -0.2rem;
        right: -0.2rem;
        background: #d11737;
        border-radius: 50%;
        width: 1.2rem;
        height: 1.2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        font-size: 0.6rem;
        color: #fff;
    }
    span.chess-item.active {
        background: url(../assets/images/select-chess.png) no-repeat;
        background-size: 100% 100%;
    }
</style>
