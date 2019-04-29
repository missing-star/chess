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
                        <div class="login-wrapper">
                            <chess-input label="姓名" type="text" width="50%" v-model="userName"></chess-input>
                        </div>
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
        components: {
            [ChessInput.name]: ChessInput,
            [ChessMask.name]: ChessMask
        },
        methods: {
            closeMyself() {
                this.$emit("hide");
            }
        },
        props: ['is-show']
    }
</script>
<style scoped>
    div.chess-set-panel-body {
        background: url(../assets/images/dialog-setting-bg.png) no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div.content-wrapper {
        width: 90%;
        height: 82%;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    div.bottom-layer-wrapper {
        background: url(../assets/images/login-bottom-layer.png) no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
    }

    div.top-layer-wrapper {
        background: url(../assets/images/login-top-layer.png) no-repeat;
        background-size: 100% 100%;
        width: 99%;
        height: 99%;
        position: absolute;
        z-index: 2;
    }

    .pet-wrapper {
        height: 100%;
        width: 50%;
    }

    .login-and-register-wrapper {
        width: 50%;
        height: 100%;
        position: relative;
    }
</style>