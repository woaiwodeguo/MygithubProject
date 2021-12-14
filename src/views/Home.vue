<template>
  <div>
    <!-- 左边导航栏 -->
    <header-vue class="left"></header-vue>
    <!-- 头部栏 -->
    <div class="top">
      <top-vue></top-vue>
      <back class="rightBack"></back>
    </div>
    <!-- 右下各路由页面 -->
    <div class="right">
      <keep-alive>
        <!-- <el-tabs
          v-model="editableTabsValue"
          type="card"
          closable
          @tab-remove="removeTab"
          
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"  
          >
          </el-tab-pane>
        </el-tabs> -->
         <router-view class="rightView"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import headerVue from "./Sidebar.vue";
import TopVue from "./Top.vue";
import back from "../components/back.vue";

export default {
  components: {
    headerVue,
    TopVue,
    back,
  },
  watch: {
    // $route(to, form) {
    //   let ret = this.editableTabs.some(item=>item.title===to.name);
    //   if(!ret){
    //     this.addTab();
    //   }
    // },
  },
  data() {
    return {
      // editableTabsValue: "",
      // editableTabs: [],
      // tabIndex: 0
    };
  },
  methods: {
    goBack() {
      this.$router.go(1);
    },
  //   addTab(targetName) {
  //     let newTabName = ++this.tabIndex + "";
  //     this.editableTabs.push({
  //       title: this.$route.name,
  //       name: newTabName,
  //     });
  //     this.editableTabsValue = newTabName;
  //   },
  //   removeTab(targetName) {
  //     let tabs = this.editableTabs;
  //     let activeName = this.editableTabsValue;
  //     if (activeName === targetName) {
  //       tabs.forEach((tab, index) => {
  //         if (tab.name === targetName) {
  //           let nextTab = tabs[index + 1] || tabs[index - 1];
  //           if (nextTab) {
  //             activeName = nextTab.name;
  //           }
  //         }
  //       });
  //     }
  //     this.editableTabsValue = activeName;
  //     this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
  //   },
  },
};
</script>


<style lang="scss" scoped>
.left {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
}
.right {
  min-height: 0px;
  margin: 67px 20px 0 207px;
  border: 1px solid #eee;
  box-shadow: 7px 10px 7px gray;
  padding: 0 10px;
  position: relative;
  .rightView {
    margin-top: 25px;
  }
}
.top {
  position: fixed;
  left: 200px;
  top: 0;
  right: 0px;
  height: 50px;
  line-height: 50px;
  padding: 0 18px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  background-color: #f5f7fa;
  z-index: 10;
  .rightBack {
    position: absolute;
    right: 50%;
    top: 30px;
    z-index: 15;
    animation: rightBack 49s linear infinite;
  }
  @keyframes rightBack {
    0% {
      right: 50%;
      transform: rotateZ(0deg);
    }
    20% {
      right: 90%;
      transform: rotateZ(3600deg);
    }
    40% {
      right: 10%;
      transform: rotateZ(720deg);
    }
    60% {
      right: 90%;
      transform: rotateZ(3600deg);
    }
    70% {
      right: 10%;
      transform: rotateZ(720deg);
    }
    85% {
      right: 80%;
      transform: rotateZ(3600deg);
    }
    100% {
      right: 50%;
      transform: rotateZ(0deg);
    }
  }
  .rightBack:hover {
    animation-play-state: paused;
  }
}
</style>