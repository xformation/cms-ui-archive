import { appEvents } from 'app/core/core';
import { config } from 'app/features/localapp/config';
var PermissionsCtrl = /** @class */ (function () {
    /** @ngInject */
    function PermissionsCtrl($scope, backendSrv) {
        var _this = this;
        this.$scope = $scope;
        this.backendSrv = backendSrv;
        this.getPermissions();
        $scope.savePermission = function () {
            console.log('Permission: ', $scope.permission);
            if (!$scope.permissionForm.$valid) {
                console.log('No valid for found');
                return;
            }
            var perm = $scope.permission;
            console.log('Save it: ', perm);
            _this.backendSrv.post(config.PERMS_CREATE, perm).then(function (response) {
                console.log('Api response: ', response);
            });
        };
    }
    PermissionsCtrl.prototype.getPermissions = function () {
        var _this = this;
        this.backendSrv.get(config.PERMS_LIST_ALL).then(function (response) {
            _this.permissions = response;
        });
    };
    PermissionsCtrl.prototype.showAddPermissionModal = function () {
        var _this = this;
        console.log('Calling event: add-permission-modal');
        appEvents.emit('add-permission-modal', {
            text: 'Add new premission',
            icon: 'fa-trash',
            onCreate: function (permissionForm, permission) {
                _this.$scope.permissionForm = permissionForm;
                _this.$scope.permission = permission;
                _this.$scope.savePermission();
                _this.getPermissions();
            },
        });
    };
    return PermissionsCtrl;
}());
export { PermissionsCtrl };
//# sourceMappingURL=PermissionsCtrl.js.map