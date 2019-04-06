import { appEvents } from 'app/core/core';
import { config } from 'app/features/localapp/config';

export class UsersCtrl {
  users: any[] = [];
  roles: any[] = [];
  permissions: any[] = [];
  groups: any[] = [];
  $scope: any;
  backendSrv: any;
  /** @ngInject */
  constructor($scope, backendSrv) {
    this.$scope = $scope;
    this.backendSrv = backendSrv;
    this.getUsers();
    this.getRoles();
    this.getPermissions();
  }

  getUsers() {
    this.backendSrv.get(config.USERS_LIST_ALL).then(response => {
      this.users = response;
    });
  }

  getRoles() {
    this.backendSrv.get(config.ROLES_LIST_ALL).then(response => {
      response.forEach(role => {
        if (role.grp) {
          this.groups.push(role);
        } else {
          this.roles.push(role);
        }
      });
    });
  }

  getPermissions() {
    this.backendSrv.get(config.PERMS_LIST_ALL).then(response => {
      this.permissions = response;
    });
  }

  showAddUserModal() {
    const text = 'Do you want to delete the ';
    appEvents.emit('add-user-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: () => {},
    });
  }

  showEditUserModal() {
    const text = 'Do you want to delete the ';
    appEvents.emit('edit-user-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: () => {},
    });
  }
}
