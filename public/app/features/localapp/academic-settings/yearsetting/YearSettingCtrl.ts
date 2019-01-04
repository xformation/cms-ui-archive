export class YearSettingCtrl {
  navModel: any;
  activeTabIndex = 0;
  $scope;
  /** @ngInject */
  constructor($scope) {
    this.activeTabIndex = 0;
    this.$scope = $scope;
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }
}
