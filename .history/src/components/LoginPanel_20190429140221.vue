<template>
    <div class="chess-set-panel">
        <div class="chess-dialog-body chess-set-panel-body" :class="{'hide':!isShow}">
            <div class="content-wrapper">
                <div class="pet-wrapper">

                </div>
                <div class="login-and-register-wrapper">
                    <div class="bottom-layer-wrapper">
                        <!-- 登录tab -->
                        <img @click="switchTab(0)" src="../assets/images/login-btn.png"
                            :class="{active:currentIndex == 0}" class="login-tab login pointer">
                        <!-- 注册tab -->
                        <img @click="switchTab(1)" src="../assets/images/register-btn.png"
                            :class="{active:currentIndex == 1}" class="login-tab register pointer">
                        <div class="top-layer-wrapper">
                            <div class="login-wrapper">
                                <template v-if="currentIndex == 0">
                                    <chess-input @trigger="triggerSelect" label="性别" type="text" width="6rem" readonly
                                        v-model="sex"></chess-input>
                                    <chess-select :option-list="sexList" @select="selectSex" :is-show="showSelect"
                                        styles="position:absolute;right:12%;top:28%;z-index:1;"></chess-select>
                                    <chess-input label="姓名" type="text" width="50%" v-model="username"></chess-input>
                                    <chess-input label="密码" type="password" width="50%" v-model="password">
                                    </chess-input>
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
                rememberMe: false,
                username: '',
                password: ''
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
            },
            switchTab(index) {
                this.currentIndex = index;
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
        position: relative;
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
        color: #c0886b;
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
        right: -10%;
        width: 22%;
        z-index: 0;
    }

    img.login-tab.active {
        z-index: 1;
    }

    img.login-tab.register {
        top: 45%;
    }

    img.login-tab.login {
        top: 20%;
    }
</style>