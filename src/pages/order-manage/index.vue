<template>
    <div>
       <keep-alive exclude="productManage">
           <router-view></router-view>
       </keep-alive>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {

    }
}
</script>
