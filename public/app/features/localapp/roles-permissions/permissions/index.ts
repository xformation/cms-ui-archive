import coreModule from 'app/core/core_module';
import { PermissionsCtrl } from './PermissionsCtrl';

export function permissions() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/localapp/roles-permissions/permissions/partials/permissions.html',
    controller: PermissionsCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    transclude: true,
    scope: { dashboard: '=' },
  };
}

coreModule.directive('permissions', permissions);
