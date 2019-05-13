<template>
    <div class="chess-set-panel">
        <div class="chess-dialog-body chess-set-panel-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper">
                <div class="pet-wrapper">

                </div>
                <div class="login-and-register-wrapper">
                    <div class="bottom-layer-wrapper">
                        <div class="top-layer-wrapper">
                            <div class="login-wrapper">
                                <chess-input label="密码" type="password" width="50%" v-model="password">
                                </chess-input>
                                <chess-input label="确认密码" type="password" width="50%" v-model="repassword">
                                </chess-input>
                                <div class="operation-group">
                                    <button @click="confirmPass" class="find-pass pointer"></button>
                                </div>
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
        name: "chess-change-password-panel",
        data() {
            return {
                password:'',
                repassword:''
            };
        },
        components: {
            [ChessInput.name]: ChessInput,
            [ChessMask.name]: ChessMask,
        },
        methods: {
            closeMyself() {
                this.$emit("hide");
            },
            confirmPass() {
                if(this.password.toString().trim() == '') {
                    alert('请输入密码');
                    return;
                }
                else if(this.password != this.repassword) {
                    alert('两次密码不一致');
                    return;
                }
                this.$axios({
                    url:`${process.env.VUE_APP_URL}`,
                    method:'post'
                }).then(res => {

                }).catch(err => {
                    alert('服务器异常');
                });
            }
            
        },
        created() {
           
        },
        props: ['is-show'],
        watch: {           

        }
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

    button.login.active {
        background: url(../assets/images/login-confirm-active.png) no-repeat;
        background-size: 100% 100%;
    }

    button.find-pass {
        width: 40%;
        height: 30%;
        background: url(../assets/images/find-pass-btn.png) no-repeat;
        background-size: 100% 100%;
        border: none;
        outline: 0;
    }

    button.register {
        width: 40%;
        height: 30%;
        background: url(../assets/images/register-confirm-disabled.png) no-repeat;
        background-size: 100% 100%;
        border: none;
        outline: 0;
    }

    button.register.active {
        background: url(../assets/images/register-confirm-active.png) no-repeat;
        background-size: 100% 100%;
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

    img.tips-icon {
        position: absolute;
        z-index: 5;
        width: 15%;
        top: -5%;
        left: 42.5%;
        transition: all 0.2s linear;
        height: 0;
    }

    img.tips-icon.active {
        height: 15%;
    }
</style>