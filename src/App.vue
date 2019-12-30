<template>
  <div id="app">
    <MainScreen />
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import MainScreen from "./components/MainScreen.vue";

export default {
  name: "app",
  components: {
    MainScreen
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
