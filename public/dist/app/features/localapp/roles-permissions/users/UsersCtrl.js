import { appEvents } from 'app/core/core';
import { config } from 'app/features/localapp/config';
var UsersCtrl = /** @class */ (function () {
    function UsersCtrl($scope, backendSrv) {
        var _this = this;
        this.users = [];
        this.groups = [];
        this.user = null;
        this.$scope = $scope;
        this.backendSrv = backendSrv;
        this.getUsers();
        this.getGroups();
        $scope.saveUser = function (user, userForm, cb) {
            if (!userForm.$valid) {
                return;
            }
            _this.backendSrv.post(config.USERS_CREATE, user).then(function (response) {
                _this.getUsers();
                if (cb) {
                    cb("1");
                }
            }, function (error) {
                if (cb) {
                    cb("0");
                }
            });
        };
        $scope.updateUser = function (user, userForm, cb) {
            if (userForm && !userForm.$valid) {
                return;
            }
            _this.backendSrv.post(config.USERS_UPDATE, user).then(function (response) {
                if (cb) {
                    cb("1");
                }
                _this.getUsers();
            }, function (error) {
                if (cb) {
                    cb("0");
                }
            });
        };
    }
    UsersCtrl.prototype.getUsers = function () {
        var _this = this;
        this.users = [];
        this.backendSrv.get(config.USERS_LIST_ALL).then(function (response) {
            _this.users = response;
        });
    };
    UsersCtrl.prototype.getGroups = function () {
        var _this = this;
        this.groups = [];
        this.backendSrv.get(config.ROLES_LIST_ALL).then(function (response) {
            response.forEach(function (role) {
                if (role.grp) {
                    _this.groups.push(role);
                }
            });
        });
    };
    UsersCtrl.prototype.setUser = function (usr) {
        this.user = usr;
    };
    UsersCtrl.prototype.showAddUserModal = function () {
        var _this = this;
        var text = 'Do you want to delete the ';
        appEvents.emit('add-user-modal', {
            text: text,
            icon: 'fa-trash',
            onAdd: function (userForm, user, cb) {
                _this.$scope.saveUser(user, userForm, cb);
            },
        });
    };
    UsersCtrl.prototype.showEditUserModal = function () {
        var _this = this;
        if (!this.user) {
            return;
        }
        var text = 'Do you want to delete the ';
        appEvents.emit('edit-user-modal', {
            text: text,
            icon: 'fa-trash',
            onAdd: function () { },
            onEdit: function (userForm, user, cb) {
                _this.$scope.updateUser(user, userForm, cb);
            },
            user: JSON.parse(JSON.stringify(this.user))
        });
    };
    UsersCtrl.prototype.showAssignGroupModal = function () {
        var _this = this;
        var text = 'Do you want to delete the ';
        appEvents.emit('assign-group-modal', {
            text: text,
            icon: 'fa-trash',
            groups: JSON.parse(JSON.stringify(this.groups)),
            users: JSON.parse(JSON.stringify(this.users)),
            onEdit: function (user, cb) {
                _this.$scope.updateUser(user, null, cb);
            }
        });
    };
    return UsersCtrl;
}());
export { UsersCtrl };
//# sourceMappingURL=UsersCtrl.js.map