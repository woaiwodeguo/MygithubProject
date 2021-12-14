<template>
  <div>
    <el-col :span="12">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#2D3A4B"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
      
        <!-- 循环遍历menu.js数据 -->
        <template v-for="v in menuList">
          <el-submenu
            :index="v.name"
            v-if="v.children && v.children.length > 0"
            :key="v.name"
          >
            <template slot="title">
              <i :class="v.meta.icon"></i>
              <span>{{ v.meta.name }}</span>
            </template>

            <template v-for="vc in v.children">
              <!--这里判断是否有children有就用template,无就直接用el-menu-item -->
              <el-submenu
                :index="vc.name"
                v-if="vc.children && vc.children.length > 0"
                :key="vc.name"
              >
                <template slot="title">
                  <i :class="vc.meta.icon"></i>
                  <span>{{ vc.meta.name }}</span>
                </template>

                <!-- 遍历children中的children -->
                <template v-for="vcc in vc.children">
                  <el-menu-item
                    :index="vcc.name"
                    @click="gtRoute(vcc.name)"
                    :key="vcc.name"
                  >
                    <i :class="vcc.meta.icon"></i>
                    <span>{{ vcc.meta.name }}</span>
                  </el-menu-item>
                </template>
              </el-submenu>

              <el-menu-item
                :index="vc.name"
                v-if="vc.children == null"
                @click="gtRoute(vc.name)"
                :key="vc.name"
              >
                <i :class="v.meta.icon"></i>
                <span>{{ v.meta.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>

          <el-menu-item
            :index="v.name"
            v-if="v.children == null"
            @click="gtRoute(v.name)"
            :key="v.name"
          >
            <i :class="v.meta.icon"></i>
            <span>{{ v.meta.name }}</span>
          </el-menu-item>
        </template>

      </el-menu>
    </el-col>
  </div>
</template>

<script>
import dynamicRoutes from "../router/menu";
export default {
  name: "many",
  data() {
    return {
      menuList: dynamicRoutes,
      name: "",
    };
  },
  methods: {
    gtRoute(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-col-12 {
  width: 200px;
  .el-menu {
    height: 100vh;
    overflow: auto;
    .el-submenu {
      border: 0.5px solid #384453;
    }
  }
}
</style>

