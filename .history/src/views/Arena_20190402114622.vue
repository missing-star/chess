<template>
    <div class="chess-arena-wrapper">
        <h2>竞技场</h2>
        <div class="category-wrapper">
            <div class="category-item">
                <button class="start-game pointer" @click="goOnlineRace">在线对战</button>
            </div>
            <div class="category-item">
                <button class="start-game pointer">象棋闯关</button>
            </div>
        </div>
        <chess-back-button></chess-back-button>
    </div>
</template>
<script>
import BackButton from '../components/BackButton'
export default {
    methods:{
        goOnlineRace() {
            this.$router.push({paht:'/online-race'});
        }
    },
    components:{
        [BackButton.name]:BackButton
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
