<template>
    <div class="chess-achieve-panel">
        <div class="chess-dialog-body chess-achieve-panel-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <div class="content left">
                    <h3 class="title">积分取向</h3>
                    <div class="chart-wrapper">
                        <p class="chart-title daily-task">每日任务</p>
                        <p class="chart-title race">竞技赛</p>
                        <p class="chart-title homework">作业</p>
                        <div id="ability-chart">

                        </div>
                    </div>
                </div>
                <div class="content right">
                    <h3 class="highest-scroe">近一周最高积分</h3>
                    <div class="score-wrapper">
                        <p :key="n" v-for="n in 3" class="number-wrapper">
                            <img :src="n | filterScroe" class="number-icon">
                        </p>
                        <span class="unit">分</span>
                    </div>

                    <h3 class="recent-weekly-score">
                        近一周积分
                    </h3>
                    <ul class="score-wrapper">
                        <li v-for="n in 7" :key="n" class="score-item">
                            <p class="score-date">日期</p>
                            <p class="score-value">分数</p>
                            <p class="score-detail underline pointer">详情</p>
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
    name:'chess-achieve-panel',
    data() {
        return {
           
        }
    },
    methods:{
        closeMyself() {
            this.$emit('hide');
        }
    },
    filters:{
        filterScroe(src) {
            return require(`../assets/images/${src}.png`);
        }
    },
    props:['is-show'],
    components:{
        [ChessMask.name]:ChessMask
    },
    mounted() {
        const echarts = require('echarts/lib/echarts');
        require("echarts/lib/chart/radar");
        require('echarts/lib/component/tooltip');
        require('echarts/lib/component/title');
        console.log(document.getElementById('my-chart'));
        const myChart = echarts.init(document.getElementById('ability-chart'));
        const option = {
            grid:[
                {x: '0%', y: '0%', width: '100%', height: '100%'}
            ],
            silent:true,
            radar: {
                axisLine:{
                    lineStyle:{
                        color:'#333'
                    }  
                },
                radius: '100%',
                splitNumber:7,
                splitArea:{
                show:false  
                },
                splitLine:{
                    lineStyle:{
                        color:'#986042'
                    }  
                },
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: [
                    { name: '', max: 15000},
                    { name: '', max: 15000},
                    { name: '', max: 15000}
                    ]
            },
            series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                    {
                        value : [13000, 7600, 3000],
                        name : '预算分配（Allocated Budget）'
                    }
                ],
                lineStyle:{
                    color:'transparent'  
                },
                areaStyle: {
                    normal: {
                        opacity: 0.3,
                        color:'#f0e5c4'
                    }
                },
                symbol:'none'
            }]
        };
        myChart.setOption(option);
    }
}
</script>
<style scoped>
    div.chess-achieve-panel-body{
        background: url(../assets/images/我的成就底.png) no-repeat; 
        background-size: 100% 100%;
    }
    div.content-wrapper-container{
        /* background: url(../assets/images/yellow-1.png) no-repeat; */
        width: 82%;
        height: 72%;
        background-size: 100% 100%;
        margin-top: 14%;
        margin-left: 6%;
    }
    div.content-wrapper{
        /* background: url(../assets/images/yellow-2.png) no-repeat; */
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

    .content {
        display: inline-block;
        /* background: skyblue; */
        width: 48%;
        height: 98%;
        vertical-align: top;
    }
    .content.right{
        margin-left: 4%;
    }
    h3.title {
        color: #fff;
        font-size: 1.3rem;
    }
    div.chart-wrapper{
        width: 100%;
        height: 100%;
    }
    div#ability-chart{
        width: 100%;
        height: 100%;
    }
    p.chart-title {
        color: #fff;
        font-size: 1.2rem;
        position: absolute;
    }
    p.chart-title.daily-task {
        left: 22%;
    }
    p.chart-title.race {
        bottom: 20%;
    }
    p.chart-title.homework {
        bottom: 20%;
        left: 38%;
    }
    p.number-wrapper {
        width: 28%;
        height: 8rem;
        display: inline-block;
        background: #eddfb2;
        margin-right: 0.5rem;
        border-radius: 0.2rem;
        box-shadow: 1px 1px inset #af8e6e;
    }
    img.number-icon {
        width: 100%;
        height: 100%;
    }
    h3.highest-scroe,h3.recent-weekly-score {
        color: #ff6b1e;
        font-size: 1.2rem;
    }
    h3.recent-weekly-score{
        margin-top: 1rem;
    }
    .score-wrapper {
        margin-top: 1rem;
    }
    span.unit {
        color: #b87f61;
        font-size: 2rem;
    }
    li.score-item {
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: #ecdcae;
        margin: 0.25rem 0;
        padding: 0.5rem;
        border-radius: 0.2rem;
        color: #c29270;
    }
</style>
