import config from 'app/core/config';
import $ from 'jquery';
import _ from 'lodash';
var LocalAppCtrl = /** @class */ (function () {
    function LocalAppCtrl($scope, $location, $rootScope) {
        this.$scope = $scope;
        this.$location = $location;
        this.$rootScope = $rootScope;
        this.buildSectionList();
        this.onRouteUpdated();
        this.$rootScope.onAppEvent('$routeUpdate', this.onRouteUpdated.bind(this), this.$scope);
    }
    LocalAppCtrl.prototype.buildSectionList = function () {
        this.sections = [];
        this.sections.push({
            title: 'College Settings',
            id: 'college_settings',
            description: 'College Info, College branches, Legal entities',
        });
        this.sections.push({
            title: 'Academic settings',
            id: 'academic_settings',
            description: 'Year Setting, Department setup, Subject Setup, Timetable Setting',
        });
        this.sections.push({
            title: 'Roles & Permissions',
            id: 'roles_permissions',
            description: 'Manage roles and permissions',
        });
        this.sections.push({
            title: 'Payroll',
            id: 'payroll',
            description: 'Setup, Leave encashment, Payment and Payslip settings',
        });
        this.sections.push({
            title: 'Leave & Holidays',
            id: 'leave_holidays',
            description: 'Leave plans, Initial adjustments, Notify and Holidays',
        });
        this.sections.push({
            title: 'Employee',
            id: 'employee',
            description: 'Job titles, Probation/Notice Period, Employee number settings',
        });
        this.sections.push({
            title: 'Time & Attendance',
            id: 'time_attendance',
            description: 'Weekly offs, Shifts, Display settings, IP Networks',
        });
        this.sections.push({
            title: 'Integrations',
            id: 'integrations',
            description: 'Login integration',
        });
        var params = this.$location.search();
        var url = this.$location.path();
        for (var _i = 0, _a = this.sections; _i < _a.length; _i++) {
            var section = _a[_i];
            var sectionParams = _.defaults({ activeView: section.id }, params);
            section.url = config.appSubUrl + url + '?' + $.param(sectionParams);
        }
    };
    LocalAppCtrl.prototype.onRouteUpdated = function () {
        this.viewId = this.$location.search().activeView;
        if (!this.viewId) {
            this.viewId = 'college_settings';
        }
    };
    return LocalAppCtrl;
}());
export { LocalAppCtrl };
//# sourceMappingURL=LocalAppCtrl.js.map