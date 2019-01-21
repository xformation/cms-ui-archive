import coreModule from 'app/core/core_module';
import { TimeTableCtrl } from './TimeTableCtrl';

export function timetable() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/localapp/academic-settings/timetable/partials/time_table.html',
    controller: TimeTableCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    transclude: true,
    scope: { dashboard: '=' },
  };
}

coreModule.directive('timetable', timetable);
