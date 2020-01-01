import _ from 'lodash';

export class BadgeEditorCtrl {
  panel: any;
  panelCtrl: any;
  totalBadges: any;
  badgesInfo: any;
  /** @ngInject */
  constructor($scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.totalBadges = this.panel.totalBadges;
    this.badgesInfo = this.panel.badgesInfo;
  }

  setBadgeInfo() {
    if (this.badgesInfo.length < this.totalBadges) {
      const diffLength = this.totalBadges - this.badgesInfo.length;
      for (let i = 0; i < diffLength; i++) {
        this.badgesInfo.push({
          headerKey: '',
          info1Label: '',
          info1Key: '',
          info2Label: '',
          info2Key: '',
          info3Label: '',
          info3Key: '',
          info4Label: '',
          info4Key: '',
        });
      }
    } else {
      this.badgesInfo.length = this.totalBadges;
    }
    this.panel.badgesInfo = this.badgesInfo;
  }

  onChangeTotalBadges() {
    this.setBadgeInfo();
    this.panel.totalBadges = this.totalBadges;
    this.render();
  }

  onChangeBadgeInfo() {
    this.panel.badgesInfo = this.badgesInfo;
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
