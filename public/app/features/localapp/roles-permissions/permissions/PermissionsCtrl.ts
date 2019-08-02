import { appEvents } from 'app/core/core';
import { config } from 'app/features/localapp/config';

export class PermissionsCtrl {
  permissions: any[];
  $scope: any;
  backendSrv: any;
  uimodules: any;
  parentUiModules: any;
  childUiModules: any;
  /** @ngInject */
  constructor($scope, backendSrv) {
    this.$scope = $scope;
    this.backendSrv = backendSrv;
    this.getPermissions();
    this.getUiModuless();
    $scope.savePermission = () => {
      console.log('Permission: ', $scope.permission);
      if (!$scope.permissionForm.$valid) {
        console.log('No valid for found');
        return;
      }
      const perm = $scope.permission;
      perm.version = 1;
      console.log('Save it: ', perm);
      this.backendSrv.post(config.PERMS_CREATE, perm).then(response => {
        console.log('Api response: ', response);
      });
    };
    $scope.onChangeName = () => {
      const { name } = this.$scope.permission;
      this.$scope.permission = {};
      this.$scope.permission.name = name;
      const selSubModules = [];
      for (let i = 0; i < this.uimodules.length; i++) {
        const m = this.uimodules[i];
        if (m.moduleName === name) {
          selSubModules.push(m.subModuleName);
        }
      }
      $scope.selectedSubModules = selSubModules.sort();
    };
  }

  getPermissions() {
    this.backendSrv.get(config.PERMS_LIST_ALL).then(response => {
      this.permissions = response;
    });
  }

  async getUiModuless() {
    await this.backendSrv.get(config.UI_MODULES_GET).then(rsp => {
      this.uimodules = rsp;
    });
    console.log('UI modules : ', this.uimodules);
    let mn = '';
    const selMd = [];
    for (let i = 0; i < this.uimodules.length; i++) {
      const m = this.uimodules[i];
      if (mn !== m.moduleName) {
        mn = m.moduleName;
        selMd.push(mn);
      }
    }
    this.parentUiModules = selMd.sort();
    console.log('Unique sorted modules : ', this.parentUiModules);
  }

  showAddPermissionModal() {
    console.log('Calling event: add-permission-modal');
    appEvents.emit('add-permission-modal', {
      text: 'Add new premission',
      icon: 'fa-trash',
      uimodules: this.uimodules,
      parentUiModules: this.parentUiModules,
      selectedSubModules: this.$scope.selectedSubModules,
      onCreate: (permissionForm, permission) => {
        this.$scope.permissionForm = permissionForm;
        this.$scope.permission = permission;
        this.$scope.savePermission();
        this.getPermissions();
      },
      onChange: (permissionForm, permission, uimodules, selectedSubModules) => {
        this.$scope.permissionForm = permissionForm;
        this.$scope.permission = permission;
        this.$scope.uimodules = uimodules;
        this.$scope.selectedSubModules = selectedSubModules;
        this.$scope.onChangeName();
        return this.$scope.selectedSubModules;
      },
    });
  }
}
