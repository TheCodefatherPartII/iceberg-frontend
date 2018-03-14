import {Line, mixins} from 'vue-chartjs'
const pad = (val) => (val > 9 ? '' : '0')+val
const formatDate = (date) =>
  `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  // `${pad(date.getDay())}/${pad(date.getMonth())}/${date.getFullYear()}`
export const chartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      gridLines: {
        display: false,
      },
      ticks: {
        fontSize: 8,
        lineHeight: 0.2,
      }
    }],
    yAxes: [{
      gridLines: {
        display: false,
      },
      ticks: {
        fontSize: 8,
        lineHeight: 0.5,
      }
    }]
  },
  borderWidth: 1,
  elements: {
    point: {
      radius: 0,
    }
  },
  gridLines: {
    display: false,
    drawOnChartArea: false,
  }
};

export const buildChartData = (events) => {
  return {
    labels: events.map(e => formatDate(e.timestamp)),
    datasets: [
      {
        label: 'Deposits',
        backgroundColor: 'rgba(234, 118, 72, 0.5)',
        borderColor: 'rgba(234, 118, 72, 0.9)',
        borderWidth: 1,
        lineTension: 0.1,
        data: events.map(e => e.amount).map(a => a < 0 ? 0 : a)
      },
      {
        label: 'Withdrawals',
        backgroundColor: 'rgba(123, 245, 74, 0.5)',
        borderColor: 'rgba(123, 245, 74, 0.9)',
        borderWidth: 1,
        lineTension: 0.1,
        data: events.map(e => e.amount).map(a => a >= 0 ? 0 : Math.abs(a))
      },
    ]
  }
}

export default {
  name: 'TimeChart',
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options)
  }
}