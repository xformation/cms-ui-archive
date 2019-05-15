import coreModule from 'app/core/core_module';
import { GeneralInfoCtrl } from './GeneralInfoCtrl';
export function generalInfo() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/localapp/college-settings/generalinfo/partials/general_info.html',
        controller: GeneralInfoCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        transclude: true,
        scope: { dashboard: '=' },
    };
}
coreModule.directive('generalInfo', generalInfo);
//# sourceMappingURL=index.js.map