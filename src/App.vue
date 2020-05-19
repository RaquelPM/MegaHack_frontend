<template>
  <div id="app">
    <transition
      name="fade"
      appear
    >
      <router-view></router-view>
    </transition>
    <!-- <h1>TESTE</h1> -->
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


.fade-enter-active{
    transition: opacity .5s;
    transition-delay: .3s;
}
.fade-leave-active{
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to{
    opacity: 0;
}

</style>
