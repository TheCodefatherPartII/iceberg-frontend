<template>
  <div>
    <div class="top">
      <img src="./assets/iceberg-icon.png" style="height: 60px;">
      <div style="flex: align-center"><span>Iceberg</span></div>
    </div>
    <div id="app">
      <Map msg="Welcome to Your Vue.js App"/>
    </div>
  </div>
</template>

<script>
import Map from './components/Map.vue'

export default {
  name: 'app',
  components: {
    Map
  }
}
</script>

<style>
html { height: 100% }
body {
  height: 100%; margin: 0px; padding: 0px;
  background-color: #182027;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.top {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #182027;
  color: white;
}
.map-container {
  position: relative;
}
.overlay-menu {
  position: absolute;
  width: 200px;
  top: 100px;
  left: 30px;
  z-index: 99;
  /* background-color: #182027; */
  display: flex;
  flex-direction: column;
  color: gray;
}
.overlay-menu-controls {
  background: #182027;
  opacity: 0.5;
}
.overlay-menu-header {
  background: #182027;
}
.overlay-menu-footer {
  background: #182027;
}

</style>
