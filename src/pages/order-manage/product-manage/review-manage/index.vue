<template>
  <div>
    <h2>导航完成之后3s获取数据</h2>
    ------------------------------------------
    <div class="post">
      <div v-if="loading" class="loading">
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 100%"
        >
        </el-table>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="post">
        <h3>{{ post.name }}</h3>
        <h4>{{ post.age }}</h4>
        <h4>{{ post.height }}</h4>
        <h4>{{ post.weight }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name:'reviewManage',
  data() {
    return {
      post: {},
      error: null,
      loading: false,
    };
  },
  watch: {
    // 监听路由变化 重新调取数据
    $route: 'getPostData',
  },
  created() {
    // console.log(this.$https);
      this.getPostData(); 
  },
  methods: {
    // 模拟真实数据
    async getPostData() {
      try {
        this.loading = true;
        const { data } = await Axios.get("http://localhost:3000");
        this.loading = false;
        this.post = data;
      } catch (error) {
        this.error = error.toString();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>


 
