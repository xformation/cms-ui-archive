import { appEvents } from 'app/core/core';
import { config } from 'app/features/localapp/config';

export class UsersCtrl {
  users: any[] = [];
  roles: any[] = [];
  user: any;
  $scope: any;
  backendSrv: any;
  /** @ngInject */
  constructor($scope, backendSrv) {
    this.$scope = $scope;
    this.backendSrv = backendSrv;
    this.getUsers();
    this.getRoles();

    $scope.saveUser = () => {
      console.log('User: ', $scope.user);
      if (!$scope.userForm.$valid) {
        console.log('No valid form found');
        return;
      }
      const usr = $scope.user;
      console.log('Save it: ', usr);
      this.backendSrv.post(config.USERS_CREATE, usr).then(response => {
        console.log('Api response: ', response);
      });
    };
    $scope.updateUser = () => {
      console.log('User: ', $scope.user);
      if (!$scope.userForm.$valid) {
        console.log('No valid form found');
        return;
      }
      const usr = $scope.user;
      console.log('Update it: ', usr);
      this.backendSrv.post(config.USERS_UPDATE, usr).then(response => {
        console.log('Api response: ', response);
      });
    };
  }

  selUser(usr) {
    this.user = usr;
  }

  getUsers() {
    this.backendSrv.get(config.USERS_LIST_ALL).then(response => {
      this.users = response;
    });
  }

  getRoles() {
    this.backendSrv.get(config.ROLES_LIST_ALL).then(response => {
      this.roles = response;
    });
  }

  showAddUserModal() {
    const text = 'Do you want to Add the ';
    appEvents.emit('add-user-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: (userForm, user) => {
        this.$scope.userForm = userForm;
        this.$scope.user = user;
        this.$scope.saveUser();
      },
      roles: this.roles,
    });
  }

  showEditUserModal() {
    if (!this.user) {
      alert('Please select a user first to edit.');
      return;
    }
    const text = 'Do you want to Edit the ';
    appEvents.emit('edit-user-modal', {
      text: text,
      icon: 'fa-trash',
      onEdit: (userForm, user) => {
        this.$scope.userForm = userForm;
        this.$scope.user = user;
        this.$scope.updateUser();
      },
      roles: this.roles,
      user: this.user,
    });
  }
}
