<template>
  <div>
    <h1>全局组件</h1>
    
    <ul>
      <li v-for="item in global" :key="item.id">
        <slot :globalVal="item"></slot>
        {{ item.title }}
      </li>
    </ul>

    <slot name="checkBox"></slot>
    <slot name="globalId"></slot>
  </div>
</template>

<script>
export default {
  name:'global', //这个name 是在注册全局组件时候使用
  data() {
    return {
      global: [
        { id: 1, title: "锄禾日当午" ,active:true},
        { id: 2, title: "汗滴禾下土" ,active:false},
        { id: 3, title: "谁知盘中餐" ,active:false},
        { id: 4, title: "粒粒皆辛苦" ,active:true},
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
h1{
    text-align: center;
}
ul {
  list-style: none;
  text-align: center;
}
</style>