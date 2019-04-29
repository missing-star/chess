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
                                    <chess-input select @trigger="triggerRole" readonly label="选择身份" type="text"
                                        width="100%" v-model="role"></chess-input>
                                    <chess-select :option-list="roleList" @select="selectRole" :is-show="showSelectRole"
                                        styles="position:absolute;right:15%;top:28%;z-index:1;"></chess-select>
                                    <chess-input label="姓名" type="text" width="50%" v-model="username"></chess-input>
                                    <chess-input label="密码" type="password" width="50%" v-model="password">
                                    </chess-input>
                                    <div class="operation-group">
                                        <div class="password-operation">
                                            <div @click="toggleRemeber" class="remember-me pointer">
                                                <span class="checkbox-icon" :class="{active:rememberMe}"></span>
                                                <p class="remember-me-tips">记住密码</p>
                                            </div>
                                            <div @click="switchTab(2)" class="find-my-password pointer">
                                                找回密码
                                            </div>
                                        </div>
                                        <button @click="login" :disabled="!isCanLogin" :class="{active:isCanLogin}"
                                            class="login pointer"></button>
                                    </div>
                                </template>
                                <!-- 注册 -->
                                <template v-else-if="currentIndex == 1">
                                    <chess-input label="姓名" width="50%" type="text"
                                        styles="width:36.5%;margin:2% 0;margin-left:1%;" v-model="username">
                                    </chess-input>
                                    <chess-input select @trigger="triggerSex"
                                        styles="width:36.5%;margin:2% 0;margin-left:1%;" readonly label="性别" type="text"
                                        width="100%" v-model="sex"></chess-input>
                                    <chess-select :option-list="sexList" @select="selectSex" :is-show="showSelectSex"
                                        styles="position:absolute;right:15%;top:28%;z-index:1"></chess-select>
                                    <chess-input styles="width:36.5%;margin:2% 0;margin-left:1%;" label="卡号" type="text"
                                        width="50%" v-model="cardNumber"></chess-input>
                                    <chess-input styles="width:36.5%;margin:2% 0;margin-left:1%;" label="激活码"
                                        type="text" width="50%" v-model="activeCode"></chess-input>
                                    <chess-input styles="width:36.5%;margin:2% 0;margin-left:1%;" label="家长手机"
                                        type="text" width="50%" v-model="phone"></chess-input>
                                    <chess-input readonly select @trigger="triggerLevel" styles="width:36.5%;margin:2% 0;margin-left:1%;" label="等级"
                                        type="text" width="50%" v-model="level"></chess-input>
                                    <chess-select :option-list="levelList" @select="selectLevel" :is-show="showSelectLevel"
                                        styles="position:absolute;right:8%;top:42%;z-index:1;height:25%;"></chess-select>
                                    <chess-input readonly select @trigger="triggerSchool" styles="width:36.5%;margin:2% 0;margin-left:1%;" label="学校"
                                        type="text" width="50%" v-model="school"></chess-input>
                                    <chess-select :option-list="schoolList" @select="selectSchool" :is-show="showSelectSchool"
                                        styles="position:absolute;right:50%;top:52%;z-index:1;height:25%;"></chess-select>
                                    <chess-input styles="width:36.5%;margin:2% 0;margin-left:1%;" label="密码"
                                        type="password" width="50%" v-model="password"></chess-input>
                                    <div class="operation-group">
                                        <div class="password-operation">
                                            <div @click="toggleRemeber" class="remember-me pointer">
                                                <span class="checkbox-icon" :class="{active:rememberMe}"></span>
                                                <p class="remember-me-tips">记住密码</p>
                                            </div>
                                        </div>
                                        <button @click="register" :disabled="!isCanRegister"
                                            :class="{active:isCanRegister}" class="register pointer"></button>
                                    </div>
                                </template>
                                <!-- 找回密码 -->
                                <template v-else-if="currentIndex == 2">
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
                currentIndex: 2,
                rememberMe: false,
                // 选择角色
                showSelectRole: false,
                // 选择性别
                showSelectSex: false,
                // 选择等级
                showSelectLevel:false,
                // 选择学校
                showSelectSchool:false,
                //是否填写了登录信息
                isCanLogin: false,
                //是否填写了注册信息
                isCanRegister: false,
                roleList: [{
                        id: 1,
                        text: "老师"
                    },
                    {
                        id: 0,
                        text: "学生"
                    }
                ],
                sexList: [{
                        id: 0,
                        text: "男"
                    },
                    {
                        id: 1,
                        text: "女"
                    }
                ],
                levelList:[],
                schoolList:[],
                username: '',
                password: '',
                repassword: '',
                sex: '男',
                cardNumber: '',
                activeCode: '',
                phone: '',
                level: {
                    id:'',
                    text:''
                },
                school: {
                    id:'',
                    text:''
                },
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
                    this.sex = "男";
                } else {
                    this.sex = "女";
                }
            },
            triggerSex() {
                this.showSelectSex = !this.showSelectSex;
            },
            selectLevel(level) {
                this.showSelectLevel = false;
                this.level = level;
            },
            triggerLevel() {
                this.showSelectLevel = !this.showSelectLevel;
            },
            selectSchool(school) {
                this.showSelectSchool = false;
                this.school = school;
            },
            triggerSchool() {
                this.showSelectSchool = !this.showSelectSchool;
            },
            judgeIsCanRegister() {
                if (this.username.trim() != '' && this.password.trim() != '' && this.sex != '' && this.cardNumber
                    .trim() != '' && this.activeCode.trim() != '' && this.phone.trim() != '' && this.level.trim() !=
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
                if (this.role != 1) {
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
                            if (this.role == 1) {
                                //老师
                                this.$router.push("/home-teacher");
                            } else {
                                localStorage.setItem("userInfo", JSON.stringify(res.data.data));
                                location.reload();
                            }
                        } else {
                            alert(res.data.msg);
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
                            sex: this.sex,
                            crad: this.cardNumber,
                            crad_password: this.activeCode,
                            guardian_phone: this.phone,
                            password: this.password
                        })
                    })
                    .then(res => {
                        if (res.data.status == 1) {
                            this.showLoginAlert = true;
                        } else {
                            alert(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            findPass() {
                if (this.cardNumber.trim() == '') {
                    alert('请输入卡号!');
                    return;
                } else if (this.activeCode.trim() == '') {
                    alert('请输入激活码!');
                    return;
                } else if (this.username.trim() == '') {
                    alert('请输入姓名!');
                    return;
                } else if (this.password.trim() == '') {
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
                    if(res.data.status == 1) {
                        this.schoolList = res.data.data.map(item => {
                            return {
                                id:item.id,
                                text:item.nickname
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
                    if(res.data.status == 1) {
                        this.levelList = res.data.data.map(item => {
                            return {
                                id:item.id,
                                text:item.grade_name
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
        },
        props: ['is-show'],
        watch: {
            username() {
                if (this.username.trim() != '' && this.password.trim() != '') {
                    this.isCanLogin = true;
                } else {
                    this.isCanLogin = false;
                }
                this.judgeIsCanRegister();
            },
            password() {
                if (this.username.trim() != '' && this.password.trim() != '') {
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
</style>