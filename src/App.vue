<template>
  <div class="wrapper">
    <div class="top">
      <img src="./assets/iceberg-icon.png" style="height: 10vh;">
      <div><span>Iceberg</span></div>
    </div>
    <div id="app">
      <Map msg="Welcome to Your Vue.js App"/>
      <TimeSlider
              :start-time="startTime"
              :end-time="endTime"
              :transactions="transactions"
              :min-amount="minAmount"
              :max-amount="maxAmount"
      />
    </div>
  </div>
</template>

<script>
import Map from './components/Map.vue'
import TimeSlider from './components/TimeSlider.vue'
import Icon from 'vue-awesome'

export default {
  name: 'app',
  components: {
    Map,
    TimeSlider,
    Icon,
  },
  data() {
    const transactions = [
      {
        eventTime: new Date(2018, 2, 14, 0, 0, 0),
        amount: -5120
      },
      {
        eventTime: new Date(2018, 2, 14, 0, 25, 0),
        amount: -9500
      },
      {
        eventTime: new Date(2018, 2, 14, 2, 25, 0),
        amount: 500
      },
      {
        eventTime: new Date(2018, 2, 14, 6, 25, 0),
        amount: 6500
      },
      {
        eventTime: new Date(2018, 2, 14, 7, 25, 0),
        amount: 8200
      },
    ];
    return {
      transactions,
      startTime: new Date(Math.min.apply(Math, transactions.map(t => t.eventTime.getTime()))),
      endTime: new Date(Math.max.apply(Math, transactions.map(t => t.eventTime.getTime()))),
      minAmount: Math.min.apply(Math, transactions.map(t => t.amount)),
      maxAmount: Math.max.apply(Math, transactions.map(t => t.amount)),
    };
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
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #182027;
  }
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
  font-size: 12px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 10vh);
}
.top {
  width: 100%;
  height: 10vh;
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
  opacity: 0.8;
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
  
  .wrapper {
    width: 100%;
    height: 100%;
  }
</style>
