<template>
  <div class="luckDraw">
    <h1>抽奖</h1>
    <div>
      <div class="luckRoute">  
          <router-link to="/home/luckDraw/luckDrawOne">抽奖One</router-link>
        -----
          <router-link to="/home/luckDraw/luckDrawTwo">抽奖Two</router-link>
      </div>
      <hr />
      <div class="luckView">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.luckDraw {
  text-align: center;
  .luckRoute {
    margin-bottom: 50px;
    font-size: 20px;
  }
  .luckView {
    margin-top: 15px;
    min-height: 600px;
  }
}
</style>