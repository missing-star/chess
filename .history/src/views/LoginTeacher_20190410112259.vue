<template>
    <div class="chess-login-wrapper">
        <chess-mask is-show="true"></chess-mask>
        <div class="elephant-wrapper">
            <img src="../assets/images/home-icon.png" class="qi-icon">
            <img src="../assets/images/elephant.png" class="elephant-icon">
        </div>
        <div class="login-register-warpper">
            <div class="register-top"></div>
            <div class="register-body">
                <div class="login" @click="swicthLoginPanel(0)" :style="{'z-index':currentPanel == 0 ? 3 : 2}">
                    
                </div>
                <div class="register-login-wrapper">
                    <div class="register-register-wrapper">
                        <div class="content" v-if="currentPanel == 0">
                            <chess-input v-model="role" @trigger="triggerRole" readonly styles="width:95%" label="选择身份" type="text" width="100%"></chess-input>
                            <chess-select :option-list="roleList" @select="selectRole" :is-show="showSelectRole" styles="position:absolute;right:2.2rem;top:5.2rem;z-index:3;"></chess-select>
                            <chess-input v-model="username" styles="width:95%" label=姓名 type="text" width="16rem"></chess-input>
                            <chess-input v-model="password" styles="width:95%" label="密码" type="password" width="16rem"></chess-input>
                            <div class="remember-and-forget-wrapper">
                                <p class="remember-me-wrapper pointer">
                                    <span class="checkbox"></span>
                                    <span class="remember-text">记住密码</span>
                                </p>
                                <p @click="forgetPass" class="forget-pass-wrapper pointer underline">
                                    忘记密码
                                </p>
                            </div>
                            <div class="btn-group">
                                <button class="enter-game">
                                    进入游戏
                                </button>
                            </div>
                        </div>
                        <div class="content find-pwd" v-if="currentPanel == 2">
                            <chess-input styles="width:95%;margin:0.2rem 0.4rem;" label="手机号" type="text" width="16rem"></chess-input>
                            <chess-input styles="width:95%;margin:0.2rem 0.4rem;" label="验证码" type="number" send width="16rem"></chess-input>
                            <chess-input styles="width:95%;margin:0.2rem 0.4rem;" label="重置密码" type="password" width="14rem"></chess-input>
                            <chess-input styles="width:95%;margin:0.2rem 0.4rem;" label="确定密码" type="password" width="14rem"></chess-input>
                            <div class="reset-wrapper">
                                <button class="confirm-btn pointer">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Mask from '../components/Mask'
import Input from '../components/Input'
import Select from '../components/Select'
export default {
    components:{
        [Mask.name]:Mask,
        [Input.name]:Input,
        [Select.name]:Select
    },
    data() {
        return {
            showSelect:false,
            currentPanel:0,
            showSelectRole:false,
            sexList:[{
                id:0,
                text:'男'
            },{
                id:1,
                text:'女'
            }],
            roleList:[
                {
                    id:0,
                    text:'老师'
                },
                {
                    id:1,
                    text:'学生'
                }
            ],
            role:'',
            username:'',
            password:''
        }
    },
    methods:{
        triggerSelect() {
            this.showSelect = !this.showSelect;
        },
        triggerRole() {
            this.showSelectRole = !this.showSelectRole;
        },
        selectSex(sex) {
            this.showSelect = false;
            console.log(sex);
        },
        swicthLoginPanel(index) {
            this.currentPanel = index;
        },
        selectRole(role) {
            this.showSelectRole = false;
            console.log(role);
        },
        forgetPass() {
            this.currentPanel = 2;
        },
        login() {
            //老师登录
            this.$axios({
                method:'post',
                url:`${process.env.VUE_APP_URL}/index.php?r=api-teach/teach-login}`,
                params:{
                    login_name:this.username,
                    login_password:this.password
                }
            }).then(() => {

            }).catch(() => {

            });
        }
    }
}
</script>
<style scoped>
    div.chess-login-wrapper{
        width: 100%;
        height: 100%;
        background: url(../assets/images/login-bg.png) no-repeat;
        background-size: 100% 100%;
    }
    div.elephant-wrapper{
        z-index: 2;
        position: absolute;
        left: 24%;
        bottom: 16%;
    }
    img.elephant-icon{
        width: 20rem;
    }
    img.qi-icon{
        width: 5rem;
    }
    div.login-register-warpper{
        position: absolute;
        left: calc(24% + 25rem);
        z-index: 2;
        width: 38%;
        height: 70%;
        min-width: 720px;
        min-height: 600px;
        bottom: 10%;
    }
    div.register-top{
        height: 22%;
        background: url(../assets/images/house-top.png) no-repeat;
        background-size: 100% 100%;
        z-index: 3;
        position: relative;
    }
    div.register-body{
        background: url(../assets/images/house-body.png) no-repeat;
        background-size: 60% 100%;
        background-position: center;
        height: 78%;
        position: relative;
        top: -5%;
        width: 100%;
    }
    div.register-login-wrapper{
        position: absolute;
        width: 60%;
        background: url(../assets/images/register-yellow-1.png) no-repeat;
        background-size: 95% 100%;
        height: 82%;
        top: 7%;
        left: 22%;
    }
    div.register-register-wrapper{
        position: absolute;
        width: 90%;
        background: url(../assets/images/register-yellow-2.png) no-repeat;
        background-size: 100% 100%;
        height: 95%;
        top: 3%;
        left: 3%;
        padding: 1.2rem;
        padding-top: 2rem;
        z-index: 2;
    }
    div.content.find-pwd{
        background: url(../assets/images/register-yellow-3.png) no-repeat;
        background-size: 100% 100%;
        height: 95%;
        width: 95%;
        top: 2%;
        left: 3%;
        padding: 1.2rem;
        padding-top: 2rem;
        position: absolute;
    }
    div.register-btn-group{
        text-align: center;
        margin-top: 2rem;
    }
    button.register-btn {
        width: 80%;
        border: none;
        color: #fff;
        height: 2rem;
        margin: 0 auto;
        color: #000;
    }
    div.remember-and-forget-wrapper{
        padding: 0.5rem;
    }
    span.checkbox {
        background: #59341e;
        width: 1.2rem;
        height: 1.2rem;
        display: inline-block;
        border-radius: 0.2rem;
    }
    span.remember-text{
        line-height: 1.2rem;
        vertical-align: top;
        margin-left: 0.5rem;
    }
    p.remember-me-wrapper{
        float: left;
    }
    p.forget-pass-wrapper{
        float: right;
    }
    .btn-group {
        text-align: center;
        margin-top: 3rem;
    }
    button.enter-game{
        width: 80%;
        border: none;
        height: 2rem;
        margin: 0 auto;
        color: #000;
    }
    .reset-wrapper {
        text-align: center;
        margin: 0.5rem;
    }
    button.confirm-btn {
        width: 80%;
        height: 2rem;
        border: none;
    }
    .login,.register {
        cursor: pointer;
        position: absolute;
        width: 4.5rem;
        height: 4.5rem;
        background:url(../assets/images/login-btn.png) no-repeat;
        background-size: 100% 100%;
        right: 16.5%;
        z-index: 2;
        top: 20%;
        border-radius: 0.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
    }
    .register{
        top: 40%;
        z-index: 3;
    }
</style>
