import Chart from 'chart.js';
export class AnalyticsRenderer {
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
      type: 'line',
      data: dataSets,
      options: {
        responsive: true,
        title: {
          display: true,
          text: this.panel.chartTitle,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.panel.xAxisLabel,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.panel.yAxisLabel,
              },
            },
          ],
        },
      },
    };
  }

  createDataSet(responseData) {
    if (!responseData) {
      return {};
    }
    const retData: any = {};
    const tempData = [];
    const { bar, line, labels } = responseData;
    retData.labels = labels;
    const { dataSetInfo, lineDataSetInfo } = this.panel;
    tempData.push({
      type: 'line',
      label: lineDataSetInfo.label,
      borderColor: lineDataSetInfo.borderColor,
      borderWidth: 2,
      fill: false,
      data: line,
    });
    tempData.push({
      type: 'bar',
      label: dataSetInfo.label,
      borderColor: dataSetInfo.borderColor,
      backgroundColor: dataSetInfo.backgroundColor,
      borderWidth: 2,
      data: bar,
      fill: dataSetInfo.fill || false,
    });
    retData.datasets = tempData;
    return retData;
  }

  createChart(isLoading, responseData, ctx) {
    if (isLoading) {
      // retHtml +=
      //     '<div class="badge-conainer badge-data-loading query-transaction--loading">Your data is loading....</div>';
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
