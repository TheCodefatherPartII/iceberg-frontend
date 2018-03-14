<template>
  <div class="map-container">
    <div class="google-map wrapper">
      <gmap-map
              class="wrapper"
        :center="center"
        :zoom="15"
        :options="{
          styles: mapStyles,
          mapTypeControlOptions: {
            mapTypeIds: []
          },
        }"
        ref="map"
      >
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="false"
          :animation=2
          :icon="{url:'https://image.ibb.co/dsuOVH/google_map_icon_google_maps_icon_blank_md.png'}"
          @click="center=m.position"
        ></gmap-marker>
      </gmap-map>
    </div>
    <div class="overlay-menu">
      <div class="overlay-menu-header">
        <span>Criminal Doe</span>
        <br />
        <span>23423434234234</span>
        <br />
        <br />
      </div>
      <div class="overlay-menu-controls">
        <span>23 March 2018</span>
        <br>
        <br>
        <div class="overlay-menu-controls-checkboxes">
          <label><input type="checkbox" name="crime" value="fin">&nbsp;Financial Activity</label><br>
          <label><input type="checkbox" name="crime" value="geo">&nbsp;Geographic Location</label><br>
          <label><input type="checkbox" name="crime" value="social">&nbsp;Interpersonal Network</label><br>
          <label><input type="checkbox" name="crime" value="social">&nbsp;Social Media Activity Location</label><br>
          <label><input type="checkbox" name="crime" value="social">&nbsp;Check-ins</label><br>
          <label><input type="checkbox" name="crime" value="social">&nbsp;Suspicious Persons on Network</label><br>
        </div>
        <br>
      </div>
      <div class="overlay-menu-footer">
        <span>Deposits</span><br>
        <span>Withdraws</span><br>
        <span>Geographic location</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as VueGoogleMaps from "vue2-google-maps";
import { loaded } from "vue2-google-maps";
import Vue from "vue";
import providers from "../providers";
import mapStyles from "../config/mapStyles";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBRFyLekDBT0Zh0fF0I2zpcto38orRJ5OA"
    // libraries: 'places', //// If you need to use place input
  }
});

// Hold the map markers.
var mapMarkers;
const drawTrafficLater = map => {
  // let trafficLayer = new google.maps.TrafficLayer();
  // trafficLayer.setMap(map);
  const transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);
  const bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map);
};
const joinMarkers = (map, pathPoints) => {
  var lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
  };
  var pathPoints = mapMarkers.map(marker => {
    return marker.position;
  });
  var path = new google.maps.Polyline({
    path: pathPoints,
    geodesic: true,
    strokeColor: "#FFFFFF",
    strokeOpacity: 1.0,
    strokeWeight: 5,
    icons: [
      {
        icon: lineSymbol,
        offset: "100%"
      }
    ]
  });
  path.setMap(map);
  animateLineMarker(path);
};

function animateLineMarker(line) {
  var count = 0;
  window.setInterval(function() {
    count = (count + 1) % 200;
    var icons = line.get("icons");
    icons[0].offset = count / 2 + "%";
    line.set("icons", icons);
  }, 20);
}

export default {
  data() {
    const mapConfig = providers.reduce((currentConfig, provider) => {
      const providerConfig = provider(currentConfig);
      mapMarkers = [
        ...(currentConfig.markers || []),
        ...(providerConfig.markers || [])
      ];
      return {
        ...currentConfig,
        ...providerConfig,
        markers: mapMarkers
      };
    }, {});
    return mapConfig;
  },
  mounted() {
    const map = this.$refs.map;
    loaded.then(() => {
      // After map is loaded.
      map.$mapCreated.then(theMap => {
        // Add traffic layer.
        drawTrafficLater(theMap);
        // Let's join the markers via path.
        joinMarkers(theMap);
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
  .map-container {
    width: 100%;
    height: calc(100% - 10vh);
  }
</style>
