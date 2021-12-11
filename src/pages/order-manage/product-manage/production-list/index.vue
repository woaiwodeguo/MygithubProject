<template>
  <div class="productionList">
    <div class="shopTop">
      <p>shopping</p>
      <div class="topIcon">
        <span class="topCount"><i class="el-icon-shopping-cart-full"></i>{{newCount}}</span>
        <span><i class=""></i></span>
      </div>
    </div>
    <div class="shopList">
      <ul>
        <li v-for="(item, index) in cartList" :key="item.id">
          <h3>{{ item.title }}</h3>
          <p>{{ item.price | currency('￥') }}</p>
          <el-button type="primary"  @click="addCart(index)">加入购物车</el-button>
        </li>
      </ul>
    </div>
    <hr />
    <div>
      <shopCar :title="title" :cart="cartList" @totalCount="totalCount"></shopCar>
    </div>
  </div>
</template>

<script>
import shopCar from "../../../../components/shoppingCar.vue";
export default {
  data() {
    return {
      title: "购物车",
      cartList: [
        { id: 1, title: "唐诗三百首", price: 188, active: true, count: 1 },
        { id: 2, title: "本草纲目", price: 288, active: true, count: 1 },
      ],
      newCount: sessionStorage.getItem('newCount') || 0
    }
  },
  components: {
    shopCar,
  },
  methods: {
    addCart(i) {
      const good = this.cartList[i];
      this.$bus.$emit("addCart", good);
    },
    totalCount(c){
      sessionStorage.setItem('newCount',c)
      this.newCount=c;
    }
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.productionList {
  min-height: 600px;
  .shopList {
      text-align: center;
    ul {
      list-style: none;
      font-size: 20px;
      li{
         .el-button--primary{
           width: 150px;
           height: 50px;
           font-size: 20px;
        }
      }
    }
  }
  .shopTop {
    display: flex;
    justify-content: space-between;
    font-size: 25px;
    margin-bottom: 88px;
    .topIcon i {
      font-size: 25px;
    }
    .topIcon .topCount {
      margin-right: 15px;
    }
  }
}
</style>