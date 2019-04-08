import { appEvents } from 'app/core/core';
import { config } from 'app/features/localapp/config';

export class RolesCtrl {
  selectedRole = '';
  roles: any[] = [];
  preferences = [];
  preferenceId = '';
  permittedPermissions = [];
  prohibitedPermissions = [];
  backendSrv: any;
  $scope: any;
  isSuccess = "";
  isUpdating = false;
  constructor($scope, backendSrv) {
    this.selectedRole = '';
    this.$scope = $scope;
    this.backendSrv = backendSrv;
    this.getRoles();
    this.getPreferences();
    this.getPermissions();
    this.preferenceId = 'permitted';

    $scope.saveRole = (role, roleForm, cb, isUpdating) => {
      if (roleForm && !roleForm.$valid) {
        return;
      }
      role.grp = false;
      this.backendSrv.post(config.ROLES_CREATE, role).then(response => {
        this.isSuccess = "1";
        this.isUpdating = false;
        if (!isUpdating) {
          this.getRoles();
        }
        if (cb) {
          cb("1");
        }
      }, () => {
        this.isSuccess = "0";
        this.isUpdating = false;
        if (cb) {
          cb("0");
        }
      });
    };
  }

  getRoles() {
    this.roles = [];
    this.backendSrv.get(config.ROLES_LIST_ALL).then(response => {
      response.forEach(item => {
        if (!item.grp) {
          this.roles.push(item);
        }
      });
    });
  }

  onRoleClicked(selectedRole) {
    this.isSuccess = "";
    this.selectedRole = selectedRole;
    const selectedPermissions = selectedRole.permissions;
    for (const k in this.permittedPermissions) {
      this.permittedPermissions[k].isChecked = false;
    }
    for (const i in selectedPermissions) {
      const selectedPermission = selectedPermissions[i];
      for (const j in this.permittedPermissions) {
        if (this.permittedPermissions[j].id === selectedPermission.id) {
          this.permittedPermissions[j].isChecked = true;
          break;
        }
      }
    }
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
      }
    ];
  }

  setPreference(id) {
    this.preferenceId = id;
  }

  getPermissions() {
    this.backendSrv.get(config.PERMS_LIST_ALL).then(response => {
      this.prohibitedPermissions = response;
      this.permittedPermissions = JSON.parse(JSON.stringify(response));
    });
  }

  showAddRoleModal() {
    const text = 'Do you want to add the ';
    appEvents.emit('add-role-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: (role, roleForm, cb) => {
        this.$scope.saveRole(role, roleForm, cb, false);
      }
    });
  }

  updateRole() {
    if (this.selectedRole) {
      this.isUpdating = true;
      const selectedPermissions = [];
      for (const i in this.permittedPermissions) {
        const permission = this.permittedPermissions[i];
        if (permission.isChecked) {
          permission.permit = true;
          selectedPermissions.push(permission);
        }
      }
      for (const i in this.prohibitedPermissions) {
        const permission = this.prohibitedPermissions[i];
        if (permission.isChecked) {
          selectedPermissions.push(permission);
        }
      }
      this.selectedRole["permissions"] = selectedPermissions;
      this.$scope.saveRole(this.selectedRole, null, null, true);
    }
  }
}
