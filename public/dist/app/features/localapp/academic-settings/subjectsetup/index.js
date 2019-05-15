import coreModule from 'app/core/core_module';
import { SubjectSetupCtrl } from './SujbectSetupCtrl';
export function subjectSetup() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/localapp/academic-settings/subjectsetup/partials/subject_setup.html',
        controller: SubjectSetupCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        transclude: true,
        scope: { dashboard: '=' },
    };
}
coreModule.directive('subjectSetup', subjectSetup);
//# sourceMappingURL=index.js.map