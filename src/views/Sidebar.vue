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
      <li v-for="v in menuList" :key="v.name">
        <el-submenu :index="v.name" v-if="v.children && v.children.length > 0">
          <template slot="title">
            <i :class="v.meta.icon"></i>
            <span>{{ v.meta.name }}</span>
          </template>

            <!--遍历menu.js中的children -->
          <li v-for="vc in v.children" :key="vc.name">
             <!--这里判断是否有children有就用template,无就直接用el-menu-item --> 
            <el-submenu
              :index="vc.name"
              v-if="vc.children && vc.children.length > 0">
              <template slot="title">
                <i :class="vc.meta.icon"></i>
                <span>{{ vc.meta.name }}</span>
              </template>
                <!-- 遍历children中的children -->
              <li v-for="vcc in vc.children" :key="vcc.name">
                <el-menu-item :index="vcc.name" @click="gtRoute(vcc.name,v.meta.name,vc.meta.name,vcc.meta.name);addFun(vcc.name,vcc.meta.name)">
                  <i :class="vcc.meta.icon"></i>
                  <span>{{vcc.meta.name}}</span>
                </el-menu-item>
              </li>
            </el-submenu>

            <el-menu-item :index="vc.name" v-if="vc.children==null" @click="gtRoute(vc.name,v.meta.name,vc.meta.name,columnD);addFun(vc.name,vc.meta.name)">
              <i :class="vc.meta.icon"></i>
              <span>{{ vc.meta.name }}</span>
            </el-menu-item>

          </li>
        </el-submenu>

        <el-menu-item :index="v.name" v-if="v.children==null" @click="gtRoute(v.name,v.meta.name,columnE,columnD);addFun(v.name,v.meta.name)">
              <i :class="v.meta.icon"></i>
              <span>{{ v.meta.name }}</span>
        </el-menu-item>
      </li>

      </el-menu>
    </el-col>
  </div>
</template>

<script>
import dynamicRoutes from "../router/menu"
export default {
  data() {
    return {
      menuList: dynamicRoutes,
      name:'',
      columnA:'',
      columnB:'',
      columnC:'',
      columnD:'',
      columnE:'欢迎您'
    }
  },
  methods: {
    gtRoute(name,columnA,columnB,columnC) {
      this.$router.push({ name })
      this.columnA=columnA
      this.columnB=columnB
      this.columnC=columnC
      this.name=name
      this.$bus.$emit('getValue',this.name,this.columnA,this.columnB,this.columnC)
    },
    addFun(valA,valB){
      // 子组件调用父组件的 addTab 方法 并传值给addTab函数
        this.$emit('myEvent',valA,valB)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-col-12 {
  width: 200px;
  .el-menu {
    height: 100vh;
    overflow: auto;
    .el-submenu{
      border: 0.5px solid #384453;
    }
  }
}
</style>

