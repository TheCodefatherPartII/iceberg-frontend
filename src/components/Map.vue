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
    key: "AIzaSyBRFyLekDBT0Zh0fF0I2zpcto38orRJ5OA",
    libraries: 'visualization',
  }
});

const heatMapData = [
  {location: new google.maps.LatLng(-33.924443, 151.156456), weight: 0.5},
  {location: new google.maps.LatLng(-33.924137, 151.156512), weight: 1},
  {location: new google.maps.LatLng(-33.923989, 151.156512), weight: 2},
  {location: new google.maps.LatLng(-33.923244, 151.156422), weight: 2.5},
  new google.maps.LatLng(-33.891553, 151.198384),
  {location: new google.maps.LatLng(-33.914622, 151.165834), weight: 2},
  {location: new google.maps.LatLng(-33.9075952, 151.180907), weight: 3},
  {location: new google.maps.LatLng(-33.900063, 151.185382), weight: 2},
  new google.maps.LatLng(-33.896862, 151.186208),
  {location: new google.maps.LatLng(-33.891555, 151.198656), weight: 0.5},
  {location: new google.maps.LatLng(-33.882062, 151.205801), weight: 3},
  {location: new google.maps.LatLng(-33.881421, 151.207303), weight: 2},
];


// Hold the map markers.
var mapMarkers;
const drawTrafficLater = map => {
  // let trafficLayer = new google.maps.TrafficLayer();
  // trafficLayer.setMap(map);
  const heatmap = new google.maps.visualization.HeatmapLayer({data: heatMapData});
  heatmap.setMap(map);
  const transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);
  // const bikeLayer = new google.maps.BicyclingLayer();
  // bikeLayer.setMap(map);

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
