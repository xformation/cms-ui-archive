import { appEvents } from 'app/core/core';

export class UsersCtrl {
  users: any[];
  groups: any[];
  constructor() {
    this.getUsers();
    this.getGroups();
  }

  getUsers() {
    this.users = [
      {
        name: 'USER1',
        userName: 'USER1@collage.com',
        groups: ['Student', 'Transport', 'Library'],
      },
      {
        name: 'USER2',
        userName: 'USER2@collage.com',
        groups: ['Student', 'Transport', 'Library'],
      },
      {
        name: 'USER3',
        userName: 'USER3@collage.com',
        groups: ['HOD', 'Principal'],
      },
      {
        name: 'USER4',
        userName: 'USER4@collage.com',
        groups: ['Driver', 'House keeping'],
      },
      {
        name: 'USER5',
        userName: 'USER5@collage.com',
        groups: [],
      },
      {
        name: 'USER6',
        userName: 'USER6@collage.com',
        groups: [],
      },
      {
        name: 'USER7',
        userName: 'USER7@collage.com',
        groups: [],
      },
      {
        name: 'USER8',
        userName: 'USER8@collage.com',
        groups: [],
      },
    ];
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

  showAddUserModal() {
    const text = 'Do you want to delete the ';
    appEvents.emit('add-user-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: () => {},
    });
  }

  showEditUserModal() {
    const text = 'Do you want to delete the ';
    appEvents.emit('edit-user-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: () => {},
    });
  }

  showAssignGroupModal() {
    const text = 'Do you want to delete the ';
    appEvents.emit('assign-group-modal', {
      text: text,
      icon: 'fa-trash',
      groups: this.groups,
    });
  }
}
