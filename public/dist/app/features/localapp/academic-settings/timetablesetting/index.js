import coreModule from 'app/core/core_module';
import { TimeTableSettingCtrl } from './TimeTableSettingCtrl';
export function timetableSetting() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/localapp/academic-settings/timetablesetting/partials/timetable_setting.html',
        controller: TimeTableSettingCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        transclude: true,
        scope: { dashboard: '=' },
    };
}
coreModule.directive('timetableSetting', timetableSetting);
//# sourceMappingURL=index.js.map