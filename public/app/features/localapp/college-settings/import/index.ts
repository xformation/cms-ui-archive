import coreModule from 'app/core/core_module';
import { ImportCtrl } from './ImportCtrl';

export function fileimport() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/localapp/college-settings/import/partials/import.html',
    controller: ImportCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    transclude: true,
    scope: { dashboard: '=' },
  };
}

coreModule.directive('import', fileimport);
