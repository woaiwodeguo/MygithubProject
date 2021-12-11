<template>
    <div class="login">
       <div class="loginDemo">
        <h3>element表单</h3>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pwd">
            <el-input type="password" v-model="ruleForm.pwd" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>

        </el-form>
      </div>
      
      <hr />
      <h2>
        以下是模仿 element 自己封装的login组件(用async-validator做校验)
        <p>{{ruleForm}}</p>
      </h2>
      
    <div class="loginTwo">
      <form-m :model="ruleForm" :rules="rules">
          <form-item-m label="用户名" prop="name">
          <input-m v-model="ruleForm.name"></input-m>
        </form-item-m>
        
      <form-item-m label="密码" prop="pwd">
          <inputM type="password" v-model="ruleForm.pwd"></inputM>
        </form-item-m>

        <form-item-m >
         <button @click="submitFormM('ruleForm')">提交</button>
        </form-item-m>

      </form-m>
       
        
      </div>
    </div>

</template>

<script>
  import inputM from '../../../components/myForm/input.vue';
  import formItemM from '../../../components/myForm/formItem.vue';
  import formM from '../../../components/myForm/form.vue'
  export default {
    name:"FormElement",
    components: {
      inputM,
      formItemM,
      formM
    },
    data() {
      return {
        ruleForm:{
          name:'',
          pwd:''
        },
        rules:{
          name:[
            {required:true,message:"请输入名称"},
            {min:6,max:10,message:"请输入6~10位用户名"}
          ],
          pwd:[{required:true,message:'请输入密码'}]
        }
      }
    },
    methods: {
      submitForm(name) {
        this.$refs[name].validate(valid=>{
          // console.log(valid);
          if(valid){
            alert('验证成功，可以提交')
          }else{
            alert('error 提交')
            return false
          }
        })
      },
      // 自己写的校验事件
      submitFormM(name){
            this.$refs[name].validate(valid=>{
          // console.log(valid);
          if(valid){
            alert('验证成功，可以提交')
          }else{
            alert('error 提交')
            return false
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
   .login{
     min-height: 600px;
      .loginDemo{
      width: 500px;
      margin: 0 auto;
      text-align: center;
    }
    h2{
      text-align: center;
    }
    .loginTwo{
      text-align: center;
    }
   }
</style>