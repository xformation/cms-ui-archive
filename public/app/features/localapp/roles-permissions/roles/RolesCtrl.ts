import { appEvents } from 'app/core/core';
import { config } from 'app/features/localapp/config';
import { isArray } from 'util';

export class RolesCtrl {
  roles: any[] = [];
  permissions: any[];
  preferences: any[];
  $scope: any;
  backendSrv: any;
  /** @ngInject */
  constructor($scope, backendSrv) {
    this.$scope = $scope;
    this.backendSrv = backendSrv;
    this.getRoles();
    this.getPermissions();
    this.getPreferences();

    $scope.saveRole = () => {
      console.log('Role: ', $scope.role);
      if (!$scope.roleForm.$valid) {
        console.log('No valid form found');
        return;
      }
      const role = $scope.role;
      role.grp = false;
      console.log('Save it: ', role);
      this.backendSrv.post(config.ROLES_CREATE, role).then(response => {
        console.log('Api response: ', response);
      });
    };
  }

  getRoles() {
    this.backendSrv.get(config.ROLES_LIST_ALL).then(response => {
      if (isArray(response)) {
        response.forEach(item => {
          console.log('Role: ', item.name, 'grp: ', item.grp);
          if (item.grp) {
            console.log('Found a group');
          } else {
            console.log("It's a role");
            this.roles.push(item);
          }
        });
      }
    });
  }

  getPermissions() {
    this.backendSrv.get(config.PERMS_LIST_ALL).then(response => {
      this.permissions = response;
    });
  }

  getPreferences() {
    this.preferences = [
      {
        id: 'permitted',
        title: 'Permitted',
      },
      {
        id: 'prohibited',
        title: 'Prohibited',
      },
    ];
  }

  showAddRoleModal() {
    const text = 'Do you want to add the ';
    appEvents.emit('add-role-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: (roleForm, role, prefId) => {
        this.$scope.preferenceId = prefId;
        this.$scope.roleForm = roleForm;
        this.$scope.role = role;
        this.$scope.saveRole();
      },
      preferenceId: 'permitted',
      preferences: this.preferences,
      permissions: this.permissions,
    });
  }
}
