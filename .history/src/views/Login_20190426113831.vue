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
        <div
          class="login"
          @click="swicthLoginPanel(1)"
          :style="{'z-index':currentPanel == 1 ? 3 : 2}"
        ></div>
        <div
          class="register"
          @click="swicthLoginPanel(0)"
          :style="{'z-index':currentPanel == 0 ? 3 : 2}"
        ></div>
        <div class="register-login-wrapper">
          <div class="register-register-wrapper">
            <div class="content" v-if="currentPanel == 0">
              <chess-input label="姓名" type="text" width="6rem" v-model="username"></chess-input>
              <chess-input
                @trigger="triggerSelect"
                label="性别"
                type="text"
                width="6rem"
                readonly
                v-model="sex"
              ></chess-input>
              <chess-select
                :option-list="sexList"
                @select="selectSex"
                :is-show="showSelect"
                styles="position:absolute;right:2.2rem;top:5.2rem;z-index:1;"
              ></chess-select>
              <chess-input label="卡号" type="text" width="6rem" v-model="crad"></chess-input>
              <chess-input label="激活码" type="text" width="5rem" v-model="crad_password"></chess-input>
              <chess-input label="家长手机号" type="text" width="3rem" v-model="guardian_phone"></chess-input>
              <chess-input label="密码" type="password" width="6rem" v-model="password"></chess-input>
              <div class="register-btn-group">
                <button @click="register" class="register-btn">注册</button>
              </div>
            </div>
            <div class="content" v-if="currentPanel == 1">
              <chess-input
                @trigger="triggerRole"
                readonly
                styles="width:95%"
                label="选择身份"
                type="text"
                width="100%"
                v-model="role.text"
              ></chess-input>
              <chess-select
                :option-list="roleList"
                @select="selectRole"
                :is-show="showSelectRole"
                styles="position:absolute;right:2.2rem;top:5.2rem;z-index:1"
              ></chess-select>
              <chess-input
                styles="width:95%"
                label="姓名"
                type="text"
                width="16rem"
                v-model="Eusername"
              ></chess-input>
              <chess-input
                styles="width:95%"
                label="密码"
                type="password"
                width="16rem"
                v-model="Epassword"
              ></chess-input>
              <div class="remember-and-forget-wrapper">
                <p class="remember-me-wrapper pointer">
                  <span class="checkbox"></span>
                  <span class="remember-text">记住密码</span>
                </p>
                <p @click="forgetPass" class="forget-pass-wrapper pointer underline">忘记密码</p>
              </div>
              <div class="btn-group">
                <button class="enter-game" @click="login">进入游戏</button>
              </div>
            </div>
            <div class="content find-pwd" v-if="currentPanel == 2">
              <chess-input
                styles="width:95%;margin:0.2rem 0.4rem;"
                label="卡号"
                type="text"
                width="16rem"
                v-model="Fcrad"
              ></chess-input>
              <chess-input
                styles="width:95%;margin:0.2rem 0.4rem;"
                label="激活码"
                type="text"
                width="16rem"
                v-model="Fcode"
              ></chess-input>
              <chess-input
                styles="width:95%;margin:0.2rem 0.4rem;"
                label="姓名"
                type="text"
                width="16rem"
                v-model="Fnickname"
              ></chess-input>
              <chess-input
                styles="width:95%;margin:0.2rem 0.4rem;"
                label="重置密码"
                type="password"
                width="14rem"
                v-model="Fpassword"
              ></chess-input>
              <chess-input
                styles="width:95%;margin:0.2rem 0.4rem;"
                label="确定密码"
                type="password"
                width="14rem"
                v-model="Fpassword1"
              ></chess-input>
              <div class="reset-wrapper">
                <button class="confirm-btn pointer" @click="forget">确定</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 创建成功提示 -->
    <login-alert :is-show="showLoginAlert"></login-alert>
  </div>
</template>
<script>
import Mask from "../components/Mask";
import Input from "../components/Input";
import Select from "../components/Select";
import { constants } from "crypto";
import LoginAlert from "../components/LoginAlert";
export default {
  components: {
    [Mask.name]: Mask,
    [Input.name]: Input,
    [Select.name]: Select,
    LoginAlert
  },
  data() {
    return {
      showLoginAlert: false,
      showSelect: false,
      currentPanel: 1,
      showSelectRole: false,
      role: "学生",
      sexList: [
        {
          id: 0,
          text: "男"
        },
        {
          id: 1,
          text: "女"
        }
      ],
      roleList: [
        {
          id: 1,
          text: "老师"
        },
        {
          id: 0,
          text: "学生"
        }
      ],
      role: { text: "学生", value: 0 },
      Eusername: "",
      Epassword: "",
      // 注册
      username: "",
      sex: "",
      crad: "",
      crad_password: "",
      guardian_phone: "",
      password: "",
      // 忘记密码
      Fcrad: "",
      Fcode: "",
      Fnickname: "",
      Fpassword: "",
      Fpassword1: ""
    };
  },
  methods: {
    triggerSelect() {
      this.showSelect = !this.showSelect;
    },
    triggerRole() {
      this.showSelectRole = !this.showSelectRole;
    },
    selectSex(sex) {
      console.log(sex);
      this.showSelect = false;
      if (sex == 0) {
        this.sex = "男";
      } else {
        this.sex = "女";
      }
    },
    swicthLoginPanel(index) {
      this.currentPanel = index;
    },
    selectRole(role) {
      this.showSelectRole = false;
      if (role == 1) {
        this.role = "老师";
        this.$router.push("/login-teacher");
      } else {
        this.role = "学生";
        this.$router.push("/login");
      }
    },
    forgetPass() {
      this.currentPanel = 2;
    },
    login() {
      if (this.Eusername != "" && this.Epassword != "") {
        this.$axios({
          method: "post",
          url: `${
            process.env.VUE_APP_URL
          }/index.php?r=api-student/student-login`,
          data: this.qs.stringify({
            nickname: this.Eusername,
            password: this.Epassword
          })
        })
          .then(res => {
            if (res.data.status == 1) {
              this.$router.push("/home");
              localStorage.setItem("userInfo", JSON.stringify(res.data.data));
            } else {
              alert(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        alert("账号和密码不能为空,请填写完整!!!");
      }
    },
    register() {
      if (
        this.username != "" &&
        this.sex != "" &&
        this.crad != "" &&
        this.crad_password != "" &&
        this.guardian_phone != "" &&
        this.password != ""
      ) {
        if (this.sex == "男") {
          this.sex = 0;
        } else {
          this.sex = 1;
        }
        this.$axios({
          method: "post",
          url: `${"http://xiangqi.pzhkj.cn"}/index.php?r=api-student/student-register`,
          data: this.qs.stringify({
            nickname: this.username,
            sex: this.sex,
            crad: this.crad,
            crad_password: this.crad_password,
            guardian_phone: this.guardian_phone,
            password: this.password
          })
        })
          .then(res => {
            if (res.data.status == 1) {
              this.showLoginAlert = true;
              this.isClose();
              this.currentPanel = 1;
            } else {
              alert(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        alert("请把信息填写完整!!!");
      }
    },
    forget() {
      if (
        this.Fcrad != "" &&
        this.Fcode != "" &&
        this.Fnickname != "" &&
        this.Fpassword != "" &&
        this.Fpassword1 != ""
      ) {
        if ((this.Fpassword = this.Fpassword1)) {
          this.$axios({
            method: "post",
            url: `${"http://xiangqi.pzhkj.cn"}/index.php?r=api-student/update-pass`,
            data: this.qs.stringify({
              crad: this.Fcrad,
              code: this.Fcode,
              nickname: this.Fnickname,
              password: this.Fpassword
            })
          })
            .then(res => {
              console.log(res.data);
              if (res.data.status == 1) {
                alert("");
              } else {
                alert(res.data.msg);
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        } else {
          alert("密码输入不一致，请重新输入");
        }
      } else {
        alert("请把信息填写完整!!!");
      }
    },
    isClose() {
      setTimeout(() => {
        this.showLoginAlert = false;
      }, 1500);
    }
  },
};
</script>
<style scoped>
div.chess-login-wrapper {
  width: 100%;
  height: 100%;
  background: url(../assets/images/login-bg.png) no-repeat;
  background-size: 100% 100%;
}
div.elephant-wrapper {
  z-index: 2;
  position: absolute;
  left: 24%;
  bottom: 16%;
}
img.elephant-icon {
  width: 20%;
}
img.qi-icon {
  width: 10%;
}
div.login-register-warpper {
  position: absolute;
  left: 50%;
  top:10%;
  z-index: 2;
  width: 38%;
  height: 70%;
  min-width: 360px;
  min-height: 500px;
  bottom: 10%;
}
div.register-top {
  height: 22%;
  background: url(../assets/images/house-top.png) no-repeat;
  background-size: 100% 100%;
  z-index: 3;
  position: relative;
}
div.register-body {
  background: url(../assets/images/house-body.png) no-repeat;
  background-size: 60% 100%;
  background-position: center;
  height: 78%;
  position: relative;
  top: -5%;
  width: 100%;
}
div.register-login-wrapper {
  position: absolute;
  width: 60%;
  background: url(../assets/images/register-yellow-1.png) no-repeat;
  background-size: 95% 100%;
  height: 82%;
  top: 7%;
  left: 22%;
}
div.register-register-wrapper {
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
.content{
  height: 100%;
}
div.content.find-pwd {
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
div.register-btn-group {
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
div.remember-and-forget-wrapper {
  padding: 0.5rem;
}
span.checkbox {
  background: #59341e;
  width: 1.2rem;
  height: 1.2rem;
  display: inline-block;
  border-radius: 0.2rem;
}
span.remember-text {
  line-height: 1.2rem;
  vertical-align: top;
  margin-left: 0.5rem;
}
p.remember-me-wrapper {
  float: left;
}
p.forget-pass-wrapper {
  float: right;
}
.btn-group {
  text-align: center;
  margin-top: 3rem;
}
button.enter-game {
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
.login,
.register {
  cursor: pointer;
  position: absolute;
  width: 4.5rem;
  height: 4.5rem;
  right: 16%;
  z-index: 2;
  top: 20%;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.login {
  background: url(../assets/images/login-btn.png) no-repeat;
  background-size: 100% 100%;
}
.register {
  top: 40%;
  z-index: 3;
  background: url(../assets/images/register-btn.png) no-repeat;
  background-size: 100% 100%;
}
</style>
