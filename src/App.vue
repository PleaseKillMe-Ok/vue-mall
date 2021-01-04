<template>
  <div>
    <div id="app">

      <Home></Home>
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

  import Footer from "./components/Footer"; // 底部栏

  import Home from "./components/Home";  // 主页栏

  export default {
  name: 'App',
  data(){
    return{
     history:[]
    };
  },
  components:{
    Footer,
    Home
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
