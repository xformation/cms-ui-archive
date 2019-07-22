import coreModule from 'app/core/core_module';
import { PaymentCtrl } from './PaymentCtrl';

export function payment() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/localapp/college-settings/payment/partials/payment.html',
    controller: PaymentCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    transclude: true,
    scope: { dashboard: '=' },
  };
}

coreModule.directive('payment', payment);
