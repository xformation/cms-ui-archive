import Chart from 'chart.js';
export class DoughnutRenderer {
  // MONTHS = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ];
  constructor(private panel) {
    // this.initConfig();
  }
  randomScalingFactor() {
    return Math.floor(Math.random() * 100);
  }
  config = {};
  chart = null;

  initConfig(responseData) {
    const dataSets = this.createDataSet(responseData);
    this.config = {
      type: 'doughnut',
      data: dataSets,
      options: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: this.panel.chartTitle,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const index = tooltipItem.index;
              if (dataset.labels[index]) {
                return dataset.labels[index] + ': ' + dataset.data[index];
              } else {
                // const whitePercent= 100-dataset.data[index];
                return 'white' + ': ' + dataset.data[index];
              }
            },
          },
        },
      },
    };
  }

  createDataSet(responseData) {
    if (!responseData) {
      return {};
    }
    const retData = {
      datasets: [],
      labels: ['Orange', 'Red'],
    };
    // const length = responseData.dataSets.length;
    const length =
      responseData.dataSets.length > this.panel.dataSetInfo.length
        ? this.panel.dataSetInfo.length
        : responseData.dataSets.length;
    for (let i = 0; i < length; i++) {
      retData.datasets.push({
        data: [responseData.dataSets[i].data, 100 - responseData.dataSets[i].data],
        backgroundColor: [this.panel.dataSetInfo[i].backgroundColor, 'transparent'],
        labels: [responseData.dataSets[i].label],
      });
    }
    return retData;
  }

  createChart(isLoading, responseData, ctx) {
    if (isLoading) {
    } else {
      if (this.chart) {
        this.chart.update();
      } else {
        this.initConfig(responseData);
        this.chart = new Chart(ctx, this.config);
      }
    }
  }

  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = null;
  }
}
