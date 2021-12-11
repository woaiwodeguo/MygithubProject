<template>
    <div>
        <!-- v-model   等同于 v-bind和v-on:input事件 这里两个结合 -->
        <input :type="type" :value="inputVal" @input="handleInput">
    </div>
</template>

<script>
    export default {
        props:{
            type:{
                type:String,
                default:'text'
            },
            value:{
                type:String,
                default:''
            }
        },
        data() {
            return {
                inputVal: this.value
            }
        },
        methods: {
            handleInput(e) {
                // 赋值
                // 实现双向数据绑定
                this.inputVal=e.target.value
                // 通知父组件值得更新
                this.$emit('input',this.inputVal)
                
                // 通知父组件校验
                this.$parent.$emit('validate',this.inputVal)
            }
        },

    }
</script>

<style lang="scss" scoped>

</style>