<template>
  <div>
    <!-- 循环遍历遍历menuList数据 -->
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

        <!-- 递归组件 -->
        <el-menu-item-group>
          <good-list :menuList="v.children"></good-list>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item
        :index="v.name"
        @click="gtRoute(v.name)"
        :key="v.name"
        v-else
      >
        <i :class="v.meta.icon"></i>
        <span>{{ v.meta.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>

export default {
  name: "good-list",
  props: {
    menuList: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    gtRoute(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

