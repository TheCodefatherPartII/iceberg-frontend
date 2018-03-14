<template>
  <div>
    <div class="top">
      <img src="./assets/iceberg-icon.png" style="height: 60px;">
      <div><span>Iceberg</span></div>
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
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
html {
  height: 100%;
  font-family: 'Open Sans', sans-serif;
}
body {
  height: 100%; margin: 0px; padding: 0px;
  background-color: #182027;
  }
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
  font-size: 12px;
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
  width: 210px;
  top: 70px;
  left: 30px;
  z-index: 99;
  /* display: flex; */
  /* flex-direction: column; */
  color: white;
}
.overlay-menu-controls {
  padding: 10px;
  background: #182027;
  opacity: 0.75;
}
.overlay-menu-header {
  padding: 10px;
  background: #182027;
}
.overlay-menu-footer {
  padding: 10px;
  background: #182027;
}
.overlay-menu-controls-checkboxes {
  font-size: 11px;
}

</style>
