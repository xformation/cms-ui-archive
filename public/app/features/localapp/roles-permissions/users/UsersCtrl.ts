import { appEvents } from 'app/core/core';
import { config } from 'app/features/localapp/config';

export class UsersCtrl {
  users: any[] = [];
  groups: any[] = [];
  $scope: any;
  backendSrv: any;
  user: any = null;
  teacherStatus: any;
  studentStatus: any;
  employeeStatus: any;
  constructor($scope, backendSrv) {
    this.$scope = $scope;
    this.backendSrv = backendSrv;
    this.teacherStatus = 'false';
    this.studentStatus = 'false';
    this.employeeStatus = 'false';
    this.getUsers();
    this.getGroups();

    $scope.importUser = (user, userForm, cb) => {
      console.log('user form ', userForm);
      if (
        user === undefined ||
        user === null ||
        (user.teacherStatus === false && user.studentStatus === false && user.employeeStatus === false)
      ) {
        alert('Please select at least one checkbox');
        return;
      }
      let isT = 'false';
      if (user.teacherStatus !== undefined && user.teacherStatus) {
        isT = 'true';
      }
      let isS = 'false';
      if (user.studentStatus !== undefined && user.studentStatus) {
        isS = 'true';
      }
      let isE = 'false';
      if (user.employeeStatus !== undefined && user.employeeStatus) {
        isE = 'true';
      }
      this.backendSrv
        .post(config.EXPORT_USER_PORT + '?chkTeacher=' + isT + '&chkStudent=' + isS + '&chkEmployee=' + isE)
        .then(
          response => {
            // this.getUsers();
            if (cb) {
              cb('1');
            }
          },
          error => {
            if (cb) {
              cb('0');
            }
          }
        );
    };

    $scope.saveUser = (user, userForm, cb) => {
      if (!userForm.$valid) {
        return;
      }
      this.backendSrv.post(config.USERS_CREATE, user).then(
        response => {
          this.getUsers();
          if (cb) {
            cb('1');
          }
        },
        error => {
          if (cb) {
            cb('0');
          }
        }
      );
    };

    $scope.updateUser = (user, userForm, cb) => {
      if (userForm && !userForm.$valid) {
        return;
      }
      this.backendSrv.post(config.USERS_UPDATE, user).then(
        response => {
          if (cb) {
            cb('1');
          }
          this.getUsers();
        },
        error => {
          if (cb) {
            cb('0');
          }
        }
      );
    };
  }

  getUsers() {
    this.users = [];
    this.backendSrv.get(config.USERS_LIST_ALL).then(response => {
      this.users = response;
    });
  }

  getGroups() {
    this.groups = [];
    this.backendSrv.get(config.ROLES_LIST_ALL).then(response => {
      response.forEach(role => {
        if (role.grp) {
          this.groups.push(role);
        }
      });
    });
  }

  setUser(usr) {
    this.user = usr;
  }

  showImportUserModal() {
    const text = 'Do you want to delete the ';
    appEvents.emit('import-user-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: (userForm, user, cb) => {
        this.$scope.importUser(user, userForm, cb);
      },
    });
  }

  showAddUserModal() {
    const text = 'Do you want to delete the ';
    appEvents.emit('add-user-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: (userForm, user, cb) => {
        this.$scope.saveUser(user, userForm, cb);
      },
    });
  }

  showEditUserModal() {
    if (!this.user) {
      return;
    }
    const text = 'Do you want to delete the ';
    appEvents.emit('edit-user-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: () => {},
      onEdit: (userForm, user, cb) => {
        this.$scope.updateUser(user, userForm, cb);
      },
      user: JSON.parse(JSON.stringify(this.user)),
    });
  }

  showAssignGroupModal() {
    const text = 'Do you want to delete the ';
    appEvents.emit('assign-group-modal', {
      text: text,
      icon: 'fa-trash',
      groups: JSON.parse(JSON.stringify(this.groups)),
      users: JSON.parse(JSON.stringify(this.users)),
      onEdit: (user, cb) => {
        this.$scope.updateUser(user, null, cb);
      },
    });
  }
}
