import _ from 'lodash';

export class PaymentResponseAppCtrl {
  pmtMsg: any;
  txnRefNo: any;
  txnStatus: any;
  txnAmt: any;
  txnDate: any;
  /** @ngInject */
  constructor(private $rootScope) {
    this.$rootScope.onAppEvent('$routeUpdate', 0);
    const parameters = new URLSearchParams(window.location.search);
    this.txnAmt = parameters.get('txnAmt');
    this.txnRefNo = parameters.get('txnRefNo');
    const statusCode = parameters.get('txnStatus');
    this.txnDate = parameters.get('txnDate').replace('~', ' ');
    console.log('status code : ', statusCode);
    this.txnStatus = 'Transaction successful';
    if (statusCode !== '0300') {
      this.txnStatus = 'Transaction failed';
    }
  }
}
