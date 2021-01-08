<template>
  <div class="HeadLine">
    <h1>{{ msg }}</h1>


  </div>
</template>

<script>
export default {
  name: 'HeadLine',
  data () {
    return {
      msg: 'HeadNavigation'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

* {
  margin: 0 auto;
  padding: 0 auto;
}
h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
