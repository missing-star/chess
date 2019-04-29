<template>
    <div class="chess-set-panel">
        <div class="chess-dialog-body chess-set-panel-body" :class="{'hide':!isShow}">
            <div class="content-wrapper">
                <div class="pet-wrapper">

                </div>
                <div class="login-and-register-wrapper">
                    <div class="bottom-layer-wrapper">
                        <!-- 登录tab -->
                        <img src="../assets/images/login-btn.png" class="login-tab login">
                        <!-- 注册tab -->
                        <img src="../assets/images/register-btn.png" class="login-tab register">
                        <div class="top-layer-wrapper">
                            <div class="login-wrapper">
                                <template v-if="currentIndex == 0">
                                    <chess-input label="姓名" type="text" width="50%" v-model="userName"></chess-input>
                                    <chess-input label="姓名" type="text" width="50%" v-model="userName"></chess-input>
                                    <chess-input label="姓名" type="text" width="50%" v-model="userName"></chess-input>
                                    <div class="operation-group">
                                        <div class="password-operation">
                                            <div @click="toggleRemeber" class="remember-me pointer">
                                                <span class="checkbox-icon" :class="{active:rememberMe}"></span>
                                                <p class="remember-me-tips">记住密码</p>
                                            </div>
                                            <div class="find-my-password pointer">
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
                currentIndex: 0,
                rememberMe: false
            };
        },
        components: {
            [ChessInput.name]: ChessInput,
            [ChessMask.name]: ChessMask
        },
        methods: {
            closeMyself() {
                this.$emit("hide");
            },
            toggleRemeber() {
                this.rememberMe = !this.rememberMe;
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
        position: relative;
    }

    div.bottom-layer-wrapper {
        background: url(../assets/images/login-bottom-layer.png) no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
    }

    div.top-layer-wrapper {
        background: url(../assets/images/login-top-layer.png) no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
    }

    .pet-wrapper {
        height: 100%;
        width: 57%;
        position: absolute;
        left: 0;
        z-index: 3;
        background: url(../assets/images/login-left-pet.png) no-repeat;
        background-size: 100% 100%;
    }

    .login-and-register-wrapper {
        width: 50%;
        height: 100%;
        position: absolute;
        right: 0;
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
        width: 70%;
        font-size: 0.8rem;
    }

    button.login {
        width: 40%;
        height: 30%;
        background: url(../assets/images/login-confirm-disabled.png) no-repeat;
        background-size: 100% 100%;
        border: none;
        outline: 0;
    }

    span.checkbox-icon {
        background: url(../assets/images/remember-me.png) no-repeat;
        background-size: 100% 100%;
        width: 1rem;
        height: 1rem;
    }

    span.checkbox-icon.active {
        background: url(../assets/images/remember-me-active.png) no-repeat;
        background-size: 100% 100%;
    }

    .remember-me {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img.login-tab {
        position: absolute;
        right: -8%;
        width: 20%;
    }

    img.login-tab.register {
        top: 45%;
    }

    img.login-tab.login {
        top: 30%;
    }
</style>