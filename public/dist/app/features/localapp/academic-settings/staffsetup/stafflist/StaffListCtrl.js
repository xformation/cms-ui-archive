import { GlobalRestUrlConstants } from '../../../GlobalRestUrlConstants';
var StaffListCtrl = /** @class */ (function () {
    /** @ngInject */
    function StaffListCtrl($scope, backendSrv) {
        this.backendSrv = backendSrv;
        this.activeTabIndex = 0;
        this.RestUrl = new GlobalRestUrlConstants();
        this.activeTabIndex = 0;
        this.getTeachers();
        $scope.showMoreOptions = function () {
            $scope.optionsLimit += 20;
        };
    }
    StaffListCtrl.prototype.getTeachers = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getTeacherRestUrl()).then(function (result) {
            _this.teachers = result;
        });
    };
    StaffListCtrl.prototype.activateTab = function (tabIndex) {
        this.activeTabIndex = tabIndex;
    };
    return StaffListCtrl;
}());
export { StaffListCtrl };
//# sourceMappingURL=StaffListCtrl.js.map