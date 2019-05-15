import { GlobalRestUrlConstants } from '../../../GlobalRestUrlConstants';
var StaffCreateCtrl = /** @class */ (function () {
    /** @ngInject */
    function StaffCreateCtrl($scope, backendSrv) {
        var _this = this;
        this.backendSrv = backendSrv;
        this.activeTabPersonalIndex = 0;
        this.activeTabContactIndex = 0;
        this.activeTabPrimaryIndex = 0;
        this.activeBtnIndex = 0;
        this.RestUrl = new GlobalRestUrlConstants();
        this.activeTabPersonalIndex = 0;
        this.activeTabContactIndex = 0;
        this.activeTabPrimaryIndex = 0;
        this.activeBtnIndex = 0;
        this.$scope = $scope;
        this.getTeachers();
        this.getDepartments();
        this.getBranches();
        $scope.create = function () {
            if (!$scope.teacherForm.$valid) {
                return;
            }
            backendSrv.post(_this.RestUrl.getTeacherRestUrl(), $scope.teacher).then(function () { });
        };
    }
    StaffCreateCtrl.prototype.getTeachers = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getTeacherRestUrl()).then(function (result) {
            _this.teachers = result;
        });
    };
    StaffCreateCtrl.prototype.getDepartments = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getDepartmentRestUrl()).then(function (result) {
            _this.departments = result;
        });
    };
    StaffCreateCtrl.prototype.getBranches = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getBranchRestUrl()).then(function (result) {
            _this.branches = result;
        });
    };
    StaffCreateCtrl.prototype.activateTabPersonal = function (tabIndex) {
        this.activeTabPersonalIndex = tabIndex;
    };
    StaffCreateCtrl.prototype.activateTabContact = function (tabIndex) {
        this.activeTabContactIndex = tabIndex;
    };
    StaffCreateCtrl.prototype.activateTabPrimary = function (tabIndex) {
        this.activeTabPrimaryIndex = tabIndex;
    };
    StaffCreateCtrl.prototype.activateBtn = function (tabIndex) {
        this.activeBtnIndex = tabIndex;
    };
    return StaffCreateCtrl;
}());
export { StaffCreateCtrl };
//# sourceMappingURL=StaffCreateCtrl.js.map