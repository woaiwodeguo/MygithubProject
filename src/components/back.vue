<template>
  <div>
    <div class="back" @click="goBack" v-show="flag">X</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
    };
  },
  watch: {
    //   监听路由的改变
    $route(to) {
      if (to.name === "home-page") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>


<style lang="scss" scoped>
.back {
  width: 30px;
  height: 30px;
  background-color: rgb(22, 180, 243);
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  user-select: none;
}
.back:hover {
  transform: translateY(-4px);
  transition: all 3s;
}
</style>