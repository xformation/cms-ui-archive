import { appEvents } from 'app/core/core';
import { config } from 'app/features/localapp/config';

export class GroupsCtrl {
  groups: any[];
  $scope: any;
  backendSrv: any;
  /** @ngInject */
  constructor($scope, backendSrv) {
    this.$scope = $scope;
    this.backendSrv = backendSrv;
    this.getGroups();
  }

  getGroups() {
    this.backendSrv.get(config.ROLES_LIST_ALL).then(response => {
      response.forEach(role => {
        if (role.group) {
          this.groups.push(role);
        }
      });
    });
  }

  showAddGroupModal() {
    const text = 'Do you want to delete the ';
    appEvents.emit('add-group-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: () => {},
    });
  }
}
