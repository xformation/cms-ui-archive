import { appEvents } from 'app/core/core';

export class PermissionsCtrl {
  permissions: any[];
  $scope: any;
  $http: any;
  /** @ngInject */
  constructor($scope, $http) {
    this.$scope = $scope;
    this.$http = $http;
    this.getPermissions();

    $scope.savePermission = () => {
      if (!$scope.permissionForm.$valid) {
        console.log('No valid for found');
        return;
      }
      console.log('Save it: ', $scope.permissionForm.permission);
    };
  }

  getPermissions() {
    this.permissions = [
      {
        name: 'SUPER ADMINISTRATOR',
        description: '',
      },
      {
        name: 'ADMINISTRATOR',
        description: '',
      },
      {
        name: 'TEACHER',
        description: '',
      },
      {
        name: 'PRINICIPAL',
        description: '',
      },
      {
        name: 'HOD',
        description: '',
      },
      {
        name: 'STUDENT',
        description: '',
      },
      {
        name: 'STUDENT',
        description: '',
      },
      {
        name: 'TRANSPORT',
        description: '',
      },
      {
        name: 'CANTEEN',
        description: '',
      },
      {
        name: 'HOUSE KEEPING',
        description: '',
      },
      {
        name: 'STUDENT',
        description: '',
      },
    ];
  }

  showAddPermissionModal() {
    console.log('Calling event: add-permission-modal');
    appEvents.emit('add-permission-modal', {
      text: 'Add new premission',
      icon: 'fa-trash',
      onAdd: () => {},
    });
  }
}
