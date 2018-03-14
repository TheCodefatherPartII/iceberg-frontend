<template>
  <div class="wrapper">
    <div class="top">
      <img src="./assets/iceberg-icon.png" width="50" height="auto">
      <div>Project Iceberg</div>
      <div v-if="selectedAccountName" class="flex-end">
        <span>Currently investigating:&nbsp;</span>
        <span class="clickable underline" @click="clearAccount">{{selectedAccountName}}</span>
      </div>
    </div>
    <div class="main-content" v-if="loading">
      <icon name="refresh" scale="3" class="rotate" />
    </div>
    <div class="main-content" v-if="!selectedAccountName && !loading">
      <div class="account-title">Suspicious accounts identified</div>
      <div class="account-subtitle">Select an account to begin investigation</div>
      <ul class="account-selector">
        <li v-for="account in accounts" class="clickable" @click="chooseAccount(account.id, account.name)">
          {{account.name}}
        </li>
      </ul>
    </div>
    <div id="app" class="main-content" v-if="!loading && selectedAccountName">
      <!-- <Map :transactions="transactions"/> -->
      <Map />
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
import api from './api';
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
  methods: {
    clearAccount() {
      this.selectedAccountName = null;
    },
    chooseAccount(id, name) {
      this.loading = true
      api.getTransactionForAccount(id)
        .then(response => {
          this.loading = false
          this.selectedAccountName = name
          this.transactions = response.data.map(t => ({
            timestamp: new Date(t.timestamp),
            amount: parseFloat(t.amount.replace('$', '')),
            lat: parseFloat(t.lat),
            lng: parseFloat(t.lng),
          }))
        });
    }
  },
  data() {
    return {
      loading: true,
      selectedAccountName: '',
      accounts: [],
      transactions: [],
    };
  },
  mounted() {
    api.listAccounts()
      .then(response => {
        this.accounts = response.data
        this.loading = false
      });
  },
  computed: {
    startTime() {
      return new Date(Math.min.apply(Math, this.transactions.map(t => t.timestamp.getTime())))
    },
    endTime() {
      return new Date(Math.max.apply(Math, this.transactions.map(t => t.timestamp.getTime())))
    },
    minAmount() {
      return Math.min.apply(Math, this.transactions.map(t => t.amount))
    },
    maxAmount() {
      return Math.max.apply(Math, this.transactions.map(t => t.amount))
    }
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
.main-content {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 5vh);
}
.top {
  width: calc(100% - 2vw);
  height: 5vh;
  padding: 0 1vw;
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
  
  .account-selector {
    list-style: none;
    width: 25vw;
    margin: 10vh auto 0;
  }
  
  .account-selector li {
    padding: 5px;
    margin: 5px;
    border: 1px solid white;
  }
  
  .account-title {
    font-size: 24px;
    margin: 0 auto;
  }
  
  .account-subtitle {
    font-size: 16px;
    margin: 0 auto;
  }
  
  .flex-end {
    margin-left: auto;
  }

  @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
  .rotate {
    margin: 10vh auto 0;
    animation:spin 1.5s ease-in-out infinite;
  }
  
  .underline {
    text-decoration: underline;
  }
  
  .clickable {
    cursor: pointer;
  }
  
</style>
