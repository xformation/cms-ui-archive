import { appEvents } from 'app/core/core';
var DepartmentSettingsCtrl = /** @class */ (function () {
    /** @ngInject */
    function DepartmentSettingsCtrl($scope, backendSrv) {
        var _this = this;
        this.backendSrv = backendSrv;
        this.activeTabIndex = 0;
        this.activeTabIndex = 0;
        this.query = '';
        this.getDepartments();
        this.$scope = $scope;
        $scope.create = function () {
            if (!$scope.departmentForm.$valid) {
                return;
            }
            backendSrv.post('http://localhost:8080/api/departments/', $scope.department).then(function () {
                _this.getDepartments();
            });
        };
    }
    DepartmentSettingsCtrl.prototype.activateTab = function (tabIndex) {
        this.activeTabIndex = tabIndex;
    };
    DepartmentSettingsCtrl.prototype.getDepartments = function () {
        var _this = this;
        this.backendSrv.get("http://localhost:8080/api/departments/").then(function (result) {
            _this.departments = result;
        });
    };
    DepartmentSettingsCtrl.prototype.deleteDepartment = function (department) {
        var _this = this;
        appEvents.emit('confirm-modal', {
            title: 'Delete',
            text: 'Do you want to delete ' + department.name + '?',
            icon: 'fa-trash',
            yesText: 'Delete',
            onConfirm: function () {
                _this.backendSrv.delete('http://localhost:8080/api/departments/' + department.id).then(function () {
                    _this.getDepartments();
                });
            },
        });
    };
    DepartmentSettingsCtrl.prototype.showModal = function () {
        var _this = this;
        var text = 'Do you want to delete the ';
        appEvents.emit('department-modal', {
            text: text,
            icon: 'fa-trash',
            onCreate: function (departmentForm, department) {
                _this.$scope.departmentForm = departmentForm;
                _this.$scope.department = department;
                _this.$scope.create();
            },
        });
    };
    DepartmentSettingsCtrl.prototype.showImportModal = function () {
        var _this = this;
        var text = 'Do you want to delete the ';
        appEvents.emit('import-department-modal', {
            text: text,
            icon: 'fa-trash',
            onCreate: function (departmentForm, department) {
                _this.$scope.departmentForm = departmentForm;
                _this.$scope.department = department;
                _this.$scope.create();
            },
        });
    };
    return DepartmentSettingsCtrl;
}());
export { DepartmentSettingsCtrl };
//# sourceMappingURL=DepartmentSettingsCtrl.js.map