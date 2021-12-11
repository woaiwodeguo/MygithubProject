<template>
  <div>
    <template class="topBtn">
      <el-button type="success" @click="start">开始</el-button>
      <el-button type="danger" @click="end">结束</el-button>
    </template>

    <div class="luckImg">
      <img :src="imgArr[imgIndex].imgUrl" alt="" width="200px" />
      <p>{{ imgArr[imgIndex].title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgArr: [
        {
          imgUrl: require("../../../assets/imgs/num1.jpg"),
          title: "10000￥",
        },
        {
          imgUrl: require("../../../assets/imgs/num2.jpg"),
          title: "1000￥",
        },
        {
          imgUrl: require("../../../assets/imgs/num3.jpg"),
          title: "1000￥",
        },
        {
          imgUrl: require("../../../assets/imgs/num5.jpg"),
          title: "100￥",
        },
        {
          imgUrl: require("../../../assets/imgs/num6.jpg"),
          title: "75￥",
        },
        {
          imgUrl: require("../../../assets/imgs/num7.jpg"),
          title: "50￥",
        },
        {
          imgUrl: require("../../../assets/imgs/num5.jpg"),
          title: "25￥",
        },
        {
          imgUrl: require("../../../assets/imgs/qiqi.jpg"),
          title: "Thank you!",
        },
      ],
      imgIndex: 0,
      timed: null,
    };
  },
  methods: {
    start() {
      clearInterval(this.timed);
      this.timed = setInterval(() => {
        this.randomSun();
      }, 10);
    },
    end() {
      clearInterval(this.timed);
      setTimeout(() => {
        alert(`恭喜抽中：${this.imgArr[this.imgIndex].title}`);
      }, 100);
    },
    randomSun() {
      this.imgIndex = Math.floor(Math.random() * this.imgArr.length);
    },
  },
};
</script>

<style lang="scss" scoped>
.luckImg {
  margin-top: 100px;
  margin-bottom: 30px;
}
</style>