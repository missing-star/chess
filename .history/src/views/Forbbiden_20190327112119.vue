<template>
    <div>
        暂未适配IE浏览器，如使用360等双核浏览器，请切换至极速模式
    </div>
</template>
<script>
export default {
    created() {
        if(!this.testIE()) {
            this.$router.push({name:'home'});
        }
    }
}
</script>