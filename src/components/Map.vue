<template>
  <div class="card card-map">
    <div class="header">
      <h4 class="title">Google Maps</h4>
    </div>
    <div class="map">
      <gmap-map
        :center="center"
        :zoom="7"
        :options="{styles: mapStyles}"
        ref="map"
      >
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />
      </gmap-map>
    </div>
  </div>
</template>

<script>
import * as VueGoogleMaps from "vue2-google-maps";
import { loaded } from "vue2-google-maps";
import Vue from "vue";
import providers from "../providers";
import mapStyles from '../config/mapStyles'

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBRFyLekDBT0Zh0fF0I2zpcto38orRJ5OA"
    // libraries: 'places', //// If you need to use place input
  }
});

export default {
  data() {
    const mapConfig = providers.reduce((currentConfig, provider) => {
      const providerConfig = provider(currentConfig);
      return {
        ...currentConfig,
        ...providerConfig,
        markers: [
          ...(currentConfig.markers || []),
          ...(providerConfig.markers || [])
        ]
      };
    }, {});
    return mapConfig;
  },
  mounted() {
    const map = this.$refs.map;
    loaded.then(() => {
      // let trafficLayer = new google.maps.TrafficLayer();
      let transitLayer = new google.maps.TransitLayer();
      map.$mapCreated.then(theMap => {
        // trafficLayer.setMap(theMap);
        transitLayer.setMap(theMap);
      });
    });
  },
  computed: {
    mapStyles() {
      return mapStyles;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
