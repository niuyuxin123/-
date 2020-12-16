<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

export default {
  name: 'App',
  created() {
    // this.$router.push('/')
  }
  // components: {
  //   HelloWorld
  // }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
