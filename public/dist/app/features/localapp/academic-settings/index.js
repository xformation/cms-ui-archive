import { AcademicSettingsCtrl } from './AcademicSettingsCtrl';
import coreModule from 'app/core/core_module';
export function academicSettings() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/localapp/academic-settings/partials/academic_settings.html',
        controller: AcademicSettingsCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        transclude: true,
        scope: { dashboard: '=' },
    };
}
coreModule.directive('academicSettings', academicSettings);
//# sourceMappingURL=index.js.map