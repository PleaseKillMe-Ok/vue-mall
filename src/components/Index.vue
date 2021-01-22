<template>
  <div id="Index">
      <router-view />
      <Footer></Footer>
  </div>
</template>

<script>
import { component } from 'vue/types/umd'
const Footer =() => import('@/components/common/Footer')
export default {
    name:'Index',
    components:{Footer},
}
</script>

<style>

</style>