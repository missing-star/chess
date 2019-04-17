<template>
    <div class="back-btn-wrapper">
        <img @click="goBack" src="images/back.png" class="back-icon pointer">
    </div>
</template>
<script>
export default {
    name:'chess-back-button'
}
</script>
<style scoped>
div.back-btn-wrapper{
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    width: 5rem;
}
img.back-icon{
    width: 100%;
}
</style>
