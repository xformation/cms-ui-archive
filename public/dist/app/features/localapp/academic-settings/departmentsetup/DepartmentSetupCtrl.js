import { appEvents } from 'app/core/core';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';
var DepartmentSetupCtrl = /** @class */ (function () {
    /** @ngInject */
    function DepartmentSetupCtrl($scope, backendSrv) {
        var _this = this;
        this.backendSrv = backendSrv;
        this.activeTabIndex = 0;
        this.RestUrl = new GlobalRestUrlConstants();
        this.activeTabIndex = 0;
        this.query = '';
        this.getDepartments();
        this.getBranches();
        this.getAcademicYears();
        this.$scope = $scope;
        $scope.create = function () {
            if (!$scope.departmentForm.$valid) {
                return;
            }
            backendSrv.post(_this.RestUrl.getDepartmentRestUrl(), $scope.department).then(function () {
                _this.getDepartments();
            });
        };
        $scope.update = function () {
            if (!$scope.departmentForm.$valid) {
                return;
            }
            backendSrv.put(_this.RestUrl.getDepartmentRestUrl(), $scope.department).then(function () {
                _this.getDepartments();
            });
        };
    }
    DepartmentSetupCtrl.prototype.activateTab = function (tabIndex) {
        this.activeTabIndex = tabIndex;
    };
    DepartmentSetupCtrl.prototype.getDepartments = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getDepartmentRestUrl()).then(function (result) {
            _this.departments = result;
        });
    };
    DepartmentSetupCtrl.prototype.getBranches = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getBranchRestUrl()).then(function (result) {
            _this.branches = result;
        });
    };
    DepartmentSetupCtrl.prototype.getAcademicYears = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getAcademicYearRestUrl()).then(function (result) {
            _this.academicYears = result;
        });
    };
    DepartmentSetupCtrl.prototype.deleteDepartment = function (department) {
        var _this = this;
        appEvents.emit('confirm-modal', {
            title: 'Delete',
            text: 'Do you want to delete ' + department.name + '?',
            icon: 'fa-trash',
            yesText: 'Delete',
            onConfirm: function () {
                _this.backendSrv.delete(_this.RestUrl.getDepartmentRestUrl() + department.id).then(function () {
                    _this.getDepartments();
                });
            },
        });
    };
    DepartmentSetupCtrl.prototype.showModal = function () {
        var _this = this;
        appEvents.emit('department-modal', {
            text: 'create',
            icon: 'fa-trash',
            branches: this.branches,
            academicYears: this.academicYears,
            onCreate: function (departmentForm, department) {
                _this.$scope.departmentForm = departmentForm;
                _this.$scope.department = department;
                _this.$scope.create();
            },
        });
    };
    DepartmentSetupCtrl.prototype.editDepartment = function (department) {
        var _this = this;
        appEvents.emit('department-modal', {
            icon: 'fa-trash',
            text: 'update',
            branches: this.branches,
            academicYears: this.academicYears,
            department: department,
            onUpdate: function (departmentForm, department) {
                _this.$scope.departmentForm = departmentForm;
                _this.$scope.department = department;
                _this.$scope.update();
            },
        });
    };
    return DepartmentSetupCtrl;
}());
export { DepartmentSetupCtrl };
//# sourceMappingURL=DepartmentSetupCtrl.js.map