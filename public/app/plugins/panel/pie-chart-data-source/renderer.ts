import Chart from 'chart.js';
export class PieRenderer {
  constructor(private panel) {
    // this.initConfig();
  }
  randomScalingFactor() {
    return Math.floor(Math.random() * 100);
  }
  chart = null;
  initConfig(responseData) {
    const dataSets = this.manipulateData(responseData);
    return {
      type: 'pie',
      data: dataSets,
      options: {
        responsive: true,
        title: {
          display: true,
          text: this.panel.label,
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

  manipulateData(responseData: any) {
    const retData: any = {};
    const dataSets = {
      data: [],
      label: this.panel.label,
      backgroundColor: ['rgb(54, 162, 235)', 'rgb(75, 192, 192)', 'rgb(201, 203, 207)', 'rgb(255, 159, 64)'],
    };
    const labels = [];
    for (let i = 0; i < responseData.length; i++) {
      dataSets.data.push(responseData[i].datapoints[0][0]);
      let target = responseData[i].target;
      if (this.panel.regex) {
        const flags = (this.panel.caseSensitive ? '' : 'i') + (this.panel.global ? 'g' : '');
        const regex = new RegExp(this.panel.regex, flags);
        target = target.replace(regex, '');
      }
      labels.push(target.trim());
    }
    retData.datasets = [dataSets];
    retData.labels = labels;
    return retData;
  }

  createChart(isLoading, responseData, ctx) {
    if (isLoading) {
    } else {
      if (this.chart) {
        this.chart.update();
      } else {
        const config = this.initConfig(responseData);
        this.chart = new Chart(ctx, config);
      }
    }
  }

  destroyChart() {
    this.chart.destroy();
    this.chart = null;
  }
}
