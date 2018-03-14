<script>
    const timeDiff = (fromTime, toTime) =>
      (toTime.getTime() - fromTime.getTime()) / 10000;
    import TimeChart, {buildChartData, chartOptions} from './TimeChart.js';
    import Icon from 'vue-awesome'
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
      playPause() {
        this.playing = !this.playing;
      },
      setTimeFromLocation(event) {
        const xPos = event.x - this.$refs.timetrack.getBoundingClientRect().x - 35;
        this.currentTime = Math.floor(Math.min(
          Math.max(0, xPos),
          this.$refs.timetrack.getBoundingClientRect().width - 50
        ) / this.widthIncrement);
      }
    },
    data() {
      return {
        widthIncrement: 1,
        playing: false,
        currentTime: 0,
        chartOptions,
      }
    },
    created() {
      this.timeSpan = timeDiff(this.startTime, this.endTime);
    },
    mounted() {
      const rect = this.$refs.timetrack.getBoundingClientRect();
      const adjustedWidth = rect.width - 36 - 20;
      this.widthIncrement = adjustedWidth / this.timeSpan; // divide by time span
      
      window.setInterval(() => {
        if (this.playing) {
          this.currentTime = Math.min(this.currentTime + 10, this.timeSpan);
          if (this.currentTime > this.timeSpan) {
            this.playing = false;
          }
          const offsetTime = 10000 * this.timeSpan * ((this.currentTime * this.widthIncrement) / rect.width);
          const actualTime = new Date(this.startTime.getTime() + offsetTime);
          // console.log(actualTime, '/', this.timeSpan)
        }
      }, 250);
    },
      computed: {
        chartData() {
          return buildChartData(this.transactions)
        },
        // filteredEvents() {
        //   // return this.transactions.filter(t => t.eventTime < )
        // }
      }
  }
</script>

<template>
    <div class="time-slider">
        <div class="actions" @click="playPause">
            <icon :name="playing ? 'pause' : 'play'" scale="2"
                  :style="{marginRight: playing ? 0 : -5}"
            />
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
            <div class="handle" :style="{left: (36 + this.widthIncrement * this.currentTime)+'px'}"></div>
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
        box-shadow: 0px -2px 6px 0px rgba(0,0,0,0.75);
        z-index: 99;
    }

    .actions {
        height: 50px;
        width: 50px;
        display: inline-flex;
        position: relative;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 2px solid white;
        color: white;
        margin-left: 10px;
        cursor: pointer;
    }

    .time-track {
        width: calc(100% - 60px);
        margin-left: 10px;
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
        border-left: 1px solid #4654a0;
        background: transparent;
        width: 1px;
        height: 100%;
        position: absolute;
        cursor: pointer;
    }
    
    .time-chart {
        height: 100%;
    }

</style>
