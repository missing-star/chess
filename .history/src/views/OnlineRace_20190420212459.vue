<template>
    <div class="chess-online-race-wrapper">
        <div class="left-part-wrapper">
            <div class="content-wrapper">
                <p class="title">
                    对战路线步骤
                </p>
                <div class="dashed-line"></div>
                <ul ref="recordWrapper" class="record-list-wrapper">
                    <template v-if="isRed">
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
                    </template>
                    <template v-else>
                        <li v-for="(item,index) in showRecordList" :key="index" class="record-item">
                            <p class="record-item number" :class="{active:index == showRecordList.length - 1}">{{index+1}}</p>
                            <p class="record-item detail" :class="{active:index == showRecordList.length - 1}">
                                <span class="record-item detail red" :class="{active:index == showRecordList.length - 1}">
                                    {{item.black}}
                                </span>
                                <span class="split-line"></span>
                                <span class="record-item detail black" :class="{active:item.red == ''}">
                                    {{item.red == '' ? '等待中' : item.red}}
                                </span>
                            </p>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
        <div class="middle-part-wrapper">
            <div class="chess-panel" id="space">

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
                <div class="current-percent-wrapper">
                    <div class="progressbar-wrapper">
                        <div class="progressbar"></div>
                    </div>
                    <p class="percent">86%</p>
                </div>
                <div class="current-time-info-wrapper">
                    局时：{{showGameTime.value}} 步时：{{blackTime}}
                </div>
            </div>
            <div class="race-operation-wrapper">
                <p class="title operation">
                    操作台
                </p>
                <div class="operation-group-btn">
                    <img @click="backOperation" src="../assets/images/悔棋.png" alt="悔棋" class="operation-item pointer">
                    <img src="../assets/images/和棋.png" alt="和棋" class="operation-item pointer">
                    <img @click="quitGame" src="../assets/images/认输.png" alt="认输" class="operation-item pointer">
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
                <div class="current-percent-wrapper">
                    <div class="progressbar-wrapper">
                        <div class="progressbar"></div>
                    </div>
                    <p class="percent">86%</p>
                </div>
                <div class="current-time-info-wrapper">
                    局时：{{showGameTime.value}} 步时：{{redTime}}
                </div>
            </div>
        </div>
        <chess-back-button></chess-back-button>
    </div>
</template>
<script>
import BackButton from '../components/BackButton'
import '../assets/js/jquery.min'
import {initChess,onChose,isOnline,searchEngine,backOperation,
quitGame,move,waitTimes,fightTimes,showGameTime,countRaceTime,api,recordList,showRecordList,Back} from '../assets/js/online/CChess'
import '../assets/css/Chess.css'
import { constants } from 'crypto';
export default {
    data(){
        return {
            isOnline:isOnline,
            searchEngine:searchEngine,
            nowTimes:new Date().getTime(),
            showGameTime:showGameTime,
            waitTimes:waitTimes,
            fightTimes:fightTimes,
            api:api,
            recordList:recordList,
            showRecordList:showRecordList,
            isRed:sessionStorage.getItem('isRed') == 'true',
            Back:Back
        }
    },
    components:{
        [BackButton.name]:BackButton
    },
    computed:{
        redTime(){
            if(sessionStorage.getItem('isRed') == 'true') {
                if(this.waitTimes.value == 60) {
                    return '00:00';
                }
                else {
                    return '00:'+(this.waitTimes.value < 10 ? '0'+this.waitTimes.value : this.waitTimes.value);
                }
            }
            else {
                if(this.fightTimes.value == 60) {
                    return '00:00';
                }
                else {
                    return '00:'+(this.fightTimes.value < 10 ? '0'+this.fightTimes.value : this.fightTimes.value);
                }
            }
        },
        blackTime(){
            if(sessionStorage.getItem('isRed') == 'true') {
                if(this.fightTimes.value == 60) {
                    return '00:00';
                }
                else {
                    return '00:'+(this.fightTimes.value < 10 ? '0'+this.fightTimes.value : this.fightTimes.value);
                }
            }
            else {
                if(waitTimes.value == 60) {
                    return '00:00';
                }
                else {
                    return '00:'+(this.waitTimes.value < 10 ? '0'+this.waitTimes.value : this.waitTimes.value);
                }
            }
        }
    },
    mounted() {
        if(!window.gameSocket) {
            alert('对战不存在或已结束!');
            this.$router.push('arena');
            return;
        }
        window.onChoseOnline = onChose;
        window.moveOnline = move;
        if(this.isOnline.value != this.$route.params.isOnline) {
            this.isOnline.value = this.$route.params.isOnline;
        }
        this.api.url = process.env.VUE_APP_URL;
        this.searchEngine.engine = window.searchEngine;
        this.initChess();
        this.countRaceTime();
        this.Back.back = () => {
            this.$router.push('/arena')
        }
    },
    methods:{
        backOperation:backOperation,
        quitGame:quitGame,
        initChess:initChess,
        countRaceTime:countRaceTime,
        printList() {
            console.log(this.recordList,this.showRecordList);
        }
    },
    watch:{
        showRecordList:function() {
            this.$nextTick(() => {
                this.$refs.recordWrapper.scrollTop =  this.$refs.recordWrapper.scrollHeight;
            });
        },
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
        margin-left: 1.5rem;
    }
    .current-percent-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
    }
    .progressbar-wrapper {
        width: 60%;
        background: #955c3e;
        height: 0.6rem;
        border-radius: 1rem;
        margin: 0 1rem;
    }
    .progressbar {
        height: 100%;
        background: #ffb91d;
        border-radius: 1rem;
        width: 20%;
    }
    p.percent {
        color: #ffb91d;
    }
    .current-time-info-wrapper {
        background: #a97052;
        box-shadow: 0 1px 1px 0 #d8ad96, inset 0 1px 1px 0 #59301b;
        width: 80%;
        margin: 0 auto;
        height: 2rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
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
        flex-direction: column;
        align-items: center;
        padding: 5rem 0;
        height: 100%;
        justify-content: space-around;
    }
    img.operation-item {
        width: 40%;
    }
    span.record-item.detail {
        width: 48%;
        text-align: center;
    }
</style>
