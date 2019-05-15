import coreModule from 'app/core/core_module';
import { UsersCtrl } from './UsersCtrl';
export function users() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/localapp/roles-permissions/users/partials/users.html',
        controller: UsersCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        transclude: true,
        scope: { dashboard: '=' },
    };
}
coreModule.directive('users', users);
//# sourceMappingURL=index.js.map