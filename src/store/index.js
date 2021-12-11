import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
// 挂载购物车和商铺两个模块
import cart from './modules/cart';
import products from './modules/products';

export default new Vuex.Store({
  state: {
    count:0
  },
  mutations: {
    increment(state){
      state.count++
    },
    payCut(state){
      state.count--
    },
    numFive(state,amount){
       state.count+=amount;
    }
  },
  actions: {
    increment({commit}){
      // commit mutations中声明的方法
      commit('increment');
    },
    numFive({commit},{amount}){
        commit('numFive',amount)
    }
  },
  modules: {
    cart,
    products
  }
})
