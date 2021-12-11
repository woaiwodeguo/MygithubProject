<template>
  <div class="countDown">
    <button id="btn2" @click="reBack">返回</button>
    <div class="box" v-show="boxFlag">
      <input
        type="text"
        placeholder="这里输入主题，下面修改未来日期"
        class="itTitle item"
        v-model="theme"
      />
      <input type="text" class="itDate item" v-model="nowTime" />
      <button class="btn" @click="send">确定</button>
    </div>

    <div class="box2" v-show="box2Flag">
      <p class="box2_Item"></p>
      <div class="item dv1">距离 <span class="theme" ref="theme"></span></div>
      <div class="item dv2"><span class="day" ref="days"></span> 天</div>
      <div class="item dv3"><span class="minutes" ref="minutes"></span> 分</div>
      <div class="item dv4"><span class="second" ref="seconds"></span> 秒</div>
      <div class="item dv5">还剩</div>
      <div class="item dv6"><span class="hours" ref="hours"></span> 小时</div>
    </div>

    <p class="title" v-show="itemFlag">嘿！你！是一个特别美好的存在。</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boxFlag: true,
      box2Flag: false,
      itemFlag: false,
      theme: "",
      nowTime: "2022/2/1 00:00:00",
      timed: null,
    };
  },
  methods: {
    send() {
      this.boxFlag = false;
      this.box2Flag = true;
      this.$refs.theme.innerHTML = this.theme;
      this.timed = setInterval(this.reCount, 1000, `${this.nowTime}`);
    },
    reBack(){
      this.boxFlag=true;
      this,this.box2Flag=false;
    },
    reCount(time) {
      let now = new Date(),
        future = new Date(time),
        nowTime = now.getTime(),
        futureTime = future.getTime(),
        limTime = (futureTime - nowTime) / 1000;

      if (limTime > 0) {
        this.$refs.days.innerHTML = parseInt(limTime / 60 / 60 / 24);
        this.$refs.days.innerHTML =
          this.$refs.days.innerHTML < 10
            ? "0" + this.$refs.days.innerHTML
            : this.$refs.days.innerHTML;
        this.$refs.hours.innerHTML = parseInt((limTime / 60 / 60) % 24);
        this.$refs.hours.innerHTML =
          this.$refs.hours.innerHTML < 10
            ? "0" + this.$refs.hours.innerHTML
            : this.$refs.hours.innerHTML;
        this.$refs.minutes.innerHTML = parseInt((limTime / 60) % 60);
        this.$refs.minutes.innerHTML =
          this.$refs.minutes.innerHTML < 10
            ? "0" + this.$refs.minutes.innerHTML
            : this.$refs.minutes.innerHTML;
        this.$refs.seconds.innerHTML = parseInt(limTime % 60);
        this.$refs.seconds.innerHTML =
          this.$refs.seconds.innerHTML < 10
            ? "0" + this.$refs.seconds.innerHTML
            : this.$refs.seconds.innerHTML;
      } else {
        clearInterval(this.timed);
        this.itemFlag = true;
        this.box2Flag = false;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
 @import '../../assets/css/countDown.scss';
</style>
