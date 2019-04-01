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
    // this.backendSrv.get(config.ROLES_LIST_ALL).then(response => {
    //   response.forEach(role => {
    //     console.log('Log: ', role);
    //     if (!role.group) {
    //       this.roles.push(role);
    //     }
    //   });
    // });
    this.roles = [
      {
        id: 'super_admin',
        title: 'SUPER ADMINISTRATOR',
      },
      {
        id: 'admin',
        title: 'ADMINISTRATOR',
      },
      {
        id: 'teacher',
        title: 'TEACHER',
      },
      {
        id: 'principal',
        title: 'PRINCIPAL',
      },
      {
        id: 'hod',
        title: 'HOD',
      },
      {
        id: 'housekeeping',
        title: 'HOUSEKEEPING',
      },
      {
        id: 'inventory_head',
        title: 'INVENTORY HEAD',
      },
      {
        id: 'driver',
        title: 'DRIVER',
      },
      {
        id: 'librarian',
        title: 'LIBRARIAN',
      },
      {
        id: 'finance_admin',
        title: 'FINANCE ADMIN',
      },
    ];
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
    this.permittedRoles = [
      {
        name: 'STUDENT',
        collapse: true,
        children: [
          {
            name: 'CREATE STUDENT',
          },
          {
            name: 'EDIT STUDENT',
          },
          {
            name: 'VIEW STUDENT',
          },
          {
            name: 'DELETE STUDENT',
          },
        ],
      },
      {
        name: 'ATTENDENCE',
        collapse: true,
        children: [
          {
            name: 'CREATE STUDENT',
          },
          {
            name: 'EDIT STUDENT',
          },
          {
            name: 'VIEW STUDENT',
          },
          {
            name: 'DELETE STUDENT',
          },
        ],
      },
      {
        name: 'EXAM',
        collapse: true,
        children: [
          {
            name: 'CREATE STUDENT',
          },
          {
            name: 'EDIT STUDENT',
          },
          {
            name: 'VIEW STUDENT',
          },
          {
            name: 'DELETE STUDENT',
          },
        ],
      },
      {
        name: 'CONFIGURATION SETTING',
        collapse: true,
        children: [
          {
            name: 'CREATE STUDENT',
          },
          {
            name: 'EDIT STUDENT',
          },
          {
            name: 'VIEW STUDENT',
          },
          {
            name: 'DELETE STUDENT',
          },
        ],
      },
      {
        name: 'ACADEMIC YEAR',
        collapse: true,
        children: [
          {
            name: 'CREATE STUDENT',
          },
          {
            name: 'EDIT STUDENT',
          },
          {
            name: 'VIEW STUDENT',
          },
          {
            name: 'DELETE STUDENT',
          },
        ],
      },
      {
        name: 'CLASS SETUP',
        collapse: true,
        children: [
          {
            name: 'CREATE STUDENT',
          },
          {
            name: 'EDIT STUDENT',
          },
          {
            name: 'VIEW STUDENT',
          },
          {
            name: 'DELETE STUDENT',
          },
        ],
      },
      {
        name: 'SUBJECT SETUP',
        collapse: true,
        children: [
          {
            name: 'CREATE STUDENT',
          },
          {
            name: 'EDIT STUDENT',
          },
          {
            name: 'VIEW STUDENT',
          },
          {
            name: 'DELETE STUDENT',
          },
        ],
      },
      {
        name: 'TIMETABLE',
        collapse: true,
        children: [
          {
            name: 'CREATE STUDENT',
          },
          {
            name: 'EDIT STUDENT',
          },
          {
            name: 'VIEW STUDENT',
          },
          {
            name: 'DELETE STUDENT',
          },
        ],
      },
    ];
  }

  getProhibitableRoles() {
    this.prohibitableRoles = [
      {
        name: 'STUDENT',
        collapse: true,
        children: [
          {
            name: 'CREATE STUDENT',
          },
          {
            name: 'EDIT STUDENT',
          },
          {
            name: 'VIEW STUDENT',
          },
          {
            name: 'DELETE STUDENT',
          },
        ],
      },
      {
        name: 'ATTENDENCE',
        collapse: true,
        children: [
          {
            name: 'CREATE STUDENT',
          },
          {
            name: 'EDIT STUDENT',
          },
          {
            name: 'VIEW STUDENT',
          },
          {
            name: 'DELETE STUDENT',
          },
        ],
      },
      {
        name: 'EXAM',
        collapse: true,
        children: [
          {
            name: 'CREATE STUDENT',
          },
          {
            name: 'EDIT STUDENT',
          },
          {
            name: 'VIEW STUDENT',
          },
          {
            name: 'DELETE STUDENT',
          },
        ],
      },
      {
        name: 'CONFIGURATION SETTING',
        collapse: true,
        children: [
          {
            name: 'CREATE STUDENT',
          },
          {
            name: 'EDIT STUDENT',
          },
          {
            name: 'VIEW STUDENT',
          },
          {
            name: 'DELETE STUDENT',
          },
        ],
      },
      {
        name: 'ACADEMIC YEAR',
        collapse: true,
        children: [
          {
            name: 'CREATE STUDENT',
          },
          {
            name: 'EDIT STUDENT',
          },
          {
            name: 'VIEW STUDENT',
          },
          {
            name: 'DELETE STUDENT',
          },
        ],
      },
      {
        name: 'CLASS SETUP',
        collapse: true,
        children: [
          {
            name: 'CREATE STUDENT',
          },
          {
            name: 'EDIT STUDENT',
          },
          {
            name: 'VIEW STUDENT',
          },
          {
            name: 'DELETE STUDENT',
          },
        ],
      },
      {
        name: 'SUBJECT SETUP',
        collapse: true,
        children: [
          {
            name: 'CREATE STUDENT',
          },
          {
            name: 'EDIT STUDENT',
          },
          {
            name: 'VIEW STUDENT',
          },
          {
            name: 'DELETE STUDENT',
          },
        ],
      },
      {
        name: 'TIMETABLE',
        collapse: true,
        children: [
          {
            name: 'CREATE STUDENT',
          },
          {
            name: 'EDIT STUDENT',
          },
          {
            name: 'VIEW STUDENT',
          },
          {
            name: 'DELETE STUDENT',
          },
        ],
      },
    ];
  }

  getExclusiveRoles() {
    this.exclusiveRoles = [
      {
        id: 'super_admin',
        title: 'SUPER ADMINISTRATOR',
      },
      {
        id: 'admin',
        title: 'ADMINISTRATOR',
      },
      {
        id: 'teacher',
        title: 'TEACHER',
      },
      {
        id: 'principal',
        title: 'PRINICIPAL',
      },
      {
        id: 'hod',
        title: 'HOD',
      },
    ];
  }

  showAddRoleModal() {
    const text = 'Do you want to add the ';
    appEvents.emit('add-role-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: (roleForm, role) => {
        this.$scope.roleForm = roleForm;
        this.$scope.role = role;
      },
      preferenceId: this.preferenceId,
      preferences: this.preferences,
      permittedRoles: this.permittedRoles,
      prohibitableRoles: this.prohibitableRoles,
      exclusiveRoles: this.exclusiveRoles
    });
  }
}
