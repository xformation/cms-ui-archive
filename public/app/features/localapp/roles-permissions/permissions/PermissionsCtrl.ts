import { appEvents } from 'app/core/core';

export class PermissionsCtrl {
  permissions: any[];
  constructor() {
    this.getPermissions();
  }

  getPermissions() {
    this.permissions = [
      {
        name: 'SUPER ADMINISTRATOR',
        description: '',
      },
      {
        name: 'ADMINISTRATOR',
        description: '',
      },
      {
        name: 'TEACHER',
        description: '',
      },
      {
        name: 'PRINICIPAL',
        description: '',
      },
      {
        name: 'HOD',
        description: '',
      },
      {
        name: 'STUDENT',
        description: '',
      },
      {
        name: 'STUDENT',
        description: '',
      },
      {
        name: 'TRANSPORT',
        description: '',
      },
      {
        name: 'CANTEEN',
        description: '',
      },
      {
        name: 'HOUSE KEEPING',
        description: '',
      },
      {
        name: 'STUDENT',
        description: '',
      },
    ];
  }

  showAddPermissionModal() {
    const text = 'Do you want to delete the ';
    appEvents.emit('add-permissions-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: () => {},
    });
  }
}
