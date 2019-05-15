import coreModule from 'app/core/core_module';
import appEvents from 'app/core/app_events';
var UtilSrv = /** @class */ (function () {
    /** @ngInject */
    function UtilSrv($rootScope, $modal) {
        this.$rootScope = $rootScope;
        this.$modal = $modal;
    }
    UtilSrv.prototype.init = function () {
        appEvents.on('show-modal', this.showModal.bind(this), this.$rootScope);
        appEvents.on('hide-modal', this.hideModal.bind(this), this.$rootScope);
        appEvents.on('confirm-modal', this.showConfirmModal.bind(this), this.$rootScope);
        appEvents.on('add-modal', this.addModal.bind(this), this.$rootScope);
        appEvents.on('edit-modal', this.editModal.bind(this), this.$rootScope);
        appEvents.on('branch-modal', this.branchModal.bind(this), this.$rootScope);
        appEvents.on('department-modal', this.departmentModal.bind(this), this.$rootScope);
        appEvents.on('import-department-modal', this.importDepartmentModal.bind(this), this.$rootScope);
        appEvents.on('subject-modal', this.subjectModal.bind(this), this.$rootScope);
        appEvents.on('signatory-modal', this.signatoryModal.bind(this), this.$rootScope);
        appEvents.on('bank-modal', this.bankModal.bind(this), this.$rootScope);
        appEvents.on('add-permission-modal', this.addPermissionModal.bind(this), this.$rootScope);
        appEvents.on('add-role-modal', this.addRoleModal.bind(this), this.$rootScope);
        appEvents.on('add-group-modal', this.addGroupModal.bind(this), this.$rootScope);
        appEvents.on('assign-role-modal', this.assignRoleModal.bind(this), this.$rootScope);
        appEvents.on('assign-group-modal', this.assignGroupModal.bind(this), this.$rootScope);
        appEvents.on('add-user-modal', this.addUserModal.bind(this), this.$rootScope);
        appEvents.on('edit-user-modal', this.editUserModal.bind(this), this.$rootScope);
        appEvents.on('year-modal', this.yearModal.bind(this), this.$rootScope);
    };
    UtilSrv.prototype.hideModal = function () {
        if (this.modalScope && this.modalScope.dismiss) {
            this.modalScope.dismiss();
        }
    };
    UtilSrv.prototype.showModal = function (options) {
        if (this.modalScope && this.modalScope.dismiss) {
            this.modalScope.dismiss();
        }
        this.modalScope = options.scope;
        if (options.model) {
            this.modalScope = this.$rootScope.$new();
            this.modalScope.model = options.model;
        }
        else if (!this.modalScope) {
            this.modalScope = this.$rootScope.$new();
        }
        var modal = this.$modal({
            modalClass: options.modalClass,
            template: options.src,
            templateHtml: options.templateHtml,
            persist: false,
            show: false,
            scope: this.modalScope,
            keyboard: false,
            backdrop: options.backdrop,
        });
        Promise.resolve(modal).then(function (modalEl) {
            modalEl.modal('show');
        });
    };
    UtilSrv.prototype.showConfirmModal = function (payload) {
        var scope = this.$rootScope.$new();
        scope.onConfirm = function () {
            payload.onConfirm();
            scope.dismiss();
        };
        scope.updateConfirmText = function (value) {
            scope.confirmTextValid = payload.confirmText.toLowerCase() === value.toLowerCase();
        };
        scope.title = payload.title;
        scope.text = payload.text;
        scope.text2 = payload.text2;
        scope.confirmText = payload.confirmText;
        scope.onConfirm = payload.onConfirm;
        scope.onAltAction = payload.onAltAction;
        scope.altActionText = payload.altActionText;
        scope.icon = payload.icon || 'fa-check';
        scope.yesText = payload.yesText || 'Yes';
        scope.noText = payload.noText || 'Cancel';
        scope.confirmTextValid = scope.confirmText ? false : true;
        appEvents.emit('show-modal', {
            src: 'public/app/partials/confirm_modal.html',
            scope: scope,
            modalClass: 'confirm-modal',
        });
    };
    UtilSrv.prototype.addModal = function (payload) {
        var scope = this.$rootScope.$new();
        scope.create = function () {
            payload.onCreate(scope.locationForm, scope.location);
        };
        appEvents.emit('show-modal', {
            src: 'public/app/features/localapp/college-settings/locations/partials/add_modal.html',
            scope: scope,
            modalClass: 'add-modal',
        });
    };
    UtilSrv.prototype.editModal = function (payload) {
        var scope = this.$rootScope.$new();
        scope.text = payload.text;
        scope.update = function () {
            payload.onUpdate(scope.locationForm, scope.location);
        };
        appEvents.emit('show-modal', {
            src: 'public/app/features/localapp/college-settings/locations/partials/edit_modal.html',
            scope: scope,
            modalClass: 'edit-modal',
        });
    };
    UtilSrv.prototype.branchModal = function (payload) {
        var scope = this.$rootScope.$new();
        scope.text = payload.text;
        scope.branch = payload.branch;
        scope.states = payload.states;
        scope.cities = payload.cities;
        scope.selectedCities = payload.selectedCities;
        scope.colleges = payload.colleges;
        scope.is_success_bar = '';
        scope.create = function () {
            payload.onCreate(scope.branchForm, scope.branch, function (isSuccess) {
                scope.is_success_bar = isSuccess;
                setTimeout(function () {
                    scope.dismiss();
                }, 3000);
            });
        };
        scope.update = function () {
            payload.onUpdate(scope.branchForm, scope.branch, function (isSuccess) {
                scope.is_success_bar = isSuccess;
                setTimeout(function () {
                    scope.dismiss();
                }, 3000);
            });
        };
        scope.onChangeState = function () {
            scope.selectedCities = payload.onChange(scope.branchForm, scope.branch, scope.cities, scope.selectedCities);
        };
        appEvents.emit('show-modal', {
            src: 'public/app/features/localapp/college-settings/collegebranches/partials/branch_modal.html',
            scope: scope,
            modalClass: 'branch-modal',
        });
    };
    UtilSrv.prototype.yearModal = function (payload) {
        var scope = this.$rootScope.$new();
        scope.text = payload.text;
        scope.academicYear = payload.academicYear;
        scope.is_success_bar = '';
        scope.createYear = function () {
            payload.onCreate(scope.yearForm, scope.academicYear, function (isSuccess) {
                scope.is_success_bar = isSuccess;
                setTimeout(function () {
                    scope.dismiss();
                }, 3000);
            });
        };
        scope.updateYear = function () {
            payload.onUpdate(scope.yearForm, scope.academicYear, function (isSuccess) {
                scope.is_success_bar = isSuccess;
                setTimeout(function () {
                    scope.dismiss();
                }, 3000);
            });
        };
        appEvents.emit('show-modal', {
            src: 'public/app/features/localapp/academic-settings/yearsetting/partials/year_modal.html',
            scope: scope,
            modalClass: 'year-modal',
        });
    };
    UtilSrv.prototype.departmentModal = function (payload) {
        var scope = this.$rootScope.$new();
        scope.text = payload.text;
        scope.department = payload.department;
        scope.branches = payload.branches;
        scope.academicYears = payload.academicYears;
        scope.create = function () {
            payload.onCreate(scope.departmentForm, scope.department);
            scope.dismiss();
        };
        scope.update = function () {
            payload.onUpdate(scope.departmentForm, scope.department);
            scope.dismiss();
        };
        appEvents.emit('show-modal', {
            src: 'public/app/features/localapp/academic-settings/departmentsetup/partials/department_modal.html',
            scope: scope,
            modalClass: 'department-modal',
        });
    };
    UtilSrv.prototype.subjectModal = function (payload) {
        var scope = this.$rootScope.$new();
        scope.text = payload.text;
        scope.departments = payload.departments;
        scope.selectedBatches = payload.selectedBatches;
        scope.subject = payload.subject;
        scope.teachers = payload.teachers;
        scope.collegeId = payload.collegeId;
        scope.branchId = payload.branchId;
        scope.is_success_bar = '';
        scope.create = function () {
            payload.onCreate(scope.subjectForm, scope.subject, scope.collegeId, scope.branchId, function (isSuccess) {
                scope.is_success_bar = isSuccess;
                setTimeout(function () {
                    scope.dismiss();
                }, 4000);
            });
        };
        scope.update = function () {
            payload.onUpdate(scope.subjectForm, scope.subject);
            scope.dismiss();
        };
        scope.onChangeDepartment = function () {
            scope.selectedBatches = payload.onChange(scope.subjectForm, scope.subject, scope.selectedBatches);
        };
        appEvents.emit('show-modal', {
            src: 'public/app/features/localapp/academic-settings/subjectsetup/partials/subject_modal.html',
            scope: scope,
            modalClass: 'subject-modal',
        });
    };
    UtilSrv.prototype.importDepartmentModal = function (payload) {
        var scope = this.$rootScope.$new();
        appEvents.emit('show-modal', {
            src: 'public/app/features/localapp/college-settings/departmentsettings/partials/import_department_modal.html',
            scope: scope,
            modalClass: 'import-department-modal',
        });
    };
    UtilSrv.prototype.signatoryModal = function (payload) {
        var scope = this.$rootScope.$new();
        scope.authorizedSignatory = payload.authorizedSignatory;
        scope.cmsSelectedBranches = payload.cmsSelectedBranches;
        scope.collegeId = payload.collegeId;
        scope.is_success_bar = '';
        scope.createSignatory = function () {
            payload.onCreate(scope.signatoryForm, scope.authorizedSignatory, scope.collegeId, function (isSuccess) {
                scope.is_success_bar = isSuccess;
                setTimeout(function () {
                    scope.dismiss();
                }, 4000);
            });
        };
        appEvents.emit('show-modal', {
            src: 'public/app/features/localapp/college-settings/legalentities/partials/signatory_modal.html',
            scope: scope,
            modalClass: 'signatory-modal',
        });
    };
    UtilSrv.prototype.bankModal = function (payload) {
        var scope = this.$rootScope.$new();
        scope.bankAccount = payload.bankAccount;
        scope.cmsSelectedBranches = payload.cmsSelectedBranches;
        scope.collegeId = payload.collegeId;
        scope.is_success_bar = '';
        scope.createBank = function () {
            payload.onCreate(scope.bankForm, scope.bankAccount, scope.collegeId, function (isSuccess) {
                scope.is_success_bar = isSuccess;
                setTimeout(function () {
                    scope.dismiss();
                }, 4000);
            });
        };
        appEvents.emit('show-modal', {
            src: 'public/app/features/localapp/college-settings/legalentities/partials/bank_modal.html',
            scope: scope,
            modalClass: 'bank-modal',
        });
    };
    UtilSrv.prototype.addRoleModal = function (payload) {
        var scope = this.$rootScope.$new();
        scope.preferences = payload.preferences;
        scope.permissions = payload.permissions;
        scope.preferenceId = payload.preferenceId;
        scope.saveRole = function () {
            payload.onAdd(scope.role, scope.roleForm, function (isSuccess) {
                scope.is_success_bar = isSuccess;
                setTimeout(function () {
                    scope.dismiss();
                }, 4000);
            });
        };
        scope.setPreference = function (id) {
            scope.preferenceId = id;
        };
        appEvents.emit('show-modal', {
            src: 'public/app/features/localapp/roles-permissions/roles/partials/add_new_role.html',
            scope: scope,
            modalClass: 'add-new-role',
        });
    };
    UtilSrv.prototype.addGroupModal = function (payload) {
        var scope = this.$rootScope.$new();
        scope.saveGroup = function () {
            var rl = scope.group;
            rl.roles = [];
            payload.onAdd(scope.groupForm, rl, function (isSuccess) {
                scope.is_success_bar = isSuccess;
                setTimeout(function () {
                    scope.dismiss();
                }, 4000);
            });
        };
        appEvents.emit('show-modal', {
            src: 'public/app/features/localapp/roles-permissions/groups/partials/create_group.html',
            scope: scope,
            modalClass: 'add-new-group',
        });
    };
    UtilSrv.prototype.addPermissionModal = function (payload) {
        console.log(payload);
        var scope = payload.scope || this.$rootScope.$new();
        console.log('Again event call: show-model');
        scope.permission = payload.permission;
        scope.savePermission = function () {
            payload.onCreate(scope.permissionForm, scope.permission);
            scope.dismiss();
        };
        appEvents.emit('show-modal', {
            src: 'public/app/features/localapp/roles-permissions/permissions/partials/create_permission.html',
            scope: scope,
            modalClass: 'add-new-permission',
        });
    };
    UtilSrv.prototype.assignRoleModal = function (payload) {
        var scope = this.$rootScope.$new();
        scope.roles = payload.roles;
        scope.groups = payload.groups;
        scope.assignRole = function () {
            payload.onAdd(scope.selectedGroup, function (isSuccess) {
                scope.is_success_bar = isSuccess;
                setTimeout(function () {
                    scope.dismiss();
                }, 4000);
            });
        };
        scope.selectedGroup = null;
        scope.onChangeGroup = function (group) {
            scope.selectedGroup = group;
            for (var i in scope.roles) {
                scope.roles[i].checked = false;
            }
            for (var i in group.roles) {
                var role = group.roles[i];
                for (var j in scope.roles) {
                    var scopeRole = scope.roles[j];
                    if (scopeRole.id === role.id) {
                        scopeRole.checked = true;
                        break;
                    }
                }
            }
        };
        scope.onChangeRole = function (role) {
            if (scope.selectedGroup) {
                var roles = scope.selectedGroup.roles;
                var index = -1;
                for (var i in roles) {
                    if (roles[i].id === role.id) {
                        index = i;
                        break;
                    }
                }
                if (role.checked) {
                    scope.selectedGroup.roles.push(role);
                }
                else {
                    scope.selectedGroup.roles.splice(index, 1);
                }
            }
        };
        appEvents.emit('show-modal', {
            src: 'public/app/features/localapp/roles-permissions/groups/partials/assign_role.html',
            scope: scope,
            modalClass: 'assign-role',
        });
    };
    UtilSrv.prototype.assignGroupModal = function (payload) {
        var scope = this.$rootScope.$new();
        scope.groups = payload.groups;
        scope.users = payload.users;
        scope.isRequestMade = false;
        scope.onChangeUser = function (user) {
            scope.selectedUser = user;
            for (var i in scope.groups) {
                scope.groups[i].checked = false;
            }
            for (var i in user.roles) {
                var role = user.roles[i];
                for (var j in scope.groups) {
                    var scopeGroup = scope.groups[j];
                    if (scopeGroup.id === role.id) {
                        scopeGroup.checked = true;
                        break;
                    }
                }
            }
        };
        scope.onChangeGroup = function (group) {
            if (scope.selectedUser) {
                var roles = scope.selectedUser.roles;
                var index = -1;
                for (var i in roles) {
                    if (roles[i].id === group.id) {
                        index = i;
                        break;
                    }
                }
                if (group.checked) {
                    scope.selectedUser.roles.push(group);
                }
                else {
                    scope.selectedUser.roles.splice(index, 1);
                }
            }
        };
        scope.assignGroup = function () {
            scope.isRequestMade = true;
            payload.onEdit(scope.selectedUser, function (isSuccess) {
                scope.is_success_bar = isSuccess;
                scope.isRequestMade = false;
                setTimeout(function () {
                    scope.dismiss();
                }, 4000);
            });
        };
        appEvents.emit('show-modal', {
            src: 'public/app/features/localapp/roles-permissions/users/partials/assign_group.html',
            scope: scope,
            modalClass: 'assign-group',
        });
    };
    UtilSrv.prototype.addUserModal = function (payload) {
        var scope = this.$rootScope.$new();
        scope.isRequestMade = false;
        scope.saveUser = function () {
            scope.isRequestMade = true;
            var user = scope.user;
            user.roles = [];
            payload.onAdd(scope.userForm, user, function (isSuccess) {
                scope.isRequestMade = false;
                scope.is_success_bar = isSuccess;
                setTimeout(function () {
                    scope.dismiss();
                }, 4000);
            });
        };
        appEvents.emit('show-modal', {
            src: 'public/app/features/localapp/roles-permissions/users/partials/add_user.html',
            scope: scope,
            modalClass: 'add-user',
        });
    };
    UtilSrv.prototype.editUserModal = function (payload) {
        var scope = this.$rootScope.$new();
        scope.user = payload.user;
        scope.isRequestMade = false;
        scope.updateUser = function () {
            var usr = scope.user;
            scope.isRequestMade = true;
            payload.onEdit(scope.userForm, usr, function (isSuccess) {
                scope.isRequestMade = false;
                scope.is_success_bar = isSuccess;
                setTimeout(function () {
                    scope.dismiss();
                }, 4000);
            });
        };
        appEvents.emit('show-modal', {
            src: 'public/app/features/localapp/roles-permissions/users/partials/edit_user.html',
            scope: scope,
            modalClass: 'edit-user',
        });
    };
    return UtilSrv;
}());
export { UtilSrv };
coreModule.service('utilSrv', UtilSrv);
//# sourceMappingURL=util_srv.js.map