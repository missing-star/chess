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
            <div class="black-chess-wrapper">
                <span class="chess-item">
                    <img @click="chooseQi('black','ju',$event)" src="../assets/images/che2.png" alt="">
                    <i class="icon-number">{{numberList.black.ju.counts}}</i>
                </span>
                <span class="chess-item">
                    <img @click="chooseQi('black','ma',$event)" src="../assets/images/ma2.png" alt="">
                    <i class="icon-number">{{numberList.black.ma.counts}}</i>
                </span>
                <span class="chess-item">
                    <img @click="chooseQi('black','xiang',$event)" src="../assets/images/xiang2.png" alt="">
                    <i class="icon-number">{{numberList.black.xiang.counts}}</i>
                </span>
                <span class="chess-item">
                    <img @click="chooseQi('black','shi',$event)" src="../assets/images/shi2.png" alt="">
                    <i class="icon-number">{{numberList.black.shi.counts}}</i>
                </span>
                <span class="chess-item">
                    <img @click="chooseQi('black','pao',$event)" src="../assets/images/pao2.png" alt="">
                    <i class="icon-number">{{numberList.black.pao.counts}}</i>
                </span>
                <span class="chess-item">
                    <img @click="chooseQi('black','zu',$event)" src="../assets/images/zu.png" alt="">
                    <i class="icon-number">{{numberList.black.zu.counts}}</i>
                </span>
                <span class="chess-item">
                    <img @click="chooseQi('black','jiang',$event)" src="../assets/images/jiang.png" alt="">
                    <i class="icon-number">{{numberList.black.jiang.counts}}</i>
                </span>
            </div>
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
            <div class="red-chess-wrapper">
                <span class="chess-item">
                    <img @click="chooseQi('red','ju',$event)" src="../assets/images/che1.png" alt="">
                    <i class="icon-number">{{numberList.red.ju.counts}}</i>
                </span>
                <span class="chess-item">
                    <img @click="chooseQi('red','ma',$event)" src="../assets/images/ma1.png" alt="">
                    <i class="icon-number">{{numberList.red.ma.counts}}</i>
                </span>
                <span class="chess-item">
                    <img @click="chooseQi('red','xiang',$event)" src="../assets/images/xiang1.png" alt="">
                    <i class="icon-number">{{numberList.red.xiang.counts}}</i>
                </span>
                <span class="chess-item">
                    <img @click="chooseQi('red','shi',$event)" src="../assets/images/shi1.png" alt="">
                    <i class="icon-number">{{numberList.red.shi.counts}}</i>
                </span>
                <span class="chess-item">
                    <img @click="chooseQi('red','pao',$event)" src="../assets/images/pao1.png" alt="">
                    <i class="icon-number">{{numberList.red.pao.counts}}</i>
                </span>
                <span class="chess-item">
                    <img @click="chooseQi('red','zu',$event)" src="../assets/images/bing.png" alt="">
                    <i class="icon-number">{{numberList.red.zu.counts}}</i>
                </span>
                <span class="chess-item">
                    <img @click="chooseQi('red','shuai',$event)" src="../assets/images/shuai.png" alt="">
                    <i class="icon-number">{{numberList.red.shuai.counts}}</i>
                </span>
            </div>
        </div>
        <div class="right-part-wrapper">
            <div class="race-operation-wrapper">
                <p class="title operation">
                    老师留言
                </p>
                <div class="operation-group-btn content">
                    <textarea v-model="comments" placeholder="老师可在此留言"></textarea>
                </div>
            </div>
            <div class="race-operation-wrapper">
                <p class="title operation">
                    操作台
                </p>
                <div class="operation-group-btn">
                    <div class="operation-item pointer">
                        <img @click="fillUp" src="../assets/images/摆满棋子.png" alt="摆满棋子" class="operation-item-icon not-active">
                        <img src="../assets/images/摆满棋子-选中.png" alt="摆满棋子-active" class="operation-item-icon active">
                    </div>
                    <div class="operation-item pointer">
                        <img @click="reset" src="../assets/images/重置.png" alt="重置" class="operation-item-icon not-active">
                        <img src="../assets/images/重置-选中.png" alt="重置-active" class="operation-item-icon active">
                    </div>
                    <div class="operation-item pointer">
                        <img @click="forward" src="../assets/images/前进.png" alt="前进" class="operation-item-icon not-active">
                        <img src="../assets/images/前进-选中.png" alt="前进-active" class="operation-item-icon active">
                    </div>
                    <div class="operation-item pointer">
                        <img @click="backOff" src="../assets/images/后退.png" alt="后退" class="operation-item-icon not-active">
                        <img src="../assets/images/后退-选中.png" alt="后退-active" class="operation-item-icon active">
                    </div>
                    <!-- <div class="operation-item pointer">
                        <img @click="flip" src="../assets/images/翻转.png" alt="翻转" class="operation-item-icon not-active">
                        <img src="../assets/images/翻转-选中.png" alt="翻转-active" class="operation-item-icon active">
                    </div> -->
                    <div class="operation-item pointer">
                        <img @click="saveChessMap" src="../assets/images/确定.png" alt="确定" class="operation-item-icon not-active">
                        <img src="../assets/images/确定-选中.png" alt="确定-active" class="operation-item-icon active">
                    </div>
                    <div class="operation-item pointer">
                        <img @click="save" src="../assets/images/保存.png" alt="保存" class="operation-item-icon not-active">
                        <img src="../assets/images/保存-选中.png" alt="保存-active" class="operation-item-icon active">
                    </div>
                    <div class="operation-item">
                        <img @click="save" src="../assets/images/撤回.png" alt="撤回" class="operation-item-icon not-active">
                    </div>
                    <div class="operation-item">
                    </div>
                </div>
            </div>
        </div>
         <!-- 保存棋谱 -->
        <chess-create-tips-panel @save-chess-table="saveChessTable" @hide="hideCreateTipsPanel" :is-show="showCreateTipsPanel"></chess-create-tips-panel>
        <chess-back-button></chess-back-button>
    </div>
</template>
<script>
import BackButton from '../components/BackButton'
import '../assets/js/jquery.min'
import CreateTipsPanel from '../components/CreateTipsPanel'
import {initChess,onChose,resetPanel,backRecord,nextRecord,recordList,showrecordList,currentIndex,map, numberList, selectedQi, isPutOver,initAll} from '../assets/js/create/CChess'
import '../assets/css/Chess.css'
export default {
    data() {
        return {
            showRecordList:showrecordList,
            recordList:recordList,
            currentIndex:currentIndex,
            map:map,
            list:map,
            showCreateTipsPanel:false,
            comments:'',
            selectedQi: selectedQi,
            numberList:numberList,
            isPutOver:isPutOver,
            saveMap:[],
            editId:''
        }
    },
    methods:{
        //选择棋子
        chooseQi(type, key, event) {
            if (type == 'black') {
                $('.red-chess-wrapper span').removeClass('active');
            } else {
                $('.black-chess-wrapper span').removeClass('active');
            }
            if (this.numberList[type][key].counts > 0) {
                this.selectedQi.type = type;
                this.selectedQi.key = key;
                $(event.target).parent().addClass('active');
                $(event.target).parent().siblings().removeClass('active');
                this.selectedQi.value = this.numberList[type][key].value;
            }
        },
        addActive(target) {
            target.classList.add('active');
        },
        // 摆满
        fillUp:initAll,
        // 前进
        forward(e) {
            nextRecord();
        },
        //后退
        backOff(e) {
            backRecord();
        },
        //翻转
        flip(e) {
            this.addActive(e.target.parentNode);
        },
        // 重置
        reset:resetPanel,
        // 保存提示框
        save(e) {
            this.openCreateTipsPanel();
        },
        openCreateTipsPanel() {
            this.showCreateTipsPanel = true;
        },
        hideCreateTipsPanel() {
            this.showCreateTipsPanel = false;
        },
        calculateMap() {
            return this.map.every((array) => {
                return array.every((item) => {
                    return item == 0;
                });
            })
        },
        saveChessMap() {
            if(this.calculateMap()) {
                alert('请先进行棋面操作!');
                return false;
            }
            //保存棋面
            if(sessionStorage.getItem('saveMapRoom')) {
                alert('已确定过!');
                return;
            }
            sessionStorage.setItem('saveMapRoom',JSON.stringify(this.map));
            this.isPutOver.value = true;
            alert('保存成功');
        },
        saveChessTable(type,title) {
            var submitData = {
                type:type,
                title:title,
                data_code:sessionStorage.getItem('saveMapRoom'),
                data_text:JSON.stringify(this.recordList),
                play_log:JSON.stringify(this.showRecordList),
                desc:this.comments
            };
            if(this.editId != '') {
                submitData.id = this.editId;
            }
            //保存棋谱（走法，步骤）
            this.$axios({
                url:`${process.env.VUE_APP_URL}index.php?r=api-teach-chess-manual/create-chess-manual`,
                method:'post',
                data:this.qs.stringify(submitData)
            }).then((res) => {
                alert(res.data.msg);
                if(res.data.status == 1) {
                    this.hideCreateTipsPanel();
                }
            }).catch((err) => {
                alert('服务器异常');
            });
        }
    },
    components:{
        [BackButton.name]:BackButton,
        [CreateTipsPanel.name]:CreateTipsPanel,
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
        this.recordList.splice(0);
        this.showRecordList.splice(0);
        sessionStorage.clear();
        window.onChose = onChose;
        initChess('default');
        if(this.$route.query.id) {
            this.editId = this.$route.query.id;
        }
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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .right-part-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    p.title.operation {
        margin-top: 7%;
    }
    .operation-group-btn {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        padding: 3vw 0;
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
        width: 82%;
        height: 100%;
        padding: 3vw 0;
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
