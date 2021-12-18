<template>
  <div>
    <h1>
      留言板
      <el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="handSome"
      >
      </el-switch>
    </h1>

    <div class="textArea" v-show="flag">
      <el-button type="primary" @click="changeFontSize">{{
        bigSmall
      }}</el-button>
      <textarea
        name=""
        id=""
        placeholder=""
        :style="fontSize"
        v-model="content"
      ></textarea>
      <el-button type="primary" @click="open1">保存</el-button>
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div>
            <p :style="fontSize">{{ index + 1 }} {{ item.poem }}</p>
            <div class="time">
              <span class="nowTime">
                -----Time:{{ item.poemTime | nowTime }}
                <el-button type="danger" icon="el-icon-delete"
                  circle
                  @click="deleteData(index)"></el-button>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      list: JSON.parse(localStorage.getItem("MessageBoard")) || [],
      toRouteName: "",
      flag: true,
      value: true,
      timeNow: Date.now(),
      fontSize: "fontSize:30px",
      fs: true,
      bigSmall: "随机大小字体",
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.content) {
      this.open();
      next(false);
      this.toRouteName = to.name;
    } else {
      next();
    }
  },
  methods: {
    changeFontSize() {
      if (this.fs) {
        this.fontSize = `fontSize:${parseInt((Math.random() + 0.5) * 30)}px`;
        this.fs = false;
      } else {
        this.fontSize = `fontSize:${parseInt((Math.random() + 0.5) * 20)}px`;
        this.fs = true;
      }
    },
    open1() {
      if (!this.content) {
        alert("请输入内容再保存");
      } else {
        this.$notify({
          title: "保存",
          message: "保存成功",
          type: "success",
        });
        this.fontSize = `fontSize:${parseInt((Math.random() + 0.5) * 20)}px`;
        this.list.push({ poem: this.content, poemTime: this.timeNow });
        this.content = "";
        localStorage.setItem("MessageBoard", JSON.stringify(this.list));
        setTimeout(()=>{
          this.$router.go(0);
        },500)
      }
    },
    deleteData(i) {
      this.list.splice(i, 1);
      localStorage.setItem("MessageBoard", JSON.stringify(this.list));
    },
    open() {
      this.$alert("检测到未保存数据", "小可爱", {
        confirmButtonText: "保存并离开",
        callback: () => {
          this.open1();
          this.$router.push({ name: `${this.toRouteName}` });
        },
      });
    },
    handSome() {
      this.flag = !this.flag;
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  width: 100%;
  height: 300px;
  padding: 18px;
  box-sizing: border-box;
  outline: none;
}
ul{
  margin: 0;
  padding: 0;
  font-size: 0;
  li {
  list-style: none;
}
}
.time{
  height: 50px;
  line-height: 50px;
  .nowTime{
  font-size: 16px;
  float: right;
 }
}
</style>