<template>
    <div class="chess-set-panel">
        <div class="chess-dialog-body chess-set-panel-body" :class="{'hide':!isShow}">
            <div class="content-wrapper">
                <img src="../assets/images/register-err.png" class="tips-icon" :class="{active:showRegErr}">
                <img src="../assets/images/register-success.png" class="tips-icon" :class="{active:showRegSucc}">
                <img src="../assets/images/info-err.png" class="tips-icon" :class="{active:showErrInfo}">
                <div class="pet-wrapper">

                </div>
                <div class="login-and-register-wrapper">
                    <div class="bottom-layer-wrapper">
                        <div class="top-layer-wrapper">
                            <div class="login-wrapper">
                                <chess-input label="卡号" type="text" width="50%" v-model="cardNumber"></chess-input>
                                <chess-input label="激活码" type="text" width="50%" v-model="activeCode"></chess-input>
                                <chess-input label="姓名" type="text" width="50%" v-model="phone"></chess-input>
                                <chess-input label="密码" type="password" width="50%" v-model="password">
                                </chess-input>
                                <chess-input label="确认密码" type="password" width="50%" v-model="repassword">
                                </chess-input>
                                <div class="operation-group">
                                    <button @click="findPass" class="find-pass pointer"></button>
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
    import Select from "../components/Select";
    import ChessInput from '../components/Input'
    export default {
        name: "chess-change-password-panel",
        data() {
            return {
                
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
                } else {
                    this.role = "学生";
                }
            },
            triggerRole() {
                this.showSelectRole = !this.showSelectRole;
            },
            selectSex(sex) {
                this.showSelectSex = false;
                if (sex == 0) {
                    this.sex.text = "男";
                    this.sex.id = 1;
                } else {
                    this.sex.text = "女";
                    this.sex.id = 2;
                }
            },
            triggerSex() {
                this.showSelectSex = !this.showSelectSex;
            },
            selectLevel(id, level) {
                this.showSelectLevel = false;
                this.level.text = level;
                this.level.id = id;
            },
            triggerLevel() {
                this.showSelectLevel = !this.showSelectLevel;
            },
            selectSchool(id, school) {
                this.showSelectSchool = false;
                this.school.text = school;
                this.school.id = id;
            },
            triggerSchool() {
                this.showSelectSchool = !this.showSelectSchool;
            },
            judgeIsCanRegister() {
                if (this.username.toString().trim() != '' && this.password.toString().trim() != '' && this.sex != '' &&
                    this.cardNumber
                    .toString().trim() != '' && this.activeCode.toString().trim() != '' && this.phone.toString()
                .trim() != '' && this.level.toString().trim() !=
                    '' &&
                    this.shcool != '') {
                    this.isCanRegister = true;
                } else {
                    this.isCanRegister = false;
                }
            },
            login() {
                let url = process.env.VUE_APP_URL;
                let params = {};
                if (this.role != '老师') {
                    url += '/index.php?r=api-student/student-login';
                    params.nickname = this.username;
                    params.password = this.password;
                } else {
                    url += 'index.php?r=api-teach/teach-login';
                    params.login_name = this.username;
                    params.login_password = this.password;
                }
                this.$axios({
                        method: "post",
                        url: url,
                        data: this.qs.stringify(params)
                    })
                    .then(res => {
                        if (res.data.status == 1) {
                            if (this.rememberMe) {
                                localStorage.setItem('loginInfo', JSON.stringify({
                                    username: this.username,
                                    password: this.password
                                }));
                            } else {
                                localStorage.removeItem('loginInfo');
                            }
                            if (this.role == '老师') {
                                //老师
                                this.$router.push("/home-teacher");
                            } else {
                                localStorage.setItem("userInfo", JSON.stringify(res.data.data));
                                location.reload();
                            }
                        } else {
                            this.showErrInfo = true;
                            setTimeout(() => {
                                this.showErrInfo = false;
                            }, 1000);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            register() {
                this.$axios({
                        method: "post",
                        url: `${process.env.VUE_APP_URL}/index.php?r=api-student/student-register`,
                        data: this.qs.stringify({
                            nickname: this.username,
                            sex: this.sex.id,
                            crad: this.cardNumber,
                            crad_password: this.activeCode,
                            guardian_phone: this.phone,
                            password: this.password,
                            grade_id: this.level.id,
                            school: this.school.id
                        })
                    })
                    .then(res => {
                        if (res.data.status == 1) {
                            this.showRegSucc = true;
                            setTimeout(() => {
                                this.showRegSucc = false;
                                //注册成功打开登录面板
                                this.currentIndex = 1;
                            }, 1000);
                        } else {
                            this.showRegErr = true;
                            setTimeout(() => {
                                this.showRegErr = false;
                            }, 1000);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            findPass() {
                if (this.cardNumber.toString().trim() == '') {
                    alert('请输入卡号!');
                    return;
                } else if (this.activeCode.toString().trim() == '') {
                    alert('请输入激活码!');
                    return;
                } else if (this.username.toString().trim() == '') {
                    alert('请输入姓名!');
                    return;
                } else if (this.password.toString().trim() == '') {
                    alert('请输入新密码!');
                    return;
                } else if (this.password != this.repassword) {
                    alert('两次密码不一致!');
                    return;
                }
                this.$axios({
                        method: "post",
                        url: `${process.env.VUE_APP_URL}/index.php?r=api-student/update-pass`,
                        data: this.qs.stringify({
                            crad: this.cardNumber,
                            code: this.activeCode,
                            nickname: this.username,
                            password: this.password
                        })
                    })
                    .then(res => {
                        if (res.data.status == 1) {
                            alert(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            getSchoolList() {
                this.$axios({
                    url: `${process.env.VUE_APP_URL}index.php?r=api-student/school-list`,
                    method: 'post'
                }).then(res => {
                    if (res.data.status == 1) {
                        this.schoolList = res.data.data.map(item => {
                            return {
                                id: item.id,
                                text: item.nickname
                            }
                        });
                    }
                }).catch(err => {
                    alert('服务器异常');
                });
            },
            getLevelList() {
                // index.php?r=api-student/student-grade
                this.$axios({
                    url: `${process.env.VUE_APP_URL}index.php?r=api-student/student-grade`,
                    method: 'post'
                }).then(res => {
                    if (res.data.status == 1) {
                        this.levelList = res.data.data.map(item => {
                            return {
                                id: item.id,
                                text: item.grade_name
                            }
                        });
                    }
                }).catch(err => {
                    alert('服务器异常');
                });
            }
        },
        created() {
            this.getSchoolList();
            this.getLevelList();
            if (localStorage.getItem('loginInfo')) {
                this.rememberMe = true;
                const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
                this.username = loginInfo.username;
                this.password = loginInfo.password;
                this.isCanLogin = true;
            }
        },
        props: ['is-show'],
        watch: {
            username() {
                if (this.username.toString().trim() != '' && this.password.toString().trim() != '') {
                    this.isCanLogin = true;
                } else {
                    this.isCanLogin = false;
                }
                this.judgeIsCanRegister();
            },
            password() {
                if (this.username.toString().trim() != '' && this.password.toString().trim() != '') {
                    this.isCanLogin = true;
                } else {
                    this.isCanLogin = false;
                }
                this.judgeIsCanRegister();
            },
            sex() {
                this.judgeIsCanRegister();
            },
            cardNumber() {
                this.judgeIsCanRegister();
            },
            activeCode() {
                this.judgeIsCanRegister();
            },
            phone() {
                this.judgeIsCanRegister();
            },
            level() {
                this.judgeIsCanRegister();
            },
            school() {
                this.judgeIsCanRegister();
            },
            role() {
                this.judgeIsCanRegister();
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