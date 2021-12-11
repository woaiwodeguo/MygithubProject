<template>
 <div>
    <div>
    <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949" @change="changeBox">
    </el-switch>
  </div>
  <div v-if="flag" class="dv">
    <h1>VueX：{{count}}</h1>
     <el-button type="success" round @click="increment">点击加1</el-button>
     <el-button type="danger" round @click="payCut">点击减一</el-button>
     <el-button type="warning" round @click="numFive">点击一次+5</el-button>
  </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      flag:false
    };
  },
  computed: {
    count() {
      return this.$store.state.count 
    }
  },
  methods: {
    changeBox() {
      this.flag=!this.flag
    },
    increment(){
       this.$store.dispatch('increment')
    },
    payCut(){
      this.$store.commit('payCut')
    },
    numFive(){
      this.$store.dispatch('numFive',{amount:10})
    }
  }
};
</script>

<style lang="scss" scoped>
  .dv{
    width: 777px;
    height: 777px;
    background-color: skyblue;
  }
</style>

      
    