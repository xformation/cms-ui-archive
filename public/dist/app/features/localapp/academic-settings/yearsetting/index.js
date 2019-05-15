import coreModule from 'app/core/core_module';
import { YearSettingCtrl } from './YearSettingCtrl';
export function yearSetting() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/localapp/academic-settings/yearsetting/partials/year_setting.html',
        controller: YearSettingCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        transclude: true,
        scope: { dashboard: '=' },
    };
}
coreModule.directive('yearSetting', yearSetting);
//# sourceMappingURL=index.js.map