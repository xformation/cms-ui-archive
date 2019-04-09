import { appEvents } from 'app/core/core';
import { config } from 'app/features/localapp/config';

export class GroupsCtrl {
  groups: any[] = [];
  roles: any[] = [];
  $scope: any;
  backendSrv: any;
  constructor($scope, backendSrv) {
    this.$scope = $scope;
    this.backendSrv = backendSrv;
    this.getGroups();

    $scope.saveGroup = (group, groupForm, cb) => {
      if (groupForm && !groupForm.$valid) {
        return;
      }
      group.grp = true;
      this.backendSrv.post(config.ROLES_CREATE, group).then(response => {
        this.getGroups();
        if (cb) {
          cb("1");
        }
      }, error => {
        if (cb) {
          cb("0");
        }
      });
    };
  }

  getGroups() {
    this.backendSrv.get(config.ROLES_LIST_ALL).then(response => {
      this.groups = [];
      this.roles = [];
      response.forEach(role => {
        if (role.grp) {
          this.groups.push(role);
        } else {
          this.roles.push(role);
        }
      });
    });
  }

  showAddGroupModal() {
    const text = 'Do you want to Add the ';
    appEvents.emit('add-group-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: (groupForm, group, cb) => {
        this.$scope.saveGroup(group, groupForm, cb);
      }
    });
  }

  showAssignRoleModal() {
    const text = 'Do you want to delete the ';
    appEvents.emit('assign-role-modal', {
      text: text,
      icon: 'fa-trash',
      roles: JSON.parse(JSON.stringify(this.roles)),
      groups: JSON.parse(JSON.stringify(this.groups)),
      onAdd: (group, cb) => {
        this.$scope.saveGroup(group, null, cb);
      }
    });
  }
}
