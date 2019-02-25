import coreModule from 'app/core/core_module';
import { StaffProfileCtrl } from './StaffProfileCtrl';

export function staffProfile() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/localapp/academic-settings/staffsetup/staffprofile/partials/staff_profile.html',
    controller: StaffProfileCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    transclude: true,
    scope: { dashboard: '=' },
  };
}

coreModule.directive('staffProfile', staffProfile);
