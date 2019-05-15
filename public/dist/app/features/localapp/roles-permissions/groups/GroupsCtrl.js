import { appEvents } from 'app/core/core';
import { config } from 'app/features/localapp/config';
var GroupsCtrl = /** @class */ (function () {
    function GroupsCtrl($scope, backendSrv) {
        var _this = this;
        this.groups = [];
        this.roles = [];
        this.$scope = $scope;
        this.backendSrv = backendSrv;
        this.getGroups();
        $scope.saveGroup = function (group, groupForm, cb) {
            if (groupForm && !groupForm.$valid) {
                return;
            }
            group.grp = true;
            _this.backendSrv.post(config.ROLES_CREATE, group).then(function (response) {
                _this.getGroups();
                if (cb) {
                    cb("1");
                }
            }, function (error) {
                if (cb) {
                    cb("0");
                }
            });
        };
    }
    GroupsCtrl.prototype.getGroups = function () {
        var _this = this;
        this.backendSrv.get(config.ROLES_LIST_ALL).then(function (response) {
            _this.groups = [];
            _this.roles = [];
            response.forEach(function (role) {
                if (role.grp) {
                    _this.groups.push(role);
                }
                else {
                    _this.roles.push(role);
                }
            });
        });
    };
    GroupsCtrl.prototype.showAddGroupModal = function () {
        var _this = this;
        var text = 'Do you want to Add the ';
        appEvents.emit('add-group-modal', {
            text: text,
            icon: 'fa-trash',
            onAdd: function (groupForm, group, cb) {
                _this.$scope.saveGroup(group, groupForm, cb);
            }
        });
    };
    GroupsCtrl.prototype.showAssignRoleModal = function () {
        var _this = this;
        var text = 'Do you want to delete the ';
        appEvents.emit('assign-role-modal', {
            text: text,
            icon: 'fa-trash',
            roles: JSON.parse(JSON.stringify(this.roles)),
            groups: JSON.parse(JSON.stringify(this.groups)),
            onAdd: function (group, cb) {
                _this.$scope.saveGroup(group, null, cb);
            }
        });
    };
    return GroupsCtrl;
}());
export { GroupsCtrl };
//# sourceMappingURL=GroupsCtrl.js.map