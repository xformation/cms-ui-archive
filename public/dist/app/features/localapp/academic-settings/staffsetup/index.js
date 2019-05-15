import coreModule from 'app/core/core_module';
import { StaffSetupCtrl } from './StaffSetupCtrl';
export function staffSetup() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/localapp/academic-settings/staffsetup/partials/staff_setup.html',
        controller: StaffSetupCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        transclude: true,
        scope: { dashboard: '=' },
    };
}
coreModule.directive('staffSetup', staffSetup);
//# sourceMappingURL=index.js.map