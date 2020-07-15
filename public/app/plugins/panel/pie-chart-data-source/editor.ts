import _ from 'lodash';

export class PieEditorCtrl {
  panel: any;
  panelCtrl: any;
  label: any;
  regex: any;
  caseSensitive: any;
  global: any;
  /** @ngInject */
  constructor($scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.label = this.panelCtrl.panel.label;
    this.regex = this.panelCtrl.panel.regex;
    this.global = this.panelCtrl.panel.global;
    this.caseSensitive = this.panelCtrl.panel.caseSensitive;
    this.panel = this.panelCtrl.panel;
  }

  onChangeLabel() {
    this.panel.label = this.label;
  }

  onChangeRegex() {
    this.panel.regex = this.regex;
  }

  onChangeGlobal() {
    this.panel.global = this.global;
  }

  onChangeCaseSensitive() {
    this.panel.caseSensitive = this.caseSensitive;
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
