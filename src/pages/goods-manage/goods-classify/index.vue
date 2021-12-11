<template>
  <div>
    <global>
      <template v-slot="{ globalVal }">
        {{ globalVal.id }}
      </template>
      <template slot="globalId">
        <h3>
          使用作用域插槽完成需求：给全局组件添加了id值
          依旧不改变全局组件原有数据 不影响其复用
        </h3>
      </template>
    </global>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
}
</style>
