import _ from 'lodash';

export class PieEditorCtrl {
  panel: any;
  panelCtrl: any;
  /** @ngInject */
  constructor($scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
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
