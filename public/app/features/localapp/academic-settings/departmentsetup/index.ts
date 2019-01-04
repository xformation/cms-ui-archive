import coreModule from 'app/core/core_module';
import { DepartmentSetupCtrl } from './DepartmentSetupCtrl';

export function departmentSetup() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/localapp/academic-settings/departmentsetup/partials/department_setup.html',
    controller: DepartmentSetupCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    transclude: true,
    scope: { dashboard: '=' },
  };
}

coreModule.directive('departmentSetup', departmentSetup);
