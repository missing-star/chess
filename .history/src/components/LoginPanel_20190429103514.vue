<template>
    <div class="chess-set-panel">
        <div class="chess-dialog-body chess-set-panel-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper">

            </div>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
    </div>
</template>
<script>
    import ChessMask from "./Mask";
    export default {
        name: "chess-login-panel",
        data() {
            return {

            };
        },
        methods: {
            closeMyself() {
                this.$emit("hide");
            }
        },
        props:['is-show']
    }
</script>
<style scoped>
    div.chess-set-panel-body {
        background: url(../assets/images/dialog-setting-bg.png) no-repeat;
        background-size: 100% 100%;
    }

    div.content-wrapper {
        width: 82%;
        height: 80%;
        background-size: 100% 100%;
        margin-top: 12%;
        margin-left: 8%;
    }
</style>