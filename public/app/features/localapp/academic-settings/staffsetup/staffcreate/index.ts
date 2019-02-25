import coreModule from 'app/core/core_module';
import { StaffCreateCtrl } from './StaffCreateCtrl';

export function staffCreate() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/localapp/academic-settings/staffsetup/staffcreate/partials/staff_create.html',
    controller: StaffCreateCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    transclude: true,
    scope: { dashboard: '=' },
  };
}

coreModule.directive('staffCreate', staffCreate);
