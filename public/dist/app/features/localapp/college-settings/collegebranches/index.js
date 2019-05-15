import coreModule from 'app/core/core_module';
import { CollegeBranchesCtrl } from './CollegeBranchesCtrl';
export function college() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/localapp/college-settings/collegebranches/partials/college_branches.html',
        controller: CollegeBranchesCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        transclude: true,
        scope: { dashboard: '=' },
    };
}
coreModule.directive('college', college);
//# sourceMappingURL=index.js.map