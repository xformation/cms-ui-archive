import { config } from '../../config';

export class PaymentCtrl {
  navModel: any;
  query: any;
  activeTabIndex = 0;
  $scope: any;
  msg: any;
  providerURl: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    this.query = '';
    this.$scope = $scope;
    this.providerURl = 'https://uat.billdesk.com/pgidsk/PGIMerchantPayment';
    //'https://uat.billdesk.com/pgidsk/PGIMerchantRequestHandler';
    $scope.doPayment = () => {
      if (!$scope.paymentForm.$valid) {
        alert('Please enter amount to pay');
        return;
      }
      this.getMessage($scope.pmt.amount);
    };
    $scope.create = () => {
      if (!$scope.paymentForm.$valid) {
        alert('Please enter amount to pay');
        return;
      }
      this.getMessage($scope.pmt.amount);
    };
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  getMessage(amt: any) {
    this.backendSrv.get(config.PAYMENT_MSG_URL + '/' + amt).then(result => {
      console.log(result);
      console.log('redirecting to payment gateway');
      window.location.href = this.providerURl + '?msg=' + result.statusDesc;
    });
  }

  navigateToPage(page) {}
}
