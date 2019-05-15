import * as tslib_1 from "tslib";
import { appEvents } from 'app/core/core';
import { config } from 'app/features/localapp/config';
var RolesCtrl = /** @class */ (function () {
    function RolesCtrl($scope, backendSrv) {
        var _this = this;
        this.selectedRole = '';
        this.roles = [];
        this.preferences = [];
        this.preferenceId = '';
        this.permittedPermissions = [];
        this.prohibitedPermissions = [];
        this.isSuccess = "";
        this.isUpdating = false;
        this.selectedRole = '';
        this.$scope = $scope;
        this.backendSrv = backendSrv;
        this.getRolesPermissions();
        this.getPreferences();
        this.preferenceId = 'permitted';
        $scope.saveRole = function (role, roleForm, cb, isUpdating) {
            if (roleForm && !roleForm.$valid) {
                return;
            }
            role.grp = false;
            _this.backendSrv.post(config.ROLES_CREATE, role).then(function (response) {
                _this.isSuccess = "1";
                _this.isUpdating = false;
                if (!isUpdating) {
                    _this.getRolesPermissions();
                }
                if (cb) {
                    cb("1");
                }
            }, function () {
                _this.isSuccess = "0";
                _this.isUpdating = false;
                if (cb) {
                    cb("0");
                }
            });
        };
    }
    RolesCtrl.prototype.getRolesPermissions = function () {
        var _this = this;
        Promise.all([this.backendSrv.get(config.ROLES_LIST_ALL), this.backendSrv.get(config.PERMS_LIST_ALL)]).then(function (response) {
            var roleResponse = response[0];
            roleResponse.forEach(function (item) {
                if (!item.grp) {
                    _this.roles.push(item);
                }
            });
            var perResponse = response[1];
            _this.createPermmissions(perResponse);
        });
    };
    RolesCtrl.prototype.onRoleClicked = function (selectedRole) {
        this.isSuccess = "";
        this.selectedRole = selectedRole;
        var selectedPermissions = selectedRole.permissions;
        for (var k in this.permittedPermissions) {
            this.permittedPermissions[k].checked = false;
            this.permittedPermissions[k].collapse = false;
            this.prohibitedPermissions[k].checked = false;
            this.prohibitedPermissions[k].collapse = false;
            var children = this.permittedPermissions[k].children;
            var prohibitedChildren = this.prohibitedPermissions[k].children;
            if (children.length > 0) {
                for (var j in children) {
                    children[j].checked = false;
                    prohibitedChildren[j].checked = true;
                }
            }
        }
        for (var i in selectedPermissions) {
            var selectedPermission = selectedPermissions[i];
            for (var j in this.permittedPermissions) {
                var children = this.permittedPermissions[j].children;
                var prohibitedChildren = this.prohibitedPermissions[j].children;
                for (var k in children) {
                    if (children[k].id === selectedPermission.id) {
                        children[k].checked = true;
                        prohibitedChildren[k].checked = false;
                    }
                }
            }
        }
    };
    RolesCtrl.prototype.getPreferences = function () {
        this.preferences = [
            {
                id: 'permitted',
                title: 'Permitted',
            },
            {
                id: 'prohibited',
                title: 'Prohibited',
            }
        ];
    };
    RolesCtrl.prototype.setPreference = function (id) {
        this.preferenceId = id;
    };
    RolesCtrl.prototype.createPermmissions = function (response) {
        var permissions = {};
        for (var i in response) {
            var permission = response[i];
            if (!permissions[permission.name]) {
                permissions[permission.name] = {
                    name: permission.name,
                    collapse: true,
                    children: [tslib_1.__assign({}, permission, { dupName: permission.name, name: permission.permission })]
                };
            }
            else {
                var children = permissions[permission.name].children;
                children.push(tslib_1.__assign({}, permission, { dupName: permission.name, name: permission.permission }));
            }
        }
        for (var j in permissions) {
            var permission = permissions[j];
            this.permittedPermissions.push(permission);
            this.prohibitedPermissions.push(JSON.parse(JSON.stringify(permission)));
        }
    };
    RolesCtrl.prototype.showAddRoleModal = function () {
        var _this = this;
        var text = 'Do you want to add the ';
        appEvents.emit('add-role-modal', {
            text: text,
            icon: 'fa-trash',
            onAdd: function (role, roleForm, cb) {
                _this.$scope.saveRole(role, roleForm, cb, false);
            }
        });
    };
    RolesCtrl.prototype.updateRole = function () {
        if (this.selectedRole) {
            this.isUpdating = true;
            var selectedPermissions = [];
            selectedPermissions = [];
            for (var i in this.permittedPermissions) {
                var children = this.permittedPermissions[i].children;
                for (var j in children) {
                    var child = children[j];
                    if (child.checked) {
                        child.permit = true;
                        selectedPermissions.push(tslib_1.__assign({}, child, { name: child.dupName }));
                    }
                }
            }
            this.selectedRole["permissions"] = selectedPermissions;
            this.$scope.saveRole(this.selectedRole, null, null, true);
        }
    };
    RolesCtrl.prototype.onClickPermittedRole = function (role) {
        console.log(role);
    };
    RolesCtrl.prototype.onClickProhibitedRole = function (role) {
        console.log(role);
    };
    return RolesCtrl;
}());
export { RolesCtrl };
//# sourceMappingURL=RolesCtrl.js.map