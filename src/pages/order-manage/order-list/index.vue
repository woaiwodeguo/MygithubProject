<template>
  <div class="orderList">
    <ul>
      <li
        v-for="(item, index) in productList"
        :key="index"
        :class="{ A: 'red', B: 'blue', C: 'green', D: 'pink', E: 'gray' }[item.bgc] "> {{ item.name }},{{ item.price | currency('￥') }}
        <el-button type="primary" @click="del(index)">删除</el-button>
      </li>
    </ul>
      <label for="name">商品名称：</label>
      <input type="text" v-model="name" id="name" /> <br />
      <label for="price">商品价格：</label>
      <input type="text" v-model="price" id="price"/> <br />
      <label for="bgc">商品BGC：</label>
      <input type="text" placeholder="任选ABCD其中一种" v-model="bgc" id="bgc"/> <br />
    <p></p>
    <el-button type="success" plain @click="addList">添加商品</el-button>
    <div>
      <hr />
      <div>
        <el-button type="primary" @click="handleAdd">给对象添加属性</el-button>
        <h2>{{ user }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      price: "",
      bgc: "",
      productList: [],
      user: {},
    };
  },
  created() {
    setTimeout(() => {
      this.user = {
        name: "zj",
      }
      this.productList=[
         {
          id: 1,
          name: "小米",
          price: 3000,
          bgc: "A",
        },
        {
          id: 2,
          name: "华为",
          price: 5000,
          bgc: "B",
        },
        {
          id: 3,
          name: "vivo",
          price: 3500,
          bgc: "C",
        },
        {
          id: 4,
          name: "菠萝",
          price: 2000,
          bgc: "D",
        },
        {
          id: 5,
          name: "荣耀",
          price: 3000,
          bgc: "E",
        },
      ]
    }, 500);
  },
  methods: {
    addList() {
      if (this.name && this.price && this.bgc) {
        this.productList.push({
          name: this.name,
          price: this.price,
          bgc: this.bgc,
        });
        this.name = this.price = this.bgc = "";
      }
    },
    del(index) {
      this.productList.splice(index, 1)
    },
    handleAdd() {
      // 给请求的对象数据添加属性方法一
      // this.$set(object,key,value)  //添加响应式属性

      // 方法二 es6语法 Object.assign({},object,{arg1,agr2,...})
      this.user = Object.assign({}, this.user, {
        age: 29,
        height: 178,
        weight: "75kg",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.orderList {
  text-align: center;
  min-height: 800px;
  .red {
    background: orangered;
  }
  .green {
    background: #42b983;
  }
  .blue {
    background: skyblue;
  }
  .pink {
    background: hotpink;
  }
  .gray {
    background: dimgray;
  }
  ul {
    list-style: none;
    li {
      margin-top: 15px;
    }
  }
}
</style>


