<template>
  <div>
    <h1>商铺</h1>
    <ul>
      <li v-for="(product, index) in products" :key="index">
        <h3>{{ product.title }}---{{ product.price | currency('$') }}</h3>
        <h3>库存：{{ product.inventory }}</h3>
        <p>
          <button
            @click="addProductToCart(product)"
            :disabled="!product.inventory"
          >
            添加购物车
          </button>
        </p>
        -----------------------------------
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("products", ["products"]),
  },
  created() {
    this.$store.dispatch("products/getAllProducts"); 
 //使用vuex的replaceState 解决页面刷新state 数据丢失问题 
    if (sessionStorage.getItem("product")) {
        this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("product"))))
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("product", JSON.stringify(this.$store.state));
    });
  },
  methods: {
    ...mapActions("cart", ["addProductToCart"]),
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
button {
  width: 100px;
  height: 30px;
}
</style>