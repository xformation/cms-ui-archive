import coreModule from 'app/core/core_module';
import { StaffListCtrl } from './StaffListCtrl';
var checkboxTemplate = "\n<label>\n    <input type=\"checkbox\" ng-model=\"ctrl.checked\" ng-change=\"ctrl.internalOnChange()\">\n</label>\n";
export function staffList() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/localapp/academic-settings/staffsetup/stafflist/partials/staff_list.html',
        controller: StaffListCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        transclude: true,
        scope: {
            dashboard: '=',
        },
    };
}
var SwitchCtrl = /** @class */ (function () {
    /** @ngInject */
    function SwitchCtrl($scope, $timeout) {
        this.$timeout = $timeout;
    }
    SwitchCtrl.prototype.internalOnChange = function () {
        var _this = this;
        return this.$timeout(function () {
            return _this.onChange();
        });
    };
    return SwitchCtrl;
}());
export { SwitchCtrl };
export function checkboxDirective() {
    return {
        restrict: 'E',
        controller: SwitchCtrl,
        controllerAs: 'ctrl',
        bindToController: true,
        scope: {
            checked: '=',
            onChange: '&',
        },
        template: checkboxTemplate,
    };
}
coreModule.directive('staffList', staffList, 'gfFormCheckbox', checkboxDirective);
//# sourceMappingURL=index.js.map