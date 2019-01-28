import coreModule from 'app/core/core_module';
import appEvents from 'app/core/app_events';

export class UtilSrv {
  modalScope: any;

  /** @ngInject */
  constructor(private $rootScope, private $modal) {}

  init() {
    appEvents.on('show-modal', this.showModal.bind(this), this.$rootScope);
    appEvents.on('hide-modal', this.hideModal.bind(this), this.$rootScope);
    appEvents.on('confirm-modal', this.showConfirmModal.bind(this), this.$rootScope);
    appEvents.on('add-modal', this.addModal.bind(this), this.$rootScope);
    appEvents.on('branch-modal', this.branchModal.bind(this), this.$rootScope);
    appEvents.on('department-modal', this.departmentModal.bind(this), this.$rootScope);
    appEvents.on('import-department-modal', this.importDepartmentModal.bind(this), this.$rootScope);
    appEvents.on('signatory-modal', this.signatoryModal.bind(this), this.$rootScope);
    appEvents.on('bank-modal', this.bankModal.bind(this), this.$rootScope);
    appEvents.on('add-role-modal', this.addRoleModal.bind(this), this.$rootScope);
    appEvents.on('add-group-modal', this.addGroupModal.bind(this), this.$rootScope);
    appEvents.on('assign-role-modal', this.assignRoleModal.bind(this), this.$rootScope);
  }

  hideModal() {
    if (this.modalScope && this.modalScope.dismiss) {
      this.modalScope.dismiss();
    }
  }

  showModal(options) {
    if (this.modalScope && this.modalScope.dismiss) {
      this.modalScope.dismiss();
    }

    this.modalScope = options.scope;

    if (options.model) {
      this.modalScope = this.$rootScope.$new();
      this.modalScope.model = options.model;
    } else if (!this.modalScope) {
      this.modalScope = this.$rootScope.$new();
    }

    const modal = this.$modal({
      modalClass: options.modalClass,
      template: options.src,
      templateHtml: options.templateHtml,
      persist: false,
      show: false,
      scope: this.modalScope,
      keyboard: false,
      backdrop: options.backdrop,
    });

    Promise.resolve(modal).then(modalEl => {
      modalEl.modal('show');
    });
  }

  showConfirmModal(payload) {
    const scope = this.$rootScope.$new();

    scope.onConfirm = () => {
      payload.onConfirm();
      scope.dismiss();
    };

    scope.updateConfirmText = value => {
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
  }

  addModal(payload) {
    const scope = this.$rootScope.$new();

    scope.create = () => {
      payload.onCreate(scope.locationForm, scope.location);
    };

    appEvents.emit('show-modal', {
      src: 'public/app/features/localapp/college-settings/locations/partials/add_modal.html',
      scope: scope,
      modalClass: 'add-modal',
    });
  }

  branchModal(payload) {
    const scope = this.$rootScope.$new();

    scope.create = () => {
      payload.onCreate(scope.branchForm, scope.branch);
    };

    appEvents.emit('show-modal', {
      src: 'public/app/features/localapp/college-settings/collegebranches/partials/branch_modal.html',
      scope: scope,
      modalClass: 'branch-modal',
    });
  }

  departmentModal(payload) {
    const scope = this.$rootScope.$new();

    scope.create = () => {
      payload.onCreate(scope.departmentForm, scope.department);
    };

    appEvents.emit('show-modal', {
      src: 'public/app/features/localapp/college-settings/departmentsettings/partials/department_modal.html',
      scope: scope,
      modalClass: 'department-modal',
    });
  }

  importDepartmentModal(payload) {
    const scope = this.$rootScope.$new();

    appEvents.emit('show-modal', {
      src: 'public/app/features/localapp/college-settings/departmentsettings/partials/import_department_modal.html',
      scope: scope,
      modalClass: 'import-department-modal',
    });
  }

  signatoryModal(payload) {
    const scope = this.$rootScope.$new();

    appEvents.emit('show-modal', {
      src: 'public/app/features/localapp/college-settings/legalentities/partials/signatory_modal.html',
      scope: scope,
      modalClass: 'signatory-modal',
    });
  }

  bankModal(payload) {
    const scope = this.$rootScope.$new();

    appEvents.emit('show-modal', {
      src: 'public/app/features/localapp/college-settings/legalentities/partials/bank_modal.html',
      scope: scope,
      modalClass: 'bank-modal',
    });
  }

  addRoleModal(payload) {
    const scope = payload.scope || this.$rootScope.$new();

    appEvents.emit('show-modal', {
      src: 'public/app/features/localapp/roles-permissions/roles/partials/add_new_role.html',
      scope: scope,
      modalClass: 'add-new-role',
    });
  }

  addGroupModal(payload) {
    const scope = payload.scope || this.$rootScope.$new();

    appEvents.emit('show-modal', {
      src: 'public/app/features/localapp/roles-permissions/groups/partials/create_group.html',
      scope: scope,
      modalClass: 'add-new-group',
    });
  }

  assignRoleModal(payload) {
    const scope = payload.scope || this.$rootScope.$new();
    scope.roles = payload.roles;
    scope.text = 'ha ha ha';
    appEvents.emit('show-modal', {
      src: 'public/app/features/localapp/roles-permissions/groups/partials/assign_role.html',
      scope: scope,
      modalClass: 'assign-role',
    });
  }
}

coreModule.service('utilSrv', UtilSrv);
