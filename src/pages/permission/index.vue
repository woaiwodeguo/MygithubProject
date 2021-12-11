<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <div class="namedView">
      <router-view name="sideBar" class="sideBar"></router-view>
      <router-view name="main" class="main"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.namedView{
    display: flex;
    justify-content: space-between;
    .sideBar{
        width: 30%;
        min-height: 500px;
        background: rgb(238, 227, 235);
    }
    .main{
        width: 70%;
        min-height: 500px;
        background-color: rgb(201, 225, 245);
    }
}
</style>
