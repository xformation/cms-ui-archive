import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';

export class PaymentCtrl {
  navModel: any;
  query: any;
  activeTabIndex = 0;
  $scope: any;
  RestUrl: any;

  /** @ngInject */
  constructor($scope) {
    this.RestUrl = new GlobalRestUrlConstants();
    this.activeTabIndex = 0;
    this.query = '';
    this.$scope = $scope;
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  navigateToPage(page) {}
}
