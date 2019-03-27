<template>
    <div class="chess-star-wrapper">
        将星阁
        <div id="my-chart"></div>
        <chess-back-button></chess-back-button>
    </div>
</template>
<script>
import BackButton from '../components/BackButton'
export default {
    components:{
        [BackButton.name]:BackButton
    }
}
</script>
<style scoped>
div#my-chart {
    width: 40rem;
    height: 40rem;
}
</style>
