export class DoughnutEditorCtrl {
  panel: any;
  panelCtrl: any;
  totalDataSets: any;
  dataSetInfo: any;
  chartTitle: any;
  backgroundColor: any;
  /** @ngInject */
  constructor($scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.totalDataSets = this.panel.totalDataSets;
    this.dataSetInfo = this.panel.dataSetInfo;
    this.chartTitle = this.panel.chartTitle;
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

  onChangeDataSetInfo() {
    this.panel.dataSetInfo = this.dataSetInfo;
  }

  render() {
    this.panelCtrl.reConfigChart();
  }
}

/** @ngInject */
export function doughnutEditor($q, uiSegmentSrv) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/app/plugins/panel/doughnut/partials/editor.html',
    controller: DoughnutEditorCtrl,
  };
}
