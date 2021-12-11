<template>
  <div>
    <h1>VueX购物车</h1>
    <h2>总件数：{{cartTotalQuantity}}</h2>
    <ul>
      <li v-for="(item, index) in getCarList" :key="index">
        <h2>{{ item.title }}---{{ item.price | currency('$') }}</h2>
        <div>
          <button @click="decrementCartList(item)" :disabled="!item.quantity">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="addCartList(item)">+</button>
        </div>
         ----------------------------
      </li>  
    </ul>
    <h1>总价：{{ cartTotalPrice | currency('$') }}</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  created () {
    // 使用vuex 中的$store.replaceState 解决刷新页面 state 数据丢失问题
      if (sessionStorage.getItem("cartList")) {
        this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("cartList"))))
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("cartList", JSON.stringify(this.$store.state));
    });;
  },
  computed: {
    ...mapGetters("cart", ["getCarList", "cartTotalPrice","cartTotalQuantity"]),
  },
  methods: {
     ...mapActions('cart',['decrementCartList','addCartList']),
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
button{
    width: 60px;
    height: 30px;
    font-size: 20px;
}
span{
    display: inline-block;
    font-size: 20px;
    margin: 0 10px;
}
</style>