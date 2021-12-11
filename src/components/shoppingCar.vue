<template>
<div class="shopCar">
    <h1>我是shoppingCar组件</h1>
    <h2>{{ title }}</h2>

      <div class="elementUi">
        <el-table
          ref="multipleTable"
          :data="cart"
          border
          tooltip-effect="dark"
          style="width: 50%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="title" label="课程" width="120">
          </el-table-column>
          <el-table-column prop="price" label="单价" width="120">
          </el-table-column>
          <el-table-column prop="count" label="数量" width="250">
              <template slot-scope="scope">
                  <el-input-number v-model="scope.row.count" :min="1" :max="100" label="描述文字"></el-input-number>
              </template>
          </el-table-column>
           <el-table-column label="总价" width="120">
                <template slot-scope="scope">
                  {{scope.row.count*scope.row.price | currency('￥')}}
              </template>
          </el-table-column>
        </el-table>
      </div>

     <div class="shopList">
          <table border="1">
        <tr>
          <th>#</th>
          <th>课程</th>
          <th>单价</th>
          <th>数量</th>
          <th>总价</th>
        </tr>
        <tr v-for="(c, index) in cart" :key="c.id">
          <td><input type="checkbox" v-model="c.active" /></td>
          <td>{{ c.title }}</td>
          <td>{{ c.price }}</td>
          <td>
            <button @click="subtract(index)">-</button>
            {{ c.count }}
            <button @click="add(index)">+</button>
          </td>
          <td>{{ (c.price * c.count) | currency('￥') }}</td>
        </tr>
        <tr>
          <td></td>
          <td colspan="2">{{ activeCount }}/{{ count }}</td>
          <td colspan="2">{{ total | currency('￥') }}</td>
        </tr>
      </table>
     </div>

     <div><slot name="one"></slot></div>
     <div><slot name="two"></slot></div>
  
</div>
</template>

<script>
export default {
  name: "cart",
  props: ["title"],
  data() {
    return {
      cart: JSON.parse(sessionStorage.getItem("cart")) || [],
      multipleSelection:[]
    };
  },
  watch: {
    cart: {
      handler(newVal, oldVal) {
        this.setLocalData(newVal);
      },
      deep: true,
    },
  },
  created() {
    this.$bus.$on("addCart", (good) => {
      const ret = this.cart.find((v) => v.id === good.id);
      if (!ret) {
        this.cart.push(good);
      } else {
        ret.count += 1;
      }
    });
  },
  computed: {
    count() {
      return this.cart.length;
    },
    activeCount() {
      return this.multipleSelection.filter((v) => v.active).length;
    },
    total() {
      //方法一
      // let sum = 0;
      // this.cart.forEach(c => {
      //     if(c.active){
      //         sum += c.price*c.count
      //     }
      // });
      // return sum;

      // 方法2
      return this.cart.reduce((sum, c) => {
        if (c.active) {
          sum += c.price * c.count;
        }
        return sum;
      }, 0);
    },
  },
  methods: {
    remove(i) {
      if (window.confirm("确定删除吗？")) {
        this.cart.splice(i, 1);
        sessionStorage.clear("cart");
      }
    },
    subtract(i) {
      let count = this.cart[i].count;
      count > 1 ? (this.cart[i].count -= 1) : this.remove(i);
    },
    add(i) {
      this.cart[i].count++;
    },
    setLocalData(n) {
      // 计算总课数
      let arr = [0];
      n.forEach((c, i) => {
        arr.push(n[i].count);
      });
      this.$emit(
        "totalCount",
        arr.reduce((p, c) => p + c)
      );
      //缓存数据
      sessionStorage.setItem("cart", JSON.stringify(n));
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.shopCar {
  text-align: center;
  .elementUi{
      .el-table{
          margin: 0 auto;
      }
  }
  .shopList{
      margin-top: 30px;
      table{
          margin: 0 auto;
      }
  }
}
</style>