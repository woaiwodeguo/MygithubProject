
<template>
  <div>
    <div class="luckTop">
      <h2>奖品数量：{{ prizeNumber }}</h2>
      <div>
        <button
          type="button"
          @click="!rolling && prizeNumber < 8 && prizeNumber++"
          :disabled="rolling || prizeNumber === 8"
        >
          增加奖品
        </button>

        <button
          type="button"
          @click="!rolling && prizeNumber > 2 && prizeNumber--"
          :disabled="rolling || prizeNumber === 2"
        >
          减少奖品
        </button>
      </div>
    </div>

    <div class="wheel-wrapper">
      <div class="wheel-pointer" @click="onClickRotate">开始</div>

      <div
        class="wheel-bg"
        :class="{ freeze: freeze }"
        :style="`transform: rotate(${wheelDeg}deg)`"
      >
        <div class="prize-list">
          <div
            class="prize-item-wrapper"
            v-for="(item, index) in prizeList"
            :key="index"
          >
            <div
              class="prize-item"
              :style="`transform: rotate(${
                (360 / prizeList.length) * index
              }deg)`"
            >
              <div class="prize-name">
                {{ item.name }}
              </div>
              <div class="prize-icon">
                <img :src="item.imgUrl" width="50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      freeze: false,
      rolling: false,
      wheelDeg: 0,
      prizeNumber: 8,
      prizeListOrigin: [
        {
          imgUrl: require("../../../assets/imgs/num1.jpg"),
          name: 10000,
        },
        {
          imgUrl: require("../../../assets/imgs/num2.jpg"),
          name: 2000,
        },
        {
          imgUrl: require("../../../assets/imgs/num3.jpg"),
          name: 500,
        },
        {
          imgUrl: require("../../../assets/imgs/num5.jpg"),
          name: 100,
        },
        {
          imgUrl: require("../../../assets/imgs/num6.jpg"),
          name: 75,
        },
        {
          imgUrl: require("../../../assets/imgs/num7.jpg"),
          name: 50,
        },
        {
          imgUrl: require("../../../assets/imgs/num5.jpg"),
          name: 10,
        },
        {
          imgUrl: require("../../../assets/imgs/qiqi.jpg"),
          name: "Thank you!",
        },
      ],
    };
  },
  computed: {
    prizeList() {
      return this.prizeListOrigin.slice(0, this.prizeNumber);
    },
  },
  methods: {
    onClickRotate() {
      if (this.rolling) {
        return;
      }
      this.rolling = true;
      const { wheelDeg, prizeList } = this;
      const random = Math.floor(Math.random() * prizeList.length);
      //   console.log(random);
      this.wheelDeg =
        wheelDeg -
        (wheelDeg % 360) +
        6 * 360 +
        (360 - (360 / prizeList.length) * random);
      setTimeout(() => {
        this.rolling = false;
        alert("恭喜抽中：" + prizeList[random].name);
      }, 4500);
    },
  },
  watch: {
    prizeNumber() {
      this.freeze = true;
      this.wheelDeg = 0;

      setTimeout(() => {
        this.freeze = false;
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>

.luckTop{
  display: flex;
  justify-content: space-around;
  button{
    width: 150px;
    height: 50px;
  }
}

.wheel-wrapper {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wheel-pointer {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: greenyellow;
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 60px;
  z-index: 10;
}
.wheel-bg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  transition: transform 4s ease-in-out;
  background: skyblue;

  &.freeze {
    transition: none;
    background: red;
  }
}

.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
}

.prize-item-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
}

.prize-item {
  width: 100%;
  height: 100%;
  transform-origin: bottom;

  .prize-name {
    padding: 16px 0;
  }
}
</style>