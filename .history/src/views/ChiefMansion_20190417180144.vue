<template>
    <div class="chess-private-school-wrapper">
        <h2>大帅府</h2>
        <div class="category-wrapper">
            <div class="category-item">
                <button class="start-game pointer" @click="manageChessTable">棋谱</button>
            </div>
        </div>
        <chess-table-panel :is-show="showManageChessTablePanel" @hide="hideChessTable"></chess-table-panel>
        <chess-back-button></chess-back-button>
    </div>
</template>
<script>
import BackButton from '../components/BackButton'
import ChessTablePanel from '../components/ChessTablePanel'
export default {
    data() {
        return {
            showManageChessTablePanel:false
        }
    },
    methods:{
        manageChessTable() {
            this.showManageChessTablePanel = true;
        },
        hideChessTable() {
            this.showManageChessTablePanel = false;
        }
    },
    components:{
        [BackButton.name]:BackButton,
        [ChessTablePanel.name]:ChessTablePanel
    }
}
</script>
<style scoped>
.chess-private-school-wrapper {
    width: 100%;
    height: 100%;
    background: url(images/home-bg.png) no-repeat;
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
