import Chart from 'chart.js';
export class BarRenderer {
  MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
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
      type: 'bar',
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
    const { dataSets, labels } = responseData;
    retData.labels = labels;
    const { dataSetInfo, valueLessThan, valueLessThanColor } = this.panel;
    const length = dataSets.length > dataSetInfo.length ? dataSetInfo.length : dataSets.length;
    for (let i = 0; i < length; i++) {
      const dataSet = dataSets[i];
      const info = dataSetInfo[i];
      let backgroundColor = info.backgroundColor;
      let borderColor = info.borderColor;
      if (valueLessThan && valueLessThanColor) {
        backgroundColor = [];
        borderColor = [];
        for (let j = 0; j < dataSet.length; j++) {
          if (parseFloat(dataSet[j]) < parseFloat(valueLessThan)) {
            backgroundColor.push(valueLessThanColor);
            borderColor.push(valueLessThanColor);
          } else {
            backgroundColor.push(info.backgroundColor);
            borderColor.push(info.borderColor);
          }
        }
      }
      tempData.push({
        label: info.label,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        data: dataSet,
        borderWidth: 1,
      });
    }
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
