<template>
    <div>
        <label v-if="label">{{label}}</label>
        <!-- 插槽得作用 -->
        <slot></slot>

        <!-- 显示校验得错误信息 -->
        <p v-if="validateStatus==='error'" class="error">{{errorMessage}}</p>
    </div>
</template>

<script>
    // 绑定label prop 属性 
    // 获取当前输入框得规则 
    // 如果输入内容 rule 不匹配 显示错误信息
    // input 组件输入内容时 通知FormItem做校验(校验方法)
    // element 表单组件中 提示：用 async-validator 做校验

    // 引入安装好得 async-validator
    import Schema from 'async-validator';
    export default {
        data() {
            name:"FormItem"
            return {
                validateStatus: '',   //校验得状态值
                errorMessage:''   //显示错误得信息
            }
        },
        inject:['form'],
        props: {
            label: {
                type: String,
                default:''
            },
             prop: {
                type: String,
                default:''
            },
        },
        mounted () {
            if(this.prop){ //必须判断 因为form组件的子组件可能不是FormItem
                this.$parent.$emit('formItemAdd',this)
            }
        },
        methods: {
            validate(value) {
             // console.log(value);  //输入框的值

            return new Promise(res=>{
            // let descriptor={};  //此对象存储校验规则

            // 获取校验对象 ===>Form组件对象=>rules[this.prop]
            // console.log(this.form.rules[this.prop]);
            //    descriptor[this.prop]=this.form.rules[this.prop];

             //上面两端代码等同于
             const descriptor = {
                 [this.prop]: this.form.rules[this.prop]
             }    
            const validator= new Schema(descriptor);

            //    let obj = {};
            //    obj[this.prop]=value
            // 上面两段代码可以写成 {[this.prop]:value}
               validator.validate({[this.prop]:value},error=>{
                 if (error) {
                    // 显示错误
                    this.validateStatus="error"
                    this.errorMessage=error[0].message;
                    res(false);
                }else{
                    // 错误置空
                    this.validateStatus='';
                    this.errorMessage='';
                    res(true);
                }
              })
            })
          }
        },
        created () {
            this.$on('validate',this.validate);
        },
    }
</script>

<style lang="scss" scoped>
  .error{
      color: red;
  }
</style>