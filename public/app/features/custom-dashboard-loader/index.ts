import { CustomLoader } from './CustomLoader';
import coreModule from 'app/core/core_module';

export function customDashboardLoader() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/custom-dashboard-loader/partials/custom_loader.html',
    controller: CustomLoader,
    bindToController: true,
    controllerAs: 'ctrl',
    transclude: true,
    scope: {
      slug: '@',
      uid: '@',
    },
  };
}

coreModule.directive('customDashboardLoader', customDashboardLoader);
