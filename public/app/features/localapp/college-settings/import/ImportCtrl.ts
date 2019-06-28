export class ImportCtrl {
  navModel: any;
  query: any;
  activeTabIndex = 0;
  $scope: any;
  /** @ngInject */
  constructor($scope) {
    this.activeTabIndex = 0;
    this.query = '';
    this.$scope = $scope;
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  navigateToPage(page) {
    // this.getLocations();
  }
}
