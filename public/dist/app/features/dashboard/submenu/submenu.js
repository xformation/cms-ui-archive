import angular from 'angular';
import _ from 'lodash';
var SubmenuCtrl = /** @class */ (function () {
    /** @ngInject */
    function SubmenuCtrl(variableSrv, $location) {
        this.variableSrv = variableSrv;
        this.$location = $location;
        this.annotations = this.dashboard.templating.list;
        this.variables = this.variableSrv.variables;
    }
    SubmenuCtrl.prototype.annotationStateChanged = function () {
        this.dashboard.startRefresh();
    };
    SubmenuCtrl.prototype.variableUpdated = function (variable) {
        this.variableSrv.variableUpdated(variable, true);
    };
    SubmenuCtrl.prototype.openEditView = function (editview) {
        var search = _.extend(this.$location.search(), { editview: editview });
        this.$location.search(search);
    };
    return SubmenuCtrl;
}());
export { SubmenuCtrl };
export function submenuDirective() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/dashboard/submenu/submenu.html',
        controller: SubmenuCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        scope: {
            dashboard: '=',
        },
    };
}
angular.module('grafana.directives').directive('dashboardSubmenu', submenuDirective);
//# sourceMappingURL=submenu.js.map