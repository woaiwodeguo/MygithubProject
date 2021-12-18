<template>
  <div class="login_root">
    <div class="login" v-if="flag">
      <div class="loginBack" v-if="flag" @click="loginBack">X</div>
      <div class="pwdRetrieval" v-if="pwdRetrievalFlag" @click="retHandle">
        {{ forgetPwd }}
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            type="text"
            v-model="ruleForm.name"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pwd">
          <el-input
            type="password"
            v-model="ruleForm.pwd"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登陆</el-button
          >
          <el-button type="primary" @click="registerForm('ruleForm')"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="box1" v-if="!flag">
      <div class="zhangmen qq1"></div>
      <div class="zhangmen qq2"></div>
      <div class="zhangmen qq3"></div>
      <div class="zhangmen qq4"></div>
      <div class="zhangmen qq5"></div>
      <div class="zhangmen qq6"></div>
    </div>
    <!-- 登陆 -->
    <button class="loginBtn" @click="loginBtn" v-if="!flag">登陆</button>
    <!-- 仰望 -->
    <div class="box3"></div>
    <!-- 流星 -->
    <div class="liuxin1 liuxin"></div>
    <div class="liuxin2 liuxin"></div>
    <div class="liuxin3 liuxin"></div>
    <div class="liuxin4 liuxin"></div>
    <div class="liuxin5 liuxin"></div>
    <div class="liuxin6 liuxin"></div>
    <div class="liuxin7 liuxin"></div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      pwdRetrievalFlag: false,
      forgetPwd: "忘记密码?",
      ruleForm: {
        name: "",
        pwd: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入名称" },
          { min: 6, max: 10, message: "请输入6~10位用户名" },
        ],
        pwd: [{ required: true, message: "请输入密码" }],
      },
      pwdRetrieval: "",
    };
  },
  // 给顶部栏传 用户名的值
  destroyed() {
    this.$bus.$emit("userName", this.ruleForm.name, true);
  },
  methods: {
    // 登陆校验
    submitForm(name) {
      this.$refs[name].validate((valid) => {
        // console.log(valid);
        if (valid) {

          // 判断 localStorage 中是否有该账号
          if (localStorage.getItem(`${this.ruleForm.name}`)) {
            // 有账号 判断密码是否正确
            if (this.ruleForm.pwd ===JSON.parse(localStorage.getItem(`${this.ruleForm.name}`)).pwd) {
              // 密码正确
              localStorage.setItem('user','key')
              if(!this.$route.query.redirect) return  this.$router.push({ 
                path: '/home/homepage'
              })
              this.$router.push({ 
                path: this.$route.query.redirect
              })
     
            } else {
              alert("登陆密码有误");
              this.ruleForm.pwd = "";
              // 密码找回
              this.pwdRetrieval = JSON.parse(
                localStorage.getItem(`${this.ruleForm.name}`)
              ).pwd;
              this.forgetPwd = "忘记密码?";
              this.pwdRetrievalFlag = true;
            }
          } else {
            alert("账号未注册，请注册账号");
            this.ruleForm.pwd = "";
          }
        } else {
          alert("error 提交");
          return false;
        }
      });
    },
    // 注册校验
    registerForm(name) {
      this.$refs[name].validate((valid) => {
        // console.log(valid);
        if (valid) {
          if(localStorage.getItem(`${this.ruleForm.name}`)){
            alert("该账户已注册")
          }else{
            alert("注册成功");
            localStorage.setItem(`${this.ruleForm.name}`,JSON.stringify(this.ruleForm));
            localStorage.setItem('user','key');
            this.ruleForm.name = this.ruleForm.pwd = "";
          }
        } else {
          alert("注册格式有误");
          return false;
        }
      });
    },
    loginBtn() {
      this.flag = true;
      this.forgetPwd = "忘记密码?";
      this.pwdRetrievalFlag=false;
      this.ruleForm.name = this.ruleForm.pwd = "";
    },
    loginBack() {
      this.flag = false;
    },
    retHandle() {
      //密码找回
      this.forgetPwd = `密码是：${this.pwdRetrieval}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/login.scss";
</style>