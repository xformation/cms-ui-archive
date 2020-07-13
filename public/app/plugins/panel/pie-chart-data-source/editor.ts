import _ from 'lodash';

export class PieEditorCtrl {
  panel: any;
  panelCtrl: any;
  label: any;
  /** @ngInject */
  constructor($scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.label = this.panelCtrl.panel.label;
    this.panel = this.panelCtrl.panel;
  }

  onChangeLabel() {
    this.panel.label = this.label;
  }

  render() {
    this.panelCtrl.reConfigChart();
  }

  // getData() {
  //   this.panelCtrl.getData();
  // }
}

/** @ngInject */
export function pieEditor($q, uiSegmentSrv) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/app/plugins/panel/pie-chart-data-source/partials/editor.html',
    controller: PieEditorCtrl,
  };
}
