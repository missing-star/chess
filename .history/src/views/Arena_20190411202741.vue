<template>
    <div class="chess-arena-wrapper">
        <h2>竞技场</h2>
        <div class="category-wrapper">
            <div class="category-item">
                <button class="start-game pointer" @click="openOnlineRacePanel">在线对战</button>
            </div>
            <div class="category-item">
                <button class="start-game pointer" @click="openCheckPointPanel">象棋闯关</button>
            </div>
        </div>
        <chess-online-race-panel :wait-time="waitTime" @start-game="goOnlineRace" @hide="hideOnlineRacePanel" :is-show="showOnlineRacePanel"></chess-online-race-panel>
        <chess-check-point-panel @hide="hideCheckPointPanel" :is-show="showCheckPointPanel"></chess-check-point-panel>
        <chess-back-button></chess-back-button>
    </div>
</template>
<script>
import BackButton from '../components/BackButton'
import OnlineRacePanel from '../components/OnlineRacePanel'
import CheckPointPanel from '../components/CheckPointPanel'
import CheckPointPanelVue from '../components/CheckPointPanel.vue'
import {initChess} from '../assets/js/online/CChess'
export default {
    data() {
        return {
            showOnlineRacePanel:false,
            showCheckPointPanel:false,
            waitTime:0,
            interval:''
        }
    },
    methods:{
        openOnlineRacePanel() {
            this.showOnlineRacePanel = true;
        },
        hideOnlineRacePanel() {
            this.showOnlineRacePanel = false;
        },
        openCheckPointPanel() {
            this.showCheckPointPanel = true;
        },
        hideCheckPointPanel() {
            this.showCheckPointPanel = false;
        },
        goOnlineRace() {
            this.interval = setInterval(() => {
                this.waitTime += 1;
            }, 1000);
            // this.$router.push({path:'/online-race'});
        },
        goEndGame() {
            this.$router.push({path:'/endgame-challenge'});
        }
    },
    components:{
        [BackButton.name]:BackButton,
        [OnlineRacePanel.name]:OnlineRacePanel,
        [CheckPointPanel.name]:CheckPointPanel
    }
}
</script>
<style scoped>
.chess-arena-wrapper {
    width: 100%;
    height: 100%;
    background: url(../assets/images/home-bg.png) no-repeat;
    background-size: 100% 100%;
    padding-top: 10%;
}
h2 {
    text-align: center;
    font-size: 2rem;
}
.category-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem;
}
.category-item {
    width: 20rem;
    height: 25rem;
    background: #f6f6f6;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-right: 1rem;
}
button.start-game {
    border: none;
    width: 55%;
    padding: 1rem;
    border-radius: 0.5rem;
    color: #fff;
    margin-bottom: 3rem;
    outline: 0;
}
</style>
