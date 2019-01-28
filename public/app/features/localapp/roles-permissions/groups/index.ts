import coreModule from 'app/core/core_module';
import { GroupsCtrl } from './GroupsCtrl';

export function groups() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/localapp/roles-permissions/groups/partials/groups.html',
    controller: GroupsCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    transclude: true,
    scope: { dashboard: '=' },
  };
}

coreModule.directive('groups', groups);
