import coreModule from 'app/core/core_module';
import { RolesCtrl } from './RolesCtrl';
export function roles() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/localapp/roles-permissions/roles/partials/roles.html',
        controller: RolesCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        transclude: true,
        scope: { dashboard: '=' },
    };
}
coreModule.directive('roles', roles);
//# sourceMappingURL=index.js.map