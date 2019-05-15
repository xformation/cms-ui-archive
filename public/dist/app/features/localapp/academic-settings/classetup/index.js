import coreModule from 'app/core/core_module';
import { ClassSetupCtrl } from './ClassSetupCtrl';
export function classSetup() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/localapp/academic-settings/classetup/partials/class_setup.html',
        styleUrls: ['public/app/features/localapp/academic-settings/classetup/partials/class_setup.scss'],
        controller: ClassSetupCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        transclude: true,
        scope: { dashboard: '=' },
    };
}
coreModule.directive('classSetup', classSetup);
//# sourceMappingURL=index.js.map