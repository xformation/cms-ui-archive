import coreModule from 'app/core/core_module';
import { StaffListCtrl } from './StaffListCtrl';

export function staffList() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/localapp/academic-settings/staffsetup/stafflist/partials/staff_list.html',
    controller: StaffListCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    transclude: true,
    scope: { dashboard: '=' },
  };
}

coreModule.directive('staffList', staffList);
