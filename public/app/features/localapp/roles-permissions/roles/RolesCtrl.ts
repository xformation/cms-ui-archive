import { appEvents } from 'app/core/core';
import { config } from 'app/features/localapp/config';

export class RolesCtrl {
  roles: any[] = [];
  permissions: any[] = [];
  preferences: any[] = [];
  preferenceId = '';
  permittedRoles: any[] = [];
  prohibitableRoles: any[] = [];
  exclusiveRoles: any[] = [];
  $scope: any;
  backendSrv: any;
  /** @ngInject */
  constructor($scope, backendSrv) {
    this.$scope = $scope;
    this.backendSrv = backendSrv;
    this.getRoles();
    this.getPermissions();
    this.getPreferences();
    this.preferenceId = 'permitted';
    this.getPermittedRoles();
    this.getProhibitableRoles();
    this.getExclusiveRoles();

    $scope.saveRole = () => {
      console.log('Role: ', $scope.role);
      if (!$scope.roleForm.$valid) {
        console.log('No valid for found');
        return;
      }
      const role = $scope.role;
      console.log('Save it: ', role);
      this.backendSrv.post(config.ROLES_CREATE, role).then(response => {
        console.log('Api response: ', response);
      });
    };
  }

  getRoles() {
    this.backendSrv.get(config.ROLES_LIST_ALL).then(response => {
      response.forEach(role => {
        console.log('Log: ', role);
        if (!role.group) {
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
      {
        id: 'exclusive_role',
        title: 'Exclusive role',
      },
    ];
  }

  setPreference(id) {
    this.preferenceId = id;
  }

  getPermittedRoles() {
    this.permittedRoles = this.roles;
  }

  getProhibitableRoles() {
    this.prohibitableRoles = this.roles;
  }

  getExclusiveRoles() {
    this.exclusiveRoles = this.roles;
  }

  showAddRoleModal() {
    const text = 'Do you want to add the ';

    appEvents.emit('add-role-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: (roleForm, role) => {
        this.$scope.roleForm = roleForm;
        this.$scope.role = role;
        this.getRoles();
        this.getPermissions();
        this.getPermittedRoles();
        this.getProhibitableRoles();
        this.getExclusiveRoles();
      },
    });
  }
}
