<template>
    <div @click="gameSet" class="chess-set-button">
        <div class="set-button-icon">
            <img src="/images/setting.png" class="setting-icon">
        </div>
        <p class="setting-title">设置</p>
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
        right: 1rem;
        bottom: 1rem;
        width: 3rem;
        height: 4rem;
        text-align: center;
    }
    div.set-button-icon {
        background: url(/images/setting-bg.png) no-repeat;
        background-size: 100%;
        height: 3rem;
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
