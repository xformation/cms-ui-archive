export class BarEditorCtrl {
  panel: any;
  panelCtrl: any;
  totalDataSets: any;
  dataSetInfo: any;
  chartTitle: any;
  xAxisLabel: any;
  yAxisLabel: any;
  valueLessThan: any;
  valueLessThanColor: any;
  /** @ngInject */
  constructor($scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.totalDataSets = this.panel.totalDataSets;
    this.dataSetInfo = this.panel.dataSetInfo;
    this.chartTitle = this.panel.chartTitle;
    this.xAxisLabel = this.panel.xAxisLabel;
    this.yAxisLabel = this.panel.yAxisLabel;
    this.valueLessThan = this.panel.valueLessThan;
    this.valueLessThanColor = this.panel.valueLessThanColor;
  }

  setDataSetInfo() {
    if (this.dataSetInfo.length < this.totalDataSets) {
      const diffLength = this.totalDataSets - this.dataSetInfo.length;
      for (let i = 0; i < diffLength; i++) {
        this.dataSetInfo.push({});
      }
    } else {
      this.dataSetInfo.length = this.totalDataSets;
    }
    this.panel.dataSetInfo = this.dataSetInfo;
  }

  onChangeTotalDataSets() {
    this.setDataSetInfo();
    this.panel.totalDataSets = this.totalDataSets;
  }

  onChangeChartTitle() {
    this.panel.chartTitle = this.chartTitle;
  }

  onChangeXAxisLabel() {
    this.panel.xAxisLabel = this.xAxisLabel;
  }

  onChangeYAxisLabel() {
    this.panel.yAxisLabel = this.yAxisLabel;
  }

  onChangeDataSetInfo() {
    this.panel.dataSetInfo = this.dataSetInfo;
  }

  render() {
    this.panelCtrl.reConfigChart();
  }

  onChangeLessThanValue() {
    this.panel.valueLessThan = this.valueLessThan;
  }

  onChangeLessThanValueColor() {
    this.panel.valueLessThanColor = this.valueLessThanColor;
  }
}

/** @ngInject */
export function analyticsEditor($q, uiSegmentSrv) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/app/plugins/panel/bargraph/partials/editor.html',
    controller: BarEditorCtrl,
  };
}
