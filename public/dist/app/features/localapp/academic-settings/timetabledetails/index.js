import coreModule from 'app/core/core_module';
import { TimeTableCtrl } from './TimeTableDetailsCtrl';
export function timetableDetails() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/localapp/academic-settings/timetabledetails/partials/timetable_details.html',
        controller: TimeTableCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        transclude: true,
        scope: { dashboard: '=' },
    };
}
coreModule.directive('timetableDetails', timetableDetails);
//# sourceMappingURL=index.js.map