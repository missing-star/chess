<template>
    <div v-if="isShow" class="chess-mask">
        
    </div>
</template>
<script>
export default {
    name:'chess-mask',
    props:['isShow'],
    data() {
        return {

        }
    }
}
</script>
<style scoped>
    div.chess-mask{
        position: fixed;
        background: rgba(0,0,0,0.4);
        width: 100%;
        height: 100%;
        z-index: 1;
        left: 0;
        top: 0;
    }
</style>
