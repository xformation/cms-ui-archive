import { GlobalRestUrlConstants } from '../../../GlobalRestUrlConstants';
var StaffProfileCtrl = /** @class */ (function () {
    /** @ngInject */
    function StaffProfileCtrl($scope, backendSrv) {
        this.backendSrv = backendSrv;
        this.activeTabIndex = 0;
        this.RestUrl = new GlobalRestUrlConstants();
        this.activeTabIndex = 0;
        this.getTeachers();
    }
    StaffProfileCtrl.prototype.getTeachers = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getTeacherRestUrl()).then(function (result) {
            _this.teachers = result;
        });
    };
    StaffProfileCtrl.prototype.activateTab = function (tabIndex) {
        this.activeTabIndex = tabIndex;
    };
    return StaffProfileCtrl;
}());
export { StaffProfileCtrl };
//# sourceMappingURL=StaffProfileCtrl.js.map