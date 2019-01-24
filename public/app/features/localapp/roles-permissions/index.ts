import { RolesPerissionsCtrl } from './RolesPermissionsCtrl';
import coreModule from 'app/core/core_module';

export function rolesPermissions() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/localapp/roles-permissions/partials/roles_permissions.html',
    controller: RolesPerissionsCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    transclude: true,
    scope: { dashboard: '=' },
  };
}

coreModule.directive('rolesPermissions', rolesPermissions);
