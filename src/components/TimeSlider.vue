<script>
    const timeDiff = (fromTime, toTime) =>
      (toTime.getTime() - fromTime.getTime()) / 10000;
    import TimeChart, {buildChartData, chartOptions} from './TimeChart.js';
    import Icon from 'vue-awesome'
    import isequal from 'lodash.isequal';
    import { eventBus } from '../main';

    export default {
    name: 'TimeSlider',
    components: {
      TimeChart,
      Icon
    },
    props: {
      transactions: Array,
      startTime: Date,
      endTime: Date,
      minAmount: Number,
      maxAmount: Number,
    },
    methods: {
      updateInterval() {
        if (this.interval) {
          window.clearInterval(this.interval);
        }

        this.interval = window.setInterval(() => {
          if (this.playing) {
            this.currentPosition += 1;

            if (this.currentPosition === this.transactions.length) {
              this.playing = false;
              this.currentPosition = this.transactions.length - 1;
            } else {
              this.currentTime = this.transactions[this.currentPosition].timestamp;
            }
            
            const currentTransactions = this.transactions.filter(t => t.timestamp <= this.currentTime);
            this.emitNewEvents(currentTransactions);
          }
        }, this.incrementDelay * 1000);
      },
      playPause() {
        this.playing = !this.playing;
      },
      reduceSpeed() {
        this.playSpeed /= 2;
        this.incrementDelay = Math.min(this.incrementDelay * 2, 4);
        this.updateInterval();
      },
      increaseSpeed() {
        this.playSpeed *= 2;
        this.incrementDelay = Math.max(this.incrementDelay / 2, 0.25);
        this.updateInterval();
      },
      setTimeFromLocation(event) {
        const xPos = event.x - this.left - 26;
        this.currentPosition = Math.round(xPos / this.widthPerItem);
        this.currentTime = this.transactions[this.currentPosition].timestamp;
      },
      emitNewEvents(currentTransactions) {
        eventBus.$emit('newEvents', currentTransactions);
      },
    },
    data() {
      return {
        incrementDelay: 1,
        playSpeed: 1,
        widthIncrement: 0,
        widthPerItem: 0,
        width: 0,
        left: 0,
        playing: false,
        currentTime: 0,
        currentPosition: 0,
        interval: null,
        chartOptions,
      }
    },
    mounted() {
      const rect = this.$refs.timetrack.getBoundingClientRect();
      this.width = rect.width - 36 - 20;
      this.left = rect.left;
      this.widthPerItem = Math.floor((this.width + 26) / (this.transactions.length - 1));

      this.updateInterval();
    },
    computed: {
      chartData() {
        return buildChartData(this.transactions)
      },
    }
  }
</script>

<template>
    <div class="time-slider">
        <div class="actions">
            <span @click="playPause">
                <icon :name="playing ? 'pause' : 'play'" scale="2"
                      :style="{marginRight: playing ? 0 : -5}"
    
                />
            </span>
            <div class="speed-actions">
                <span @click="reduceSpeed">
                    <icon name="backward" />
                </span>
                <span>{{ playSpeed }}x</span>
                <span @click="increaseSpeed">
                    <icon name="forward" />
                </span>
            </div>
        </div>
        <div
                class="time-track"
                @click="setTimeFromLocation"
                ref="timetrack">
            <div class="track-background">
                <time-chart
                        class="time-chart"
                        :options="chartOptions"
                        :chart-data=chartData
                ></time-chart>
            </div>
            <div class="track-foreground"></div>
            <div class="handle" :style="{left: ((currentPosition * widthPerItem) + 26)+'px'}"></div>
        </div>
    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .time-slider {
        display: flex;
        width: 100%;
        height: 20vh;
        margin: 0 auto;
        align-items: center;
        box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.75);
        z-index: 99;
    }

    .actions {
        display: inline-flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        justify-content: space-around;
        color: white;
        width: 80px;
    }

    .time-track {
        width: calc(100% - 60px);
        height: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: stretch;
        position: relative;
    }

    .track-background {
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .handle {
        border-left: 1px solid #5e7db4;
        background: transparent;
        width: 1px;
        height: 100%;
        position: absolute;
        cursor: pointer;
    }

    .time-chart {
        height: 100%;
    }

    .actions svg {
        display: block;
        cursor: pointer;
        flex-grow: 1;
        padding: 10px;
    }

    .speed-actions {
        display: flex;
        cursor: pointer;
        flex-grow: 1;
        align-items: center;
    }
    
    .speed-actions :nth-child(2) {
        font-weight: bold;
        margin-bottom: 2px;
        width: 30px;
        text-align: center;
    }

    .speed-actions :first-child {
        padding-left: 5px;
    }
    
    .speed-actions :last-child {
        padding-right: 5px;
    }

</style>
