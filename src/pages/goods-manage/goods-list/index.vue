<template>
  <div>
    <shopCar>
      <template slot="one">
        ---------------------------------------------------------------------
          <p>ShopCar组件具名插槽一</p>
          <el-tag>标签一</el-tag>
      </template>
      <template slot="two">
          <p>ShopCar组件具名插槽二</p>
          <p><el-tag type="success">标签二</el-tag></p>
        ---------------------------------------------------------------------
      </template>
    </shopCar>

    <global>
        <template v-slot="{globalVal}">
            <input type="checkbox" v-model="globalVal.active">
        </template>

        <template slot="checkBox">
            <h3>使用作用域插槽完成需求：在原有的全局组件上添加了复选框 </h3>
        </template>
    </global>
  </div>
</template>

<script>
import shopCar from "../../../components/shoppingCar.vue";
export default {
  components: {
    shopCar,
  },
};
</script>

<style lang="scss" scoped>
    h3{
        text-align: center;
    }
</style>
