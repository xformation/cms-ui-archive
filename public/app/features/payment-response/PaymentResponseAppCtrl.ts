import _ from 'lodash';

export class PaymentResponseAppCtrl {
  constructor(private $rootScope) {
    this.$rootScope.onAppEvent('$routeUpdate', 0);
  }
}
