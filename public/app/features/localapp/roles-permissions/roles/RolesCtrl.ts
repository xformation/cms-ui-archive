export class RolesCtrl {
  roles: any[] = [];
  preferences = [];
  preferenceId = '';
  permittedRoles = [];
  prohibitableRoles = [];
  exclusiveRoles = [];
  constructor() {
    this.getRoles();
    this.getPreferences();
    this.preferenceId = 'permitted';
    this.getPermittedRoles();
    this.getProhibitableRoles();
    this.getExclusiveRoles();
  }

  getRoles() {
    this.roles.push({
      id: 'super_admin',
      title: 'SUPER ADMINISTRATOR',
    });
    this.roles.push({
      id: 'admin',
      title: 'ADMINISTRATOR',
    });
    this.roles.push({
      id: 'teacher',
      title: 'TEACHER',
    });
    this.roles.push({
      id: 'principal',
      title: 'PRINCIPAL',
    });
    this.roles.push({
      id: 'hod',
      title: 'HOD',
    });
    this.roles.push({
      id: 'housekeeping',
      title: 'HOUSEKEEPING',
    });
    this.roles.push({
      id: 'inventory_head',
      title: 'INVENTORY HEAD',
    });
    this.roles.push({
      id: 'driver',
      title: 'DRIVER',
    });
    this.roles.push({
      id: 'librarian',
      title: 'LIBRARIAN',
    });
    this.roles.push({
      id: 'finance_admin',
      title: 'FINANCE ADMIN',
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
}
