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
                        <p class="record-item number" >{{index+1}}</p>
                        <p class="record-item detail" >
                            <span class="record-item detail red" >
                                {{item.red}}
                            </span>
                            <span class="split-line"></span>
                            <span class="record-item detail black" :class="{active:item.black == ''}">
                                {{item.black}}
                            </span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="middle-part-wrapper">
            <ul class="number-wrapper black">
                <li class="number-item" v-for="n in 9" :key="n">{{n}}</li>
            </ul>
            <div class="chess-panel" id="space">

            </div>
            <ul class="number-wrapper red">
                <li class="number-item">九</li>
                <li class="number-item">八</li>
                <li class="number-item">七</li>
                <li class="number-item">六</li>
                <li class="number-item">五</li>
                <li class="number-item">四</li>
                <li class="number-item">三</li>
                <li class="number-item">二</li>
                <li class="number-item">一</li>
            </ul>
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
import {initChess,resetPanel,backRecord,nextRecord,recordList,showrecordList,currentIndex,map, numberList, selectedQi, isPutOver,initAll} from '../assets/js/chess-detail/CChess'
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
        this.$axios({
            url:`${process.env.VUE_APP_URL}index.php?r=api-teach-chess-manual/get-manual-detail`,
            method:'post',
            data:this.qs.stringify({
                manual_id:this.$route.params.id
            })
        }).then(res => {
            if(res.data.status == 1) {
                JSON.parse(res.data.data.data_code).forEach(array => {        
                    console.log(array);   
                    this.map.push(array);
                });
                JSON.parse(res.data.data.data_text).forEach(item => {
                    this.recordList.push(item);
                });
                JSON.parse(res.data.data.play_log).forEach(item => {
                    this.showRecordList.push(item);
                });
                sessionStorage.clear();
                initChess('default');
            }
            else {
                alert(res.data.msg);
            }
        }).catch(err => {
            alert('服务器异常');
        });
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
        overflow:hidden;
    }
    div.left-part-wrapper,div.right-part-wrapper{
        background: url(../assets/images/信息显示底.png) no-repeat;
        background-size: 100% 100%;
        height: 100%;
        width: 15%;
        flex: 1;
        padding:2rem;
    }
    div.middle-part-wrapper{
        background: url(../assets/images/棋盘底.png) no-repeat;
        background-size: 100% 100%;
        width: 100vh;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    ul.number-wrapper.black {
        position: absolute;
        top: 3%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 75%;
        color: #f0e5c4;
        font-size: 1.2rem;
    }
    ul.number-wrapper.red {
        position: absolute;
        bottom: 3%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 75%;
        color: #f0e5c4;
        font-size: 1.2rem;
    }
    div.chess-panel{
        width: 81%;
        height: 90%;
        background: url(../assets/images/棋盘.png) no-repeat;
        background-size: 90% 92%;
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
        bottom: 3%;
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
        height: 40%;
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
