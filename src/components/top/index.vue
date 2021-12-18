<template>
  <div class="top">
    <div class="column">
      <span>{{$store.state.count}}</span>
      <span class="left">
        <i class="el-icon-s-flag"></i>
      </span>
      <!-- transition是vue官方提供的动画 -->
     
         <span>{{column}}</span>
    
    </div>

    <!-- 用户登陆时显示 -->
    <div class="user_name" v-if="flag">
      <span class="usNa">{{ userName }}</span>
      <span class="vcLine">|</span>
      <span class="rightIcon">
        <el-button type="text" @click="open">
          <i class="el-icon-switch-button"></i>
        </el-button>
      </span>
       <span class="cancellation">
         <template>
            <el-button type="text" @click="openCancellation">注销</el-button>
        </template>
       </span>
    </div>

    <!-- 用户未登录时显示 -->
    <div class="user_name" v-if="!flag" @click="goLogin">
      <span class="usNa">{{ login }}</span>
    </div>

    <!-- 匿名插槽 -->
    <slot></slot>
  </div>
</template>


<script>
export default {
  data() {
    return {
      column: '' || '/home',
      userName: localStorage.getItem('user'),
      flag: localStorage.getItem('bool') || false,
      login: "登陆",
    };
  },
  watch:{
    $route(to){
      this.column=to.path
    }
  },
  created() {
    // 来自登陆 销毁生命周期传过来的值
    this.$bus.$on('userName',(userV,bool)=>{
      this.userName=userV;
      this.flag=bool;
      localStorage.setItem('user',userV);
      localStorage.setItem('bool',bool);
    })
  },
  methods: {
    open() {
      this.$confirm("此操作将退出登陆, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          this.$router.replace({ name: "Login" });
          localStorage.removeItem('user');
          localStorage.removeItem('bool');
          this.flag=false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
    goLogin() {
      this.$router.push({ name: "Login" });
    },
    openCancellation() {
        this.$confirm('此操作将永久注销账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '注销成功!',
          });
          localStorage.removeItem(`${this.userName}`);
          localStorage.removeItem('user');
          localStorage.removeItem('bool');
           this.flag=false;
           this.$router.push({name:'home-page'});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销'
          });
        });
      }
  },
};
</script>

<style lang="scss" scoped>
  @import '../../assets/css/top.scss';
</style>