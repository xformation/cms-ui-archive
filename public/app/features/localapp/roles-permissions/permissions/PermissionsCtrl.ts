import { appEvents } from 'app/core/core';
import { config } from 'app/features/localapp/config';

export class PermissionsCtrl {
  permissions: any[];
  $scope: any;
  backendSrv: any;
  /** @ngInject */
  constructor($scope, backendSrv) {
    this.$scope = $scope;
    this.backendSrv = backendSrv;
    this.getPermissions();

    $scope.savePermission = () => {
      console.log('Permission: ', $scope.permission);
      if (!$scope.permissionForm.$valid) {
        console.log('No valid for found');
        return;
      }
      const perm = $scope.permission;
      console.log('Save it: ', perm);
      this.backendSrv.post(config.PERMS_CREATE, perm).then(response => {
        console.log('Api response: ', response);
      });
    };
  }

  getPermissions() {
    this.backendSrv.get(config.PERMS_LIST_ALL).then(response => {
      this.permissions = response;
    });
  }

  showAddPermissionModal() {
    console.log('Calling event: add-permission-modal');
    appEvents.emit('add-permission-modal', {
      text: 'Add new premission',
      icon: 'fa-trash',
      onCreate: (permissionForm, permission) => {
        this.$scope.permissionForm = permissionForm;
        this.$scope.permission = permission;
        this.$scope.savePermission();
        this.getPermissions();
      },
    });
  }
}
