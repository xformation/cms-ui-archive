import coreModule from 'app/core/core_module';
import { TimeTableCtrl } from './TimeTableCtrl';

export function timetableSetting() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/localapp/academic-settings/timetablesetting/partials/timetable_setting.html',
    controller: TimeTableCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    transclude: true,
    scope: { dashboard: '=' },
  };
}

coreModule.directive('timetableSetting', timetableSetting);
