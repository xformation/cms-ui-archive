import _ from 'lodash';

export class BadgeEditorCtrl {
  panel: any;
  panelCtrl: any;
  totalBadges: any;

  /** @ngInject */
  constructor($scope) {
    this.totalBadges = 1;
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
  }

  onChangeTotalBadges() {
    this.panel.totalBadges = this.totalBadges;
    this.render();
  }

  render() {
    this.panelCtrl.render();
  }
}

/** @ngInject */
export function badgeEditor($q, uiSegmentSrv) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/app/plugins/panel/badge/partials/editor.html',
    controller: BadgeEditorCtrl,
  };
}
