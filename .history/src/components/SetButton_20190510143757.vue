<template>
    <div @click="gameSet" class="chess-set-button">
        <div class="set-button-icon">
            
        </div>
    </div>
</template>
<script>
export default {
    name:'chess-set-btn',
    data() {
        return {

        }
    },
    methods:{
        gameSet() {
            this.$emit('game-set');
        }
    }
}
</script>
<style scoped>
    div.chess-set-button{
        cursor: pointer;
        position: absolute;
        top: 2rem;
        left: 26rem;
        width: 3.8rem;
        height: 3.8rem;
        text-align: center;
    }
    div.set-button-icon {
        background: url(../assets/images/setting-bg.png) no-repeat;
        background-size: 100%;
        height: 3.8rem;
    }
    div.set-button-icon>img{
        display: block;
        width: 50%;
        transform: translateX(50%) translateY(50%);
    }
    p.setting-title {
        color: #FFFFFF;
        font-size: 1rem;
    }
</style>
