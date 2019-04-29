<template>
    <div class="chess-set-panel">
        <div class="chess-dialog-body chess-set-panel-body" :class="{'hide':!isShow}">
            <div class="content-wrapper">
                <div class="pet-wrapper">

                </div>
                <div class="login-and-register-wrapper">
                    <div class="bottom-layer-wrapper">

                    </div>
                    <div class="top-layer-wrapper">
                        <chess-input></chess-input>
                    </div>
                </div>
            </div>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
    </div>
</template>
<script>
    import ChessMask from "./Mask";
    import ChessInput from '../components/Input'
    export default {
        name: "chess-login-panel",
        data() {
            return {

            };
        },
        components:{
            [ChessInput.name]:ChessInput
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
    div.bottom-layer-wrapper{
        background: url(../assets/images/)
    }
</style>