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
                                <!-- 登录 -->
                                <template v-if="currentIndex == 0">
                                    <chess-input @trigger="triggerRole" readonly label="选择身份" type="text" width="100%"
                                        v-model="role"></chess-input>
                                    <chess-select :option-list="roleList" @select="selectRole" :is-show="showSelectRole"
                                        styles="position:absolute;right:15%;top:28%;z-index:1"></chess-select>
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
                                        <button @click="login" :disabled="!isCanLogin" :class="{active:isCanLogin}"
                                            class="login pointer"></button>
                                    </div>
                                </template>
                                <!-- 注册 -->
                                <template v-else-if="currentIndex == 1">
                                    <chess-input label="姓名" type="text" styles="width:45%;" v-model="username"></chess-input>
                                    <chess-input @trigger="triggerRole" styles="width:45%;" readonly label="性别" type="text" width="100%"
                                        v-model="role"></chess-input>
                                    <chess-select :option-list="roleList" @select="selectRole" :is-show="showSelectRole"
                                        styles="position:absolute;right:15%;top:28%;z-index:1"></chess-select>
                                    <chess-input styles="width:45%;" label="卡号" type="text" width="50%" v-model="password"></chess-input>
                                    <chess-input styles="width:45%;" label="激活码" type="text" width="50%" v-model="password"></chess-input>
                                    <chess-input styles="width:45%;" label="家长手机号" type="text" width="50%" v-model="password"></chess-input>
                                    <chess-input styles="width:45%;" label="等级" type="text" width="50%" v-model="password"></chess-input>
                                    <chess-input styles="width:45%;" label="学校" type="text" width="50%" v-model="password"></chess-input>
                                    <chess-input styles="width:45%;" label="密码" type="password" width="50%" v-model="password"></chess-input>
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
                                        <button @click="login" :disabled="!isCanLogin" :class="{active:isCanLogin}"
                                            class="login pointer"></button>
                                    </div>
                                </template>
                                <!-- 找回密码 -->
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
    import Select from "../components/Select";
    import ChessInput from '../components/Input'
    export default {
        name: "chess-login-panel",
        data() {
            return {
                //0==>登录 1==>注册 2==>找回密码
                currentIndex: 1,
                rememberMe: false,
                username: '',
                password: '',
                showSelectRole: false,
                //是否填写了登录信息
                isCanLogin: false,
                roleList: [{
                        id: 1,
                        text: "老师"
                    },
                    {
                        id: 0,
                        text: "学生"
                    }
                ],
                role: "学生",
            };
        },
        components: {
            [ChessInput.name]: ChessInput,
            [ChessMask.name]: ChessMask,
            [Select.name]: Select,
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
            },
            selectRole(role) {
                this.showSelectRole = false;
                if (role == 1) {
                    this.role = "老师";
                    // this.$router.push("/login-teacher");
                } else {
                    this.role = "学生";
                    // this.$router.push("/login");
                }
            },
            triggerRole() {
                this.showSelectRole = !this.showSelectRole;
            },
            login() {
                if (this.rememberMe) {
                    localStorage.setItem('reInfo', JSON.stringify({
                        username: this.username,
                        pass: this.password
                    }));
                } else {
                    localStorage.removeItem('reInfo');
                }
            }
        },
        props: ['is-show'],
        watch: {
            username() {
                if (this.username.trim() != '' && this.password.trim() != '') {
                    this.isCanLogin = true;
                } else {
                    this.isCanLogin = false;
                }
            },
            password() {
                if (this.username.trim() != '' && this.password.trim() != '') {
                    this.isCanLogin = true;
                } else {
                    this.isCanLogin = false;
                }
            }
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