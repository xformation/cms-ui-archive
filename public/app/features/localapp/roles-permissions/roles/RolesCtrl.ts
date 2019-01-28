import { appEvents } from 'app/core/core';

export class RolesCtrl {
  roles: any[] = [];
  preferences = [];
  preferenceId = '';
  permittedRoles = [];
  prohibitableRoles = [];
  exclusiveRoles = [];
  $scope: any;
  constructor($scope) {
    this.getRoles();
    this.getPreferences();
    this.preferenceId = 'permitted';
    this.getPermittedRoles();
    this.getProhibitableRoles();
    this.getExclusiveRoles();
    this.$scope = $scope;
  }

  getRoles() {
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
      {
        id: 'general',
        title: 'General',
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

  showModal() {
    const text = 'Do you want to delete the ';

    appEvents.emit('add-role-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: () => {},
    });
  }
}
