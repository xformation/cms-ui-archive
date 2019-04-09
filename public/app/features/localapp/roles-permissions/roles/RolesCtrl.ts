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
    this.getRolesPermissions();
    this.getPreferences();
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
          this.getRolesPermissions();
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

  getRolesPermissions() {
    Promise.all([this.backendSrv.get(config.ROLES_LIST_ALL), this.backendSrv.get(config.PERMS_LIST_ALL)]).then((response) => {
      const roleResponse = response[0];
      roleResponse.forEach(item => {
        if (!item.grp) {
          this.roles.push(item);
        }
      });
      const perResponse = response[1];
      this.createPermmissions(perResponse);
    });
  }

  onRoleClicked(selectedRole) {
    this.isSuccess = "";
    this.selectedRole = selectedRole;
    const selectedPermissions = selectedRole.permissions;
    for (const k in this.permittedPermissions) {
      this.permittedPermissions[k].checked = false;
      this.permittedPermissions[k].collapse = false;
      this.prohibitedPermissions[k].checked = false;
      this.prohibitedPermissions[k].collapse = false;
      const children = this.permittedPermissions[k].children;
      const prohibitedChildren = this.prohibitedPermissions[k].children;
      if (children.length > 0) {
        for (const j in children) {
          children[j].checked = false;
          prohibitedChildren[j].checked = true;
        }
      }
    }
    for (const i in selectedPermissions) {
      const selectedPermission = selectedPermissions[i];
      for (const j in this.permittedPermissions) {
        const children = this.permittedPermissions[j].children;
        const prohibitedChildren = this.prohibitedPermissions[j].children;
        for (const k in children) {
          if (children[k].id === selectedPermission.id) {
            children[k].checked = true;
            prohibitedChildren[k].checked = false;
          }
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

  createPermmissions(response) {
    const permissions = {};
    for (const i in response) {
      const permission = response[i];
      if (!permissions[permission.name]) {
        permissions[permission.name] = {
          name: permission.name,
          collapse: true,
          children: [{
            ...permission,
            dupName: permission.name,
            name: permission.permission
          }]
        };
      } else {
        const children = permissions[permission.name].children;
        children.push({
          ...permission,
          dupName: permission.name,
          name: permission.permission
        });
      }
    }
    for (const j in permissions) {
      const permission = permissions[j];
      this.permittedPermissions.push(permission);
      this.prohibitedPermissions.push(JSON.parse(JSON.stringify(permission)));
    }
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
      let selectedPermissions = [];
      selectedPermissions = [];
      for (const i in this.permittedPermissions) {
        const children = this.permittedPermissions[i].children;
        for (const j in children) {
          const child = children[j];
          if (child.checked) {
            child.permit = true;
            selectedPermissions.push({
              ...child,
              name: child.dupName
            });
          }
        }
      }
      this.selectedRole["permissions"] = selectedPermissions;
      this.$scope.saveRole(this.selectedRole, null, null, true);
    }
  }

  onClickTreeRole(role) {
    console.log(role);
  }
}
