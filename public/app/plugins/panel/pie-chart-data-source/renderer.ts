import Chart from 'chart.js';
export class PieRenderer {
  constructor() {
    // this.initConfig();
  }
  randomScalingFactor() {
    return Math.floor(Math.random() * 100);
  }
  charts = [];
  initConfig(responseData) {
    const dataSets = this.createDataSet(responseData);
    return {
      type: 'pie',
      data: dataSets,
      options: {
        responsive: true,
        title: {
          display: true,
          text: responseData.label,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
      },
    };
  }

  createDataSet(responseData) {
    if (!responseData) {
      return {};
    }
    const retData: any = {};
    const { label, data, dataLabels } = responseData;
    retData.datasets = [
      {
        data: data,
        label: label,
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(75, 192, 192)', 'rgb(201, 203, 207)', 'rgb(255, 159, 64)'],
      },
    ];
    retData.labels = dataLabels;
    return retData;
  }

  createChart(isLoading, responseData, parentElement) {
    if (isLoading) {
      // retHtml +=
      //     '<div class="badge-conainer badge-data-loading query-transaction--loading">Your data is loading....</div>';
    } else {
      if (this.charts && this.charts.length > 0) {
        const length = this.charts.length;
        for (let i = 0; i < length; i++) {
          this.charts[i].update();
        }
      } else {
        const length = responseData.length;
        if (responseData && responseData.length > 0) {
          const length = responseData.length;
          let canvasHTML = '';
          for (let i = 0; i < length; i++) {
            canvasHTML += "<canvas class='pie-chart pie-chart-" + i + "'></canvas>";
          }
          parentElement.html(canvasHTML);
        }
        for (let i = 0; i < length; i++) {
          const canvas = parentElement.find('.pie-chart-' + i)[0];
          const ctx = canvas.getContext('2d');
          const config = this.initConfig(responseData[i]);
          this.charts.push(new Chart(ctx, config));
        }
      }
    }
  }

  destroyChart() {
    const length = this.charts.length;
    for (let i = 0; i < length; i++) {
      this.charts[i].destroy();
    }
    this.charts = [];
  }
}
