import { appEvents } from 'app/core/core';
import { config } from 'app/features/localapp/config';

export class GroupsCtrl {
  groups: any[] = [];
  roles: any[] = [];
  $scope: any;
  backendSrv: any;
  /** @ngInject */
  constructor($scope, backendSrv) {
    this.$scope = $scope;
    this.backendSrv = backendSrv;
    this.getGroups();

    $scope.saveGroup = () => {
      console.log('Role: ', $scope.group);
      if (!$scope.groupForm.$valid) {
        console.log('No valid form found');
        return;
      }
      const role = $scope.group;
      role.grp = true;
      console.log('Save it: ', role);
      this.backendSrv.post(config.ROLES_CREATE, role).then(response => {
        console.log('Api response: ', response);
      });
    };
  }

  getGroups() {
    this.backendSrv.get(config.ROLES_LIST_ALL).then(response => {
      response.forEach(role => {
        console.log('Log: ', role);
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
      onAdd: (groupForm, group) => {
        this.$scope.groupForm = groupForm;
        this.$scope.group = group;
        this.$scope.saveGroup();
        this.getGroups();
      },
      roles: this.roles,
    });
  }
}
