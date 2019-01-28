import { appEvents } from 'app/core/core';

export class GroupsCtrl {
  groups: any[];
  roles: any[];
  constructor() {
    this.getGroups();
    this.getRoles();
  }

  getGroups() {
    this.groups = [
      {
        name: 'SUPER ADMINISTRATOR',
        roles: ['SUPER ADMINISTRATOR'],
      },
      {
        name: 'ADMINISTRATOR',
        roles: ['ADMINISTRATOR'],
      },
      {
        name: 'TEACHER',
        roles: ['TEACHER'],
      },
      {
        name: 'PRINICIPAL',
        roles: ['PRINICIPAL', 'TEACHER'],
      },
      {
        name: 'HOD',
        roles: ['HOD', 'PRINCIPAL', 'TEACHER'],
      },
      {
        name: 'STUDENT',
        roles: [],
      },
      {
        name: 'STUDENT',
        roles: [],
      },
      {
        name: 'TRANSPORT',
        roles: [],
      },
      {
        name: 'CANTEEN',
        roles: [],
      },
      {
        name: 'HOUSE KEEPING',
        roles: [],
      },
      {
        name: 'STUDENT',
        roles: [],
      },
    ];
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

  showAddGroupModal() {
    const text = 'Do you want to delete the ';
    appEvents.emit('add-group-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: () => {},
    });
  }

  showAssignRoleModal() {
    const text = 'Do you want to delete the ';
    appEvents.emit('assign-role-modal', {
      text: text,
      icon: 'fa-trash',
      roles: this.roles,
    });
  }
}
