import coreModule from 'app/core/core_module';
import { DepartmentSettingsCtrl } from './DepartmentSettingsCtrl';
export function department() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/localapp/college-settings/departmentsettings/partials/department_settings.html',
        controller: DepartmentSettingsCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        transclude: true,
        scope: { dashboard: '=' },
    };
}
coreModule.directive('department', department);
//# sourceMappingURL=index.js.map