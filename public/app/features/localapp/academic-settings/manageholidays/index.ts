import coreModule from 'app/core/core_module';
import { ManageHolidyasSettingCtrl } from './ManageHolidyasSettingCtrl';

export function manageHolidaysSetting() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/localapp/academic-settings/manageholidays/partials/manage_holidays.html',
    controller: ManageHolidyasSettingCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    transclude: true,
    scope: { dashboard: '=' },
  };
}

coreModule.directive('manageHolidaysSetting', manageHolidaysSetting);
