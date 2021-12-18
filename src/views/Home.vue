<template>
  <div class="container">
    <!-- 左边导航栏 -->
    <div class="left">
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#2D3A4B"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <sidebar :menuList="menu"></sidebar>
        </el-menu>
      </el-col>
    </div>
    <!-- 头部栏 -->
    <div class="top">
      <top></top>
      <!-- 头部栏滚动的小球 点击可以返回上一层 直到homepage页面消失 -->
      <back class="rightBack"></back>
    </div>
    <!-- 右下各路由页面 -->
    <div class="right">
      <keep-alive>
        <router-view class="rightView"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import sidebar from "../components/sidebar/index.vue";
import top from "../components/top/index.vue";
import back from "../components/back.vue";
import { mapState } from "vuex";
import SideBar1 from "../components/namedView/sideBar.vue";

export default {
  components: {
    sidebar,
    top,
    back,
    SideBar1,
  },
  computed: {
    ...mapState(["menu"]),
  }
}
</script>


<style lang="scss" scoped>
 @import '../assets/css/home.scss';
</style>