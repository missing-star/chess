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
                            <template v-if="currentIndex == 0">
                                <chess-input label="姓名" type="text" width="50%" v-model="userName"></chess-input>
                                <chess-input label="姓名" type="text" width="50%" v-model="userName"></chess-input>
                                <chess-input label="姓名" type="text" width="50%" v-model="userName"></chess-input>
                                <div class="operation-group">
                                    <div class="password-operation">
                                        <div class="remember-me">
                                            <span class="checkbox-icon"></span>
                                            <p class="remember-me-tips">记住密码</p>
                                        </div>
                                        <div class="find-my-password">
                                            找回密码
                                        </div>
                                    </div>
                                    <button class="login pointer"></button>
                                </div>
                            </template>
                            <template v-else-if="currentIndex == 1">

                            </template>
                            <template v-else-if="currentIndex == 2">

                            </template>
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
                //0==>登录 1==>注册 2==>找回密码
                currentIndex: 0
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

    .login-wrapper {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .operation-group {
        width: 100%;
        text-align: center;
        height: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    .password-operation {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 80%;
    }
    button.login{
        width: 40%;
        height: 30%;
        background: url(../assets/images/login-confirm-disabled.png) no-repeat;
        background-size: 100% 100%;
        border: none;
        outline: 0;
    }
    span.checkbox-icon{
        background:url(../assets/images/remember-me.png) no-repeat;
        background-size: 100% 100%;
    }
</style>